import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const connectionString = process.env.DATABASE_URL || process.env.VITE_NEON_DATABASE_URL;
  if (!connectionString) {
    return res.status(500).json({ error: 'DATABASE_URL is not configured' });
  }

  const sql = neon(connectionString);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Đảm bảo bảng bvntt_pageviews tồn tại
    await sql`
      CREATE TABLE IF NOT EXISTS bvntt_pageviews (
        id BIGSERIAL PRIMARY KEY,
        visitor_id VARCHAR(64) NOT NULL,
        session_id VARCHAR(64),
        path VARCHAR(255) NOT NULL,
        title VARCHAR(255),
        referrer VARCHAR(512),
        device_type VARCHAR(32),
        browser VARCHAR(64),
        os VARCHAR(64),
        screen_res VARCHAR(32),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // ── 1. POST: Ghi nhận một lượt truy cập trang ──
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const {
        visitorId,
        sessionId,
        path,
        title,
        referrer,
        deviceType,
        browser,
        os,
        screenRes,
      } = body || {};

      if (!visitorId || !path) {
        return res.status(400).json({ error: 'Missing visitorId or path' });
      }

      // Không lưu analytics của trang admin để tránh làm loãng số liệu
      if (path.startsWith('/admin') || path.includes('#admin')) {
        return res.status(200).json({ ignored: true, reason: 'admin_path' });
      }

      await sql`
        INSERT INTO bvntt_pageviews (
          visitor_id, session_id, path, title, referrer, device_type, browser, os, screen_res, created_at
        ) VALUES (
          ${visitorId},
          ${sessionId || ''},
          ${(path || '/').slice(0, 255)},
          ${(title || '').slice(0, 255)},
          ${(referrer || '').slice(0, 512)},
          ${(deviceType || 'desktop').slice(0, 32)},
          ${(browser || 'Other').slice(0, 64)},
          ${(os || 'Other').slice(0, 64)},
          ${(screenRes || '').slice(0, 32)},
          NOW()
        );
      `;

      return res.status(200).json({ success: true });
    }

    // ── 2. GET: Lấy thống kê tổng hợp cho Admin Dashboard ──
    if (req.method === 'GET') {
      const range = (req.query?.range as string) || '30d'; // 'today', '7d', '30d', 'all'

      let timeFilterSql = sql`WHERE created_at >= NOW() - INTERVAL '30 days'`;
      if (range === 'today') {
        timeFilterSql = sql`WHERE created_at >= CURRENT_DATE`;
      } else if (range === '7d') {
        timeFilterSql = sql`WHERE created_at >= NOW() - INTERVAL '7 days'`;
      } else if (range === 'all') {
        timeFilterSql = sql`WHERE 1=1`;
      }

      // Tổng quan KPI
      const overviewRows = await sql`
        SELECT
          COUNT(*)::int AS "totalViews",
          COUNT(DISTINCT visitor_id)::int AS "uniqueVisitors",
          COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END)::int AS "todayViews",
          COUNT(DISTINCT CASE WHEN created_at >= CURRENT_DATE THEN visitor_id END)::int AS "todayVisitors"
        FROM bvntt_pageviews
        ${timeFilterSql};
      `;

      // Đếm số đơn ứng tuyển để tính tỷ lệ chuyển đổi
      let submissionCount = 0;
      try {
        const subRes = await sql`SELECT COUNT(*)::int AS count FROM submissions;`;
        submissionCount = subRes[0]?.count || 0;
      } catch {
        submissionCount = 0;
      }

      // Biểu đồ theo ngày (tối đa 30 ngày)
      const dailyRows = await sql`
        SELECT
          TO_CHAR(DATE_TRUNC('day', created_at), 'YYYY-MM-DD') AS "date",
          COUNT(*)::int AS "views",
          COUNT(DISTINCT visitor_id)::int AS "visitors"
        FROM bvntt_pageviews
        ${timeFilterSql}
        GROUP BY DATE_TRUNC('day', created_at)
        ORDER BY DATE_TRUNC('day', created_at) ASC;
      `;

      // Top trang xem nhiều nhất
      const topPagesRows = await sql`
        SELECT
          path,
          MAX(title) AS title,
          COUNT(*)::int AS "count"
        FROM bvntt_pageviews
        ${timeFilterSql}
        GROUP BY path
        ORDER BY "count" DESC
        LIMIT 10;
      `;

      // Nguồn giới thiệu (Referrer)
      const referrerRows = await sql`
        SELECT
          CASE 
            WHEN referrer IS NULL OR referrer = '' OR referrer LIKE '%bvntt%' OR referrer LIKE '%localhost%' THEN 'Trực tiếp (Direct)'
            WHEN referrer LIKE '%facebook.com%' OR referrer LIKE '%fb.me%' THEN 'Facebook'
            WHEN referrer LIKE '%google.%' THEN 'Google Search'
            WHEN referrer LIKE '%zalo.me%' THEN 'Zalo'
            WHEN referrer LIKE '%tiktok.com%' THEN 'TikTok'
            WHEN referrer LIKE '%instagram.com%' THEN 'Instagram'
            ELSE 'Khác'
          END AS source,
          COUNT(*)::int AS "count"
        FROM bvntt_pageviews
        ${timeFilterSql}
        GROUP BY source
        ORDER BY "count" DESC
        LIMIT 6;
      `;

      // Phân bổ thiết bị
      const deviceRows = await sql`
        SELECT
          COALESCE(NULLIF(device_type, ''), 'desktop') AS "device",
          COUNT(*)::int AS "count"
        FROM bvntt_pageviews
        ${timeFilterSql}
        GROUP BY "device"
        ORDER BY "count" DESC;
      `;

      // Phân bổ trình duyệt
      const browserRows = await sql`
        SELECT
          COALESCE(NULLIF(browser, ''), 'Khác') AS "browser",
          COUNT(*)::int AS "count"
        FROM bvntt_pageviews
        ${timeFilterSql}
        GROUP BY "browser"
        ORDER BY "count" DESC
        LIMIT 6;
      `;

      // 30 lượt truy cập mới nhất (Live Log)
      const recentVisitsRows = await sql`
        SELECT
          id,
          path,
          title,
          referrer,
          device_type AS "deviceType",
          browser,
          os,
          created_at AS "createdAt"
        FROM bvntt_pageviews
        ORDER BY created_at DESC
        LIMIT 30;
      `;

      return res.status(200).json({
        overview: {
          totalViews: overviewRows[0]?.totalViews || 0,
          uniqueVisitors: overviewRows[0]?.uniqueVisitors || 0,
          todayViews: overviewRows[0]?.todayViews || 0,
          todayVisitors: overviewRows[0]?.todayVisitors || 0,
          totalSubmissions: submissionCount,
        },
        dailyStats: dailyRows,
        topPages: topPagesRows,
        referrers: referrerRows,
        devices: deviceRows,
        browsers: browserRows,
        recentVisits: recentVisitsRows,
        range,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API analytics error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
}

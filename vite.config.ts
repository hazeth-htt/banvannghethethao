import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { neon } from '@neondatabase/serverless'

function neonDevApiPlugin() {
  return {
    name: 'neon-dev-api',
    configureServer(server: any) {
      const env = loadEnv('development', process.cwd(), '')
      const connStr = env.DATABASE_URL || env.VITE_NEON_DATABASE_URL
      if (!connStr) return

      const sql = neon(connStr)

      server.middlewares.use(async (req: any, res: any, next: any) => {
        const url = new URL(req.url, 'http://localhost')

        // ── Handle /api/content ──
        if (url.pathname === '/api/content') {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

          if (req.method === 'OPTIONS') {
            res.statusCode = 200
            return res.end()
          }

          try {
            await sql`
              CREATE TABLE IF NOT EXISTS bvntt_content (
                key VARCHAR(64) PRIMARY KEY,
                data JSONB NOT NULL,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
              );
            `

            if (req.method === 'GET') {
              const key = url.searchParams.get('key')
              if (key) {
                const rows = await sql`SELECT data, updated_at as "updatedAt" FROM bvntt_content WHERE key = ${key} LIMIT 1;`
                res.statusCode = 200
                if (rows.length === 0) {
                  return res.end(JSON.stringify({ found: false, data: null }))
                }
                return res.end(JSON.stringify({ found: true, data: rows[0].data, updatedAt: rows[0].updatedAt }))
              }

              const allRows = await sql`SELECT key, data FROM bvntt_content;`
              const result: Record<string, any> = {}
              for (const row of allRows) {
                result[row.key] = row.data
              }
              res.statusCode = 200
              return res.end(JSON.stringify(result))
            }

            if (req.method === 'POST') {
              let body = ''
              req.on('data', (chunk: any) => (body += chunk))
              req.on('end', async () => {
                try {
                  const payload = JSON.parse(body)
                  const { key, data } = payload || {}
                  if (!key || data === undefined) {
                    res.statusCode = 400
                    return res.end(JSON.stringify({ error: 'Missing key or data' }))
                  }
                  await sql`
                    INSERT INTO bvntt_content (key, data, updated_at)
                    VALUES (${key}, ${JSON.stringify(data)}::jsonb, NOW())
                    ON CONFLICT (key) DO UPDATE
                    SET data = EXCLUDED.data, updated_at = NOW();
                  `
                  res.statusCode = 200
                  return res.end(JSON.stringify({ success: true, key }))
                } catch (e: any) {
                  res.statusCode = 500
                  return res.end(JSON.stringify({ error: e.message }))
                }
              })
              return
            }

            res.statusCode = 405
            return res.end(JSON.stringify({ error: 'Method not allowed' }))
          } catch (err: any) {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: err.message }))
          }
        }

        // ── Handle /api/analytics ──
        if (url.pathname === '/api/analytics') {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

          if (req.method === 'OPTIONS') {
            res.statusCode = 200
            return res.end()
          }

          try {
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
            `

            if (req.method === 'POST') {
              let body = ''
              req.on('data', (chunk: any) => (body += chunk))
              req.on('end', async () => {
                try {
                  const payload = JSON.parse(body || '{}')
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
                  } = payload

                  if (!visitorId || !path) {
                    res.statusCode = 400
                    return res.end(JSON.stringify({ error: 'Missing visitorId or path' }))
                  }

                  if (path.startsWith('/admin') || path.includes('#admin')) {
                    res.statusCode = 200
                    return res.end(JSON.stringify({ ignored: true }))
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
                  `
                  res.statusCode = 200
                  return res.end(JSON.stringify({ success: true }))
                } catch (e: any) {
                  res.statusCode = 500
                  return res.end(JSON.stringify({ error: e.message }))
                }
              })
              return
            }

            if (req.method === 'GET') {
              const range = url.searchParams.get('range') || '30d'

              let timeFilterSql = sql`WHERE created_at >= NOW() - INTERVAL '30 days'`
              if (range === 'today') {
                timeFilterSql = sql`WHERE created_at >= CURRENT_DATE`
              } else if (range === '7d') {
                timeFilterSql = sql`WHERE created_at >= NOW() - INTERVAL '7 days'`
              } else if (range === 'all') {
                timeFilterSql = sql`WHERE 1=1`
              }

              const overviewRows = await sql`
                SELECT
                  COUNT(*)::int AS "totalViews",
                  COUNT(DISTINCT visitor_id)::int AS "uniqueVisitors",
                  COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END)::int AS "todayViews",
                  COUNT(DISTINCT CASE WHEN created_at >= CURRENT_DATE THEN visitor_id END)::int AS "todayVisitors"
                FROM bvntt_pageviews
                ${timeFilterSql};
              `

              let submissionCount = 0
              try {
                const subRes = await sql`SELECT COUNT(*)::int AS count FROM submissions;`
                submissionCount = subRes[0]?.count || 0
              } catch {
                submissionCount = 0
              }

              const dailyRows = await sql`
                SELECT
                  TO_CHAR(DATE_TRUNC('day', created_at), 'YYYY-MM-DD') AS "date",
                  COUNT(*)::int AS "views",
                  COUNT(DISTINCT visitor_id)::int AS "visitors"
                FROM bvntt_pageviews
                ${timeFilterSql}
                GROUP BY DATE_TRUNC('day', created_at)
                ORDER BY DATE_TRUNC('day', created_at) ASC;
              `

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
              `

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
              `

              const deviceRows = await sql`
                SELECT
                  COALESCE(NULLIF(device_type, ''), 'desktop') AS "device",
                  COUNT(*)::int AS "count"
                FROM bvntt_pageviews
                ${timeFilterSql}
                GROUP BY "device"
                ORDER BY "count" DESC;
              `

              const browserRows = await sql`
                SELECT
                  COALESCE(NULLIF(browser, ''), 'Khác') AS "browser",
                  COUNT(*)::int AS "count"
                FROM bvntt_pageviews
                ${timeFilterSql}
                GROUP BY "browser"
                ORDER BY "count" DESC
                LIMIT 6;
              `

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
              `

              res.statusCode = 200
              return res.end(JSON.stringify({
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
              }))
            }

            res.statusCode = 405
            return res.end(JSON.stringify({ error: 'Method not allowed' }))
          } catch (err: any) {
            res.statusCode = 500
            return res.end(JSON.stringify({ error: err.message }))
          }
        }

        if (url.pathname !== '/api/submissions') return next()

        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 200
          return res.end()
        }

        try {
          if (req.method === 'GET') {
            const rows = await sql`
              SELECT 
                id,
                submitted_at as "submittedAt",
                ho_ten as "hoTen",
                mssv,
                khoa,
                truong_khoa as "truongKhoa",
                lop,
                sdt,
                facebook,
                email,
                mang,
                biet_gi as "bietGi",
                ly_do as "lyDo",
                answers
              FROM submissions
              ORDER BY submitted_at DESC;
            `
            res.statusCode = 200
            return res.end(JSON.stringify(rows))
          }

          if (req.method === 'POST') {
            let body = ''
            req.on('data', (chunk: any) => (body += chunk))
            req.on('end', async () => {
              try {
                const data = JSON.parse(body)
                const result = await sql`
                  INSERT INTO submissions (
                    ho_ten, mssv, khoa, truong_khoa, lop, sdt, facebook, email, mang, biet_gi, ly_do, answers
                  ) VALUES (
                    ${data.hoTen || ''},
                    ${data.mssv || ''},
                    ${data.khoa || ''},
                    ${data.truongKhoa || ''},
                    ${data.lop || ''},
                    ${data.sdt || ''},
                    ${data.facebook || ''},
                    ${data.email || ''},
                    ${data.mang || ''},
                    ${data.bietGi || ''},
                    ${data.lyDo || ''},
                    ${JSON.stringify(data.answers || {})}
                  ) RETURNING id, submitted_at;
                `
                res.statusCode = 200
                return res.end(JSON.stringify({ success: true, id: result[0]?.id }))
              } catch (e: any) {
                res.statusCode = 500
                return res.end(JSON.stringify({ error: e.message }))
              }
            })
            return
          }

          if (req.method === 'DELETE') {
            const id = url.searchParams.get('id')
            if (!id) {
              res.statusCode = 400
              return res.end(JSON.stringify({ error: 'Missing id' }))
            }
            await sql`DELETE FROM submissions WHERE id = ${id}::uuid;`
            res.statusCode = 200
            return res.end(JSON.stringify({ success: true }))
          }

          res.statusCode = 405
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        } catch (err: any) {
          res.statusCode = 500
          return res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), neonDevApiPlugin()],
  server: {
    port: 3000,
    open: false,
    host: true
  }
})


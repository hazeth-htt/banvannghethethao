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
    // Đảm bảo bảng bvntt_content luôn tồn tại
    await sql`
      CREATE TABLE IF NOT EXISTS bvntt_content (
        key VARCHAR(64) PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    // 1. GET: Lấy nội dung
    if (req.method === 'GET') {
      const key = req.query?.key;

      if (key) {
        const rows = await sql`
          SELECT data, updated_at as "updatedAt"
          FROM bvntt_content
          WHERE key = ${key}
          LIMIT 1;
        `;
        if (rows.length === 0) {
          return res.status(200).json({ found: false, data: null });
        }
        return res.status(200).json({ found: true, data: rows[0].data, updatedAt: rows[0].updatedAt });
      }

      // Nếu không truyền key -> trả về tất cả các mục đã lưu
      const allRows = await sql`
        SELECT key, data, updated_at as "updatedAt"
        FROM bvntt_content;
      `;

      const result: Record<string, any> = {};
      for (const row of allRows) {
        result[row.key] = row.data;
      }

      return res.status(200).json(result);
    }

    // 2. POST: Lưu hoặc cập nhật nội dung
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { key, data } = body || {};

      if (!key || data === undefined) {
        return res.status(400).json({ error: 'Missing key or data' });
      }

      const jsonStr = JSON.stringify(data);

      await sql`
        INSERT INTO bvntt_content (key, data, updated_at)
        VALUES (${key}, ${jsonStr}::jsonb, NOW())
        ON CONFLICT (key) DO UPDATE
        SET data = EXCLUDED.data, updated_at = NOW();
      `;

      return res.status(200).json({ success: true, key });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API content error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
}

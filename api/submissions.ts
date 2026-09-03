import { neon } from '@neondatabase/serverless';

export default async function handler(req: any, res: any) {
  const connectionString = process.env.DATABASE_URL || process.env.VITE_NEON_DATABASE_URL;
  if (!connectionString) {
    return res.status(500).json({ error: 'DATABASE_URL is not configured' });
  }

  const sql = neon(connectionString);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const {
        hoTen,
        mssv,
        khoa,
        truongKhoa,
        lop,
        sdt,
        facebook,
        email,
        mang,
        bietGi,
        lyDo,
        answers,
      } = body;

      const result = await sql`
        INSERT INTO submissions (
          ho_ten, mssv, khoa, truong_khoa, lop, sdt, facebook, email, mang, biet_gi, ly_do, answers
        ) VALUES (
          ${hoTen || ''},
          ${mssv || ''},
          ${khoa || ''},
          ${truongKhoa || ''},
          ${lop || ''},
          ${sdt || ''},
          ${facebook || ''},
          ${email || ''},
          ${mang || ''},
          ${bietGi || ''},
          ${lyDo || ''},
          ${JSON.stringify(answers || {})}
        ) RETURNING id, submitted_at;
      `;

      return res.status(200).json({ success: true, id: result[0]?.id });
    }

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
      `;
      return res.status(200).json(rows);
    }

    if (req.method === 'DELETE') {
      const id = req.query?.id || (typeof req.body === 'object' ? req.body?.id : null);
      if (!id) {
        return res.status(400).json({ error: 'Missing submission id' });
      }
      await sql`DELETE FROM submissions WHERE id = ${id}::uuid;`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('API submissions error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
}

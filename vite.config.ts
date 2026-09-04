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


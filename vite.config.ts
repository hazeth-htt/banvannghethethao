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


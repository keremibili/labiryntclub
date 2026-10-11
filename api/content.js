const { requireAdmin } = require('./_lib/auth')
const { readContent, writeContent } = require('./_lib/store')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()

  try {
    if (req.method === 'GET') {
      const content = await readContent()
      res.setHeader('Cache-Control', 'no-store')
      return res.status(200).json(content)
    }

    if (req.method === 'PUT') {
      if (!requireAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })
      const body = req.body
      if (!body?.categories || !body?.texts || !body?.heroImage) {
        return res.status(400).json({ error: 'Invalid content payload' })
      }
      const saved = await writeContent(body)
      return res.status(200).json(saved.content)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error', detail: String(error?.message || error) })
  }
}

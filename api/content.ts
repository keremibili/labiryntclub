import type { VercelRequest, VercelResponse } from '@vercel/node'
import { requireAdmin } from './_lib/auth.js'
import { readContent, writeContent } from './_lib/store.js'
import type { SiteContent } from '../src/types/content.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()

  if (req.method === 'GET') {
    const content = await readContent()
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json(content)
  }

  if (req.method === 'PUT') {
    if (!requireAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })
    const body = req.body as SiteContent
    if (!body?.categories || !body?.texts || !body?.heroImage) {
      return res.status(400).json({ error: 'Invalid content payload' })
    }
    const saved = await writeContent(body)
    return res.status(200).json(saved.content)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

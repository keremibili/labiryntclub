import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'
import { requireAdmin } from './_lib/auth'

export const config = {
  api: { bodyParser: { sizeLimit: '12mb' } },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!requireAdmin(req)) return res.status(401).json({ error: 'Unauthorized' })

  const { filename, dataUrl, folder } = (req.body || {}) as {
    filename?: string
    dataUrl?: string
    folder?: string
  }

  if (!filename || !dataUrl?.startsWith('data:')) {
    return res.status(400).json({ error: 'filename and dataUrl required' })
  }

  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return res.status(400).json({ error: 'Invalid dataUrl' })

  const contentType = match[1]
  const buffer = Buffer.from(match[2], 'base64')
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '-')
  const path = `uploads/${folder || 'misc'}/${Date.now()}-${safeName}`

  const blob = await put(path, buffer, {
    access: 'public',
    contentType,
    addRandomSuffix: false,
  })

  return res.status(200).json({ url: blob.url })
}

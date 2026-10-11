import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkCredentials, createSessionToken } from './_lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password } = (req.body || {}) as { email?: string; password?: string }
  if (!email || !password || !checkCredentials(email, password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = createSessionToken(email)
  return res.status(200).json({ token, email })
}

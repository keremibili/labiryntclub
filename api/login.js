const { checkCredentials, createSessionToken } = require('./_lib/auth')

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, password } = req.body || {}
  if (!email || !password || !checkCredentials(email, password)) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = createSessionToken(email)
  return res.status(200).json({ token, email })
}

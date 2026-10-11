import { createHmac, timingSafeEqual } from 'node:crypto'

const DAY_MS = 24 * 60 * 60 * 1000

function secret() {
  return process.env.ADMIN_SESSION_SECRET || 'labirynt-dev-secret'
}

export function createSessionToken(email) {
  const exp = Date.now() + 7 * DAY_MS
  const payload = `${email}|${exp}`
  const sig = createHmac('sha256', secret()).update(payload).digest('hex')
  return Buffer.from(`${payload}|${sig}`).toString('base64url')
}

export function verifySessionToken(token) {
  if (!token) return null
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf8')
    const [email, expStr, sig] = raw.split('|')
    if (!email || !expStr || !sig) return null
    const exp = Number(expStr)
    if (!Number.isFinite(exp) || Date.now() > exp) return null
    const payload = `${email}|${expStr}`
    const expected = createHmac('sha256', secret()).update(payload).digest('hex')
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
    if (email !== process.env.ADMIN_EMAIL) return null
    return email
  } catch {
    return null
  }
}

export function getBearerToken(req) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return null
  return header.slice(7)
}

export function requireAdmin(req) {
  return verifySessionToken(getBearerToken(req))
}

export function checkCredentials(email, password) {
  return email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
}

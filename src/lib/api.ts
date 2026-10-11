import type { SiteContent } from '../types/content'
import { createDefaultContent } from '../data/defaultContent'

const TOKEN_KEY = 'labirynt-admin-token'

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

export async function fetchContent(): Promise<SiteContent> {
  try {
    const res = await fetch('/api/content', { cache: 'no-store' })
    if (!res.ok) throw new Error('content fetch failed')
    return (await res.json()) as SiteContent
  } catch {
    return createDefaultContent()
  }
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Login failed')
  const data = (await res.json()) as { token: string }
  setAdminToken(data.token)
  return data.token
}

export async function saveContent(content: SiteContent) {
  const token = getAdminToken()
  if (!token) throw new Error('Not authenticated')
  const res = await fetch('/api/content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })
  if (!res.ok) throw new Error('Save failed')
  return (await res.json()) as SiteContent
}

export async function uploadImage(file: File, folder: string) {
  const token = getAdminToken()
  if (!token) throw new Error('Not authenticated')
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('read failed'))
    reader.readAsDataURL(file)
  })
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filename: file.name, dataUrl, folder }),
  })
  if (!res.ok) throw new Error('Upload failed')
  const data = (await res.json()) as { url: string }
  return data.url
}

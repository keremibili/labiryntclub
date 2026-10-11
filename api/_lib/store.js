import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { head, put } from '@vercel/blob'

const CONTENT_PATH = 'cms/site-content.json'
const __dirname = dirname(fileURLToPath(import.meta.url))

function fallbackContent() {
  const raw = readFileSync(join(__dirname, 'default-content.json'), 'utf8')
  return JSON.parse(raw)
}

export async function readContent() {
  try {
    const meta = await head(CONTENT_PATH)
    const res = await fetch(meta.url, { cache: 'no-store' })
    if (!res.ok) throw new Error('fetch failed')
    return await res.json()
  } catch {
    return fallbackContent()
  }
}

export async function writeContent(content) {
  const next = {
    ...content,
    version: (content.version || 0) + 1,
    updatedAt: new Date().toISOString(),
  }
  const blob = await put(CONTENT_PATH, JSON.stringify(next), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
  return { content: next, url: blob.url }
}

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { head, put } from '@vercel/blob'
import type { SiteContent } from '../../src/types/content'

const CONTENT_PATH = 'cms/site-content.json'

function fallbackContent(): SiteContent {
  const raw = readFileSync(join(__dirname, 'default-content.json'), 'utf8')
  return JSON.parse(raw) as SiteContent
}

export async function readContent(): Promise<SiteContent> {
  try {
    const meta = await head(CONTENT_PATH)
    const res = await fetch(meta.url, { cache: 'no-store' })
    if (!res.ok) throw new Error('fetch failed')
    return (await res.json()) as SiteContent
  } catch {
    return fallbackContent()
  }
}

export async function writeContent(content: SiteContent) {
  const next: SiteContent = {
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

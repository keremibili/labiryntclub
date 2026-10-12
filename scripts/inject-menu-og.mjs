import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = join(root, 'dist', 'index.html')
const outPath = join(root, 'dist', 'menu', 'index.html')

let html = readFileSync(indexPath, 'utf8')

const replacements = [
  [
    'content="https://labiryntclub.pl/"',
    'content="https://labiryntclub.pl/menu"',
  ],
  [
    'content="Labirynt Club | Night Club & Shisha Bar · Warszawa"',
    'content="Labirynt Club | Menu — Cocktails · Shisha · Club"',
  ],
  [
    'content="Music, cocktails and shisha from dusk till dawn · Chmielna 5, Warsaw"',
    'content="See the full menu — cocktails, spirits, beer, soft drinks & shisha · Warsaw, Chmielna 5"',
  ],
  [
    'content="https://labiryntclub.pl/images/og-share.jpg"',
    'content="https://labiryntclub.pl/images/og-menu.jpg"',
  ],
  [
    'content="Labirynt Night Club & Shisha Bar — Warsaw, Chmielna 5"',
    'content="Labirynt Club menu — cocktails, shisha and more"',
  ],
  [
    '<title>Labirynt Club | Night Club & Shisha Bar · Warszawa</title>',
    '<title>Labirynt Club | Menu</title>',
  ],
]

for (const [from, to] of replacements) {
  if (!html.includes(from)) {
    console.warn('inject-menu-og: missing pattern:', from.slice(0, 60))
  }
  html = html.split(from).join(to)
}

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, html)
console.log('Wrote', outPath)

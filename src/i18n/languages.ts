import type { Lang } from '../types/content'

export const languages: {
  code: Lang
  label: string
  name: string
  flag: string
}[] = [
  { code: 'pl', label: 'PL', name: 'Polski', flag: 'https://flagcdn.com/w40/pl.png' },
  { code: 'en', label: 'EN', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'ru', label: 'RU', name: 'Русский', flag: 'https://flagcdn.com/w40/ru.png' },
  { code: 'es', label: 'ES', name: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'uk', label: 'UA', name: 'Українська', flag: 'https://flagcdn.com/w40/ua.png' },
]

export function detectLang(): Lang {
  const saved = localStorage.getItem('labirynt-lang') as Lang | null
  if (saved && languages.some((l) => l.code === saved)) return saved

  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('pl')) return 'pl'
  if (nav.startsWith('ru')) return 'ru'
  if (nav.startsWith('es')) return 'es'
  if (nav.startsWith('uk')) return 'uk'
  return 'en'
}

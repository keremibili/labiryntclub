import type { Lang, Localized } from '../types/content'

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export type DayPart = 'morning' | 'afternoon' | 'evening' | 'night'

const greetings: Record<DayPart, Localized> = {
  morning: t('Dzień dobry', 'Good morning', 'Доброе утро', 'Buenos días', 'Доброго ранку'),
  afternoon: t(
    'Miłego popołudnia',
    'Good afternoon',
    'Добрый день',
    'Buenas tardes',
    'Доброго дня',
  ),
  evening: t('Dobry wieczór', 'Good evening', 'Добрый вечер', 'Buenas noches', 'Доброго вечора'),
  night: t('Dobranoc', 'Good night', 'Доброй ночи', 'Buenas noches', 'Надобраніч'),
}

/** Warsaw club hours: morning 5–11, afternoon 12–16, evening 17–21, night 22–4 */
export function getDayPart(date = new Date()): DayPart {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Warsaw',
      hour: 'numeric',
      hour12: false,
    }).format(date),
  )

  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 22) return 'evening'
  return 'night'
}

export function getGreeting(lang: Lang, date = new Date()) {
  return greetings[getDayPart(date)][lang]
}

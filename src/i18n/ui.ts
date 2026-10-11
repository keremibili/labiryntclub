import type { Lang, Localized } from '../types/content'
import { languages as languageList } from './languages'

export const languages = languageList

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export const ui = {
  tagline: t(
    'Night Club & Shisha Bar Warszawa',
    'Night Club & Shisha Bar Warsaw',
    'Night Club & Shisha Bar Warsaw',
    'Night Club & Shisha Bar Warsaw',
    'Night Club & Shisha Bar Warsaw',
  ),
  subtitle: t(
    'Muzyka · Koktajle · Shisha — od zachodu do świtu',
    'Music · Cocktails · Shisha — from dusk till dawn',
    'Музыка · Коктейли · Кальян — от заката до рассвета',
    'Música · Cócteles · Shisha — del atardecer al amanecer',
    'Музика · Коктейлі · Кальян — від заходу до світанку',
  ),
  cta: t('Zobacz menu', 'View menu', 'Смотреть меню', 'Ver menú', 'Дивитись меню'),
  menuTitle: t('Menu', 'Menu', 'Меню', 'Carta', 'Меню'),
  currencyNote: t('Ceny w PLN', 'Prices in PLN', 'Цены в PLN', 'Precios en PLN', 'Ціни в PLN'),
  location: t('Warszawa', 'Warsaw', 'Варшава', 'Varsovia', 'Варшава'),
  footer: t(
    'Labirynt Club · Night Club & Shisha Bar',
    'Labirynt Club · Night Club & Shisha Bar',
    'Labirynt Club · Night Club & Shisha Bar',
    'Labirynt Club · Night Club & Shisha Bar',
    'Labirynt Club · Night Club & Shisha Bar',
  ),
}

export function tr(dict: Localized, lang: Lang): string {
  return dict[lang]
}

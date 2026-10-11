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
    'Club & Terrace · Warszawa',
    'Club & Terrace · Warsaw',
    'Клуб и терраса · Варшава',
    'Club & Terraza · Varsovia',
    'Клуб і тераса · Варшава',
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
    'Labirynt Club · Club & Terrace',
    'Labirynt Club · Club & Terrace',
    'Labirynt Club · Клуб и терраса',
    'Labirynt Club · Club & Terraza',
    'Labirynt Club · Клуб і тераса',
  ),
}

export function tr(dict: Localized, lang: Lang): string {
  return dict[lang]
}

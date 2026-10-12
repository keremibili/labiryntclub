import type { Lang, Localized } from '../types/content'
import type { CurrencyCode } from '../lib/fxRates'

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export const currencyCopy = {
  label: t('Waluta', 'Currency', 'Валюта', 'Moneda', 'Валюта'),
  plnNote: t('Ceny w PLN', 'Prices in PLN', 'Цены в PLN', 'Precios en PLN', 'Ціни в PLN'),
  convertedNote: t(
    'Przeliczenie wg kursu średniego NBP (orientacyjne)',
    'Converted at NBP mid rate (indicative)',
    'Пересчёт по среднему курсу NBP (ориентировочно)',
    'Conversión al tipo medio NBP (orientativo)',
    'Перерахунок за середнім курсом NBP (орієнтовно)',
  ),
  rateLine: t(
    'Kurs NBP z {date}: 1 EUR = {eur} zł · 1 USD = {usd} zł',
    'NBP rate {date}: 1 EUR = {eur} PLN · 1 USD = {usd} PLN',
    'Курс NBP на {date}: 1 EUR = {eur} zł · 1 USD = {usd} zł',
    'Tipo NBP {date}: 1 EUR = {eur} zł · 1 USD = {usd} zł',
    'Курс NBP на {date}: 1 EUR = {eur} zł · 1 USD = {usd} zł',
  ),
  loading: t('Ładowanie kursu…', 'Loading rate…', 'Загрузка курса…', 'Cargando tipo…', 'Завантаження курсу…'),
  error: t(
    'Kurs niedostępny — pokazano PLN',
    'Rate unavailable — showing PLN',
    'Курс недоступен — показан PLN',
    'Tipo no disponible — se muestra PLN',
    'Курс недоступний — показано PLN',
  ),
  payHint: t(
    'Płatność na miejscu w PLN',
    'Payment on site in PLN',
    'Оплата на месте в PLN',
    'Pago en el local en PLN',
    'Оплата на місці в PLN',
  ),
}

export function trCurrency(dict: Localized, lang: Lang): string {
  return dict[lang] || dict.en || dict.pl || ''
}

export function fillRateLine(
  template: string,
  date: string,
  eur: number,
  usd: number,
): string {
  return template
    .replace('{date}', date)
    .replace('{eur}', eur.toFixed(4))
    .replace('{usd}', usd.toFixed(4))
}

export const currencyOptions: CurrencyCode[] = ['PLN', 'EUR', 'USD']

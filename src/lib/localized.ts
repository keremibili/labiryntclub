import type { Localized } from '../types/content'

export function sameName(value: string): Localized {
  return { pl: value, en: value, ru: value, es: value, uk: value }
}

export function displayName(name: Localized) {
  return name.pl || name.en || name.ru || name.es || name.uk || ''
}

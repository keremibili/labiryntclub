export type Lang = 'pl' | 'en' | 'ru' | 'es' | 'uk'

export type Localized = Record<Lang, string>

export type PriceOption = {
  amount: number
  size?: string
}

export type MenuItem = {
  id: string
  name: Localized
  prices: PriceOption[]
  image?: string
  description?: Localized
}

export type MenuCategory = {
  id: string
  title: Localized
  image: string
  items: MenuItem[]
}

export type SiteTexts = {
  tagline: Localized
  subtitle: Localized
  cta: Localized
  menuTitle: Localized
  currencyNote: Localized
  location: Localized
  footer: Localized
}

export type SiteContent = {
  version: number
  updatedAt: string
  heroImage: string
  logoImage: string
  texts: SiteTexts
  categories: MenuCategory[]
}

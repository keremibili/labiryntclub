import { createDefaultContent } from '../data/defaultContent'
import type { Lang, Localized, MenuCategory, MenuItem, SiteContent } from '../types/content'

const LANGS: Lang[] = ['pl', 'en', 'ru', 'es', 'uk']

function asLocalized(value: unknown, fallback = ''): Localized {
  if (value && typeof value === 'object') {
    const obj = value as Partial<Record<Lang, string>>
    return {
      pl: obj.pl ?? obj.en ?? fallback,
      en: obj.en ?? obj.pl ?? fallback,
      ru: obj.ru ?? obj.en ?? obj.pl ?? fallback,
      es: obj.es ?? obj.en ?? obj.pl ?? fallback,
      uk: obj.uk ?? obj.en ?? obj.pl ?? fallback,
    }
  }
  if (typeof value === 'string') {
    return { pl: value, en: value, ru: value, es: value, uk: value }
  }
  return { pl: fallback, en: fallback, ru: fallback, es: fallback, uk: fallback }
}

/** Prefer richer default translations when CMS copied the same string to every language. */
function mergeLocalized(cms: unknown, fallback: Localized): Localized {
  const current = asLocalized(cms, fallback.pl)
  const allSame = LANGS.every((lang) => current[lang] === current.pl)
  const fallbackVaries = LANGS.some((lang) => fallback[lang] !== fallback.pl)

  if (allSame && fallbackVaries) {
    return { ...fallback }
  }

  return {
    pl: current.pl || fallback.pl,
    en: current.en || fallback.en,
    ru: current.ru || fallback.ru,
    es: current.es || fallback.es,
    uk: current.uk || fallback.uk,
  }
}

function mergeItem(item: MenuItem, fallback?: MenuItem): MenuItem {
  return {
    ...item,
    name: mergeLocalized(item.name, fallback?.name ?? asLocalized(item.name)),
    prices: item.prices ?? fallback?.prices ?? [],
    image: item.image || fallback?.image,
  }
}

function mergeCategory(category: MenuCategory, fallback?: MenuCategory): MenuCategory {
  const fallbackItems = new Map((fallback?.items ?? []).map((item) => [item.id, item]))
  return {
    ...category,
    title: mergeLocalized(category.title, fallback?.title ?? asLocalized(category.title)),
    image: category.image || fallback?.image || '',
    items: (category.items ?? []).map((item) => mergeItem(item, fallbackItems.get(item.id))),
  }
}

/** Normalize API/CMS content so menu titles and items resolve correctly per language. */
export function localizeContent(content: SiteContent): SiteContent {
  const defaults = createDefaultContent()
  const fallbackCats = new Map(defaults.categories.map((cat) => [cat.id, cat]))

  return {
    ...content,
    texts: {
      tagline: mergeLocalized(content.texts?.tagline, defaults.texts.tagline),
      subtitle: mergeLocalized(content.texts?.subtitle, defaults.texts.subtitle),
      cta: mergeLocalized(content.texts?.cta, defaults.texts.cta),
      menuTitle: mergeLocalized(content.texts?.menuTitle, defaults.texts.menuTitle),
      currencyNote: mergeLocalized(content.texts?.currencyNote, defaults.texts.currencyNote),
      location: mergeLocalized(content.texts?.location, defaults.texts.location),
      footer: mergeLocalized(content.texts?.footer, defaults.texts.footer),
    },
    categories: (content.categories ?? []).map((cat) =>
      mergeCategory(cat, fallbackCats.get(cat.id)),
    ),
  }
}

export function patchLocalized(current: Localized, lang: Lang, value: string): Localized {
  return { ...asLocalized(current), [lang]: value }
}

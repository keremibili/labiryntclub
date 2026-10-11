import { menuCategories } from './menu'
import { ui } from '../i18n/ui'
import type { SiteContent } from '../types/content'

export function createDefaultContent(): SiteContent {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    heroImage: '/images/hero-entrance.png',
    logoImage: '/images/logo.png',
    texts: {
      tagline: ui.tagline,
      subtitle: ui.subtitle,
      cta: ui.cta,
      menuTitle: ui.menuTitle,
      currencyNote: ui.currencyNote,
      location: ui.location,
      footer: ui.footer,
    },
    categories: structuredClone(menuCategories),
  }
}

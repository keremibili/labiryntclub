import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LangDropdown } from '../components/LangDropdown'
import { MenuPickCheck, MenuPickList, type PickItem } from '../components/MenuPickList'
import { ReviewButton } from '../components/ReviewButton'
import { detectLang } from '../i18n/languages'
import { getGreeting } from '../i18n/greeting'
import { legalNav, menuDisclaimer, trLegal } from '../i18n/legal'
import { tr } from '../i18n/ui'
import { fetchContent } from '../lib/api'
import { localizeContent } from '../lib/localizeContent'
import type { Lang, Localized, MenuItem, SiteContent } from '../types/content'
import { createDefaultContent } from '../data/defaultContent'
import '../App.css'

const PICK_KEY = 'labirynt-menu-picks'

function formatPrice(amount: number) {
  return `${amount.toFixed(2)} zł`
}

function itemPriceLabel(item: MenuItem) {
  return item.prices
    .map((p) => (p.size ? `${formatPrice(p.amount)} / ${p.size}` : formatPrice(p.amount)))
    .join(' · ')
}

const homeNav: Localized = {
  pl: 'Anasayfa',
  en: 'Home',
  ru: 'Главная',
  es: 'Inicio',
  uk: 'Головна',
}

export default function MenuPage() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return detectLang()
    } catch {
      return 'pl'
    }
  })
  const [content, setContent] = useState<SiteContent>(() =>
    localizeContent(createDefaultContent()),
  )
  const [activeCategory, setActiveCategory] = useState('')
  const [greeting, setGreeting] = useState(() => getGreeting(lang))
  const [pickedIds, setPickedIds] = useState<string[]>(() => {
    try {
      const raw = sessionStorage.getItem(PICK_KEY)
      const parsed = raw ? (JSON.parse(raw) as string[]) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    fetchContent().then((data) => {
      setContent(data)
      setActiveCategory((prev) => prev || data.categories[0]?.id || '')
    })
  }, [])

  useEffect(() => {
    setGreeting(getGreeting(lang))
    localStorage.setItem('labirynt-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    sessionStorage.setItem(PICK_KEY, JSON.stringify(pickedIds))
  }, [pickedIds])

  const categories = useMemo(() => content.categories, [content.categories])

  const itemIndex = useMemo(() => {
    const map = new Map<string, MenuItem>()
    for (const cat of categories) {
      for (const item of cat.items) map.set(item.id, item)
    }
    return map
  }, [categories])

  const pickedItems: PickItem[] = useMemo(
    () =>
      pickedIds
        .map((id) => itemIndex.get(id))
        .filter(Boolean)
        .map((item) => ({
          id: item!.id,
          name: item!.name,
          priceLabel: itemPriceLabel(item!),
          image: item!.image,
        })),
    [pickedIds, itemIndex],
  )

  useEffect(() => {
    if (!categories.length) return
    const sections = categories
      .map((c) => document.getElementById(`cat-${c.id}`))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActiveCategory(visible.target.id.replace('cat-', ''))
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [categories])

  const changeLang = (next: Lang) => {
    setLang(next)
  }

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  const selectCategory = (id: string) => {
    setActiveCategory(id)
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const togglePick = (id: string) => {
    setPickedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      setCartOpen(true)
      return [...prev, id]
    })
  }

  return (
    <div className="page">
      <div className="ambient" aria-hidden="true" />

      <header className="topbar">
        <Link className="brand-mini" to="/" aria-label="Labirynt Club">
          <img src={content.logoImage} alt="" width={36} height={36} />
          <span>LABIRYNT</span>
        </Link>
        <div className="menu-top-actions">
          <Link className="menu-home-link" to="/">
            {tr(homeNav, lang)}
          </Link>
          <LangDropdown lang={lang} onChange={changeLang} />
        </div>
      </header>

      <div key={lang} className="menu-lang-root" lang={lang}>
        <section className="hero" id="top">
          <div className="hero-media" aria-hidden="true">
            <img src={content.heroImage} alt="" className="hero-bg" />
            <div className="hero-veil" />
          </div>

          <div className="hero-content">
            <img
              className="hero-logo"
              src={content.logoImage}
              alt="Labirynt Club"
              width={88}
              height={88}
            />
            <h1 className="hero-brand">LABIRYNT</h1>
            <p className="hero-tag">{tr(content.texts.tagline, lang)}</p>
            <p className="hero-sub">{tr(content.texts.subtitle, lang)}</p>
            <div className="hero-actions">
              <button type="button" className="btn-primary" onClick={scrollToMenu}>
                {tr(content.texts.cta, lang)}
              </button>
              <a
                className="btn-ghost"
                href="https://www.instagram.com/labirynt_club/"
                target="_blank"
                rel="noreferrer"
              >
                @labirynt_club
              </a>
            </div>
          </div>
        </section>

        <nav className="cat-nav" aria-label="Menu categories">
          <div className="cat-nav-track">
            {categories.map((cat) => (
              <button
                key={`${lang}-${cat.id}`}
                type="button"
                className={activeCategory === cat.id ? 'active' : ''}
                onClick={() => selectCategory(cat.id)}
              >
                {tr(cat.title, lang)}
              </button>
            ))}
          </div>
        </nav>

        <main className="menu" id="menu">
          <div className="menu-head">
            {greeting ? <p className="menu-greeting">{greeting}</p> : null}
            <h2>{tr(content.texts.menuTitle, lang)}</h2>
            <p>{tr(content.texts.currencyNote, lang)}</p>
          </div>

          <aside className="menu-disclaimer">
            <p>{trLegal(menuDisclaimer, lang)}</p>
            <Link to="/rules">{trLegal(legalNav.rules, lang)}</Link>
          </aside>

          {categories.map((cat, index) => (
            <section
              key={`${lang}-${cat.id}`}
              id={`cat-${cat.id}`}
              className="category"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="category-banner">
                <img src={cat.image} alt="" loading="lazy" />
                <div className="category-banner-copy">
                  <h3>{tr(cat.title, lang)}</h3>
                </div>
              </div>

              <ul className="item-list">
                {cat.items.map((item) => {
                  const checked = pickedIds.includes(item.id)
                  return (
                    <li
                      key={item.id}
                      className={`item ${item.image ? 'item--photo' : ''} ${checked ? 'item--picked' : ''}`}
                    >
                      {item.image ? (
                        <div className="item-photo-wrap">
                          <img className="item-photo" src={item.image} alt="" loading="lazy" />
                        </div>
                      ) : null}
                      <div className="item-main">
                        <span className="item-name">{tr(item.name, lang)}</span>
                        <span className="item-rule" aria-hidden="true" />
                      </div>
                      <div className="item-prices">
                        {item.prices.map((price) => (
                          <div key={`${item.id}-${price.size ?? price.amount}`} className="price">
                            <strong>{formatPrice(price.amount)}</strong>
                            {price.size ? <span>/{price.size}</span> : null}
                          </div>
                        ))}
                      </div>
                      <MenuPickCheck
                        lang={lang}
                        checked={checked}
                        onToggle={() => togglePick(item.id)}
                      />
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </main>
      </div>

      <footer className="footer">
        <img src={content.logoImage} alt="" width={56} height={56} />
        <p>{tr(content.texts.footer, lang)}</p>
        <ReviewButton lang={lang} className="review-btn--menu" />
        <div className="footer-links">
          <Link to="/rules">{trLegal(legalNav.rules, lang)}</Link>
          <Link to="/privacy">{trLegal(legalNav.privacy, lang)}</Link>
          <Link to="/terms">{trLegal(legalNav.terms, lang)}</Link>
        </div>
        <a href="https://www.instagram.com/labirynt_club/" target="_blank" rel="noreferrer">
          instagram.com/labirynt_club
        </a>
        <a href="https://maps.app.goo.gl/jhq4CrpFruEYXS18A" target="_blank" rel="noreferrer">
          {tr(content.texts.location, lang)} · Google
        </a>
      </footer>

      <MenuPickList
        lang={lang}
        items={pickedItems}
        open={cartOpen}
        onOpenChange={setCartOpen}
        onRemove={(id) => setPickedIds((prev) => prev.filter((x) => x !== id))}
        onClear={() => setPickedIds([])}
      />
    </div>
  )
}

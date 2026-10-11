import { useEffect, useState } from 'react'
import { menuCategories, type Lang } from './data/menu'
import { languages, tr, ui } from './i18n/ui'
import './App.css'

const STORAGE_KEY = 'labirynt-lang'

function detectLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
  if (saved && languages.some((l) => l.code === saved)) return saved

  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('pl')) return 'pl'
  if (nav.startsWith('ru')) return 'ru'
  if (nav.startsWith('es')) return 'es'
  if (nav.startsWith('uk')) return 'uk'
  return 'en'
}

function formatPrice(amount: number) {
  return `${amount.toFixed(2)} zł`
}

export default function App() {
  const [lang, setLang] = useState<Lang>('pl')
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id)

  useEffect(() => {
    setLang(detectLang())
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  const selectCategory = (id: string) => {
    setActiveCategory(id)
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const sections = menuCategories
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
  }, [])

  return (
    <div className="page">
      <div className="ambient" aria-hidden="true" />

      <header className="topbar">
        <a className="brand-mini" href="#top" aria-label="Labirynt Club">
          <img src="/images/logo.png" alt="" width={36} height={36} />
          <span>LABIRYNT</span>
        </a>
        <div className="lang-switch" role="group" aria-label="Language">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              className={lang === l.code ? 'active' : ''}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true">
          <img src="/images/hero-club.jpg" alt="" className="hero-bg" />
          <div className="hero-veil" />
        </div>

        <div className="hero-content">
          <img
            className="hero-logo"
            src="/images/logo.png"
            alt="Labirynt Club"
            width={168}
            height={168}
          />
          <p className="hero-tag">{tr(ui.tagline, lang)}</p>
          <p className="hero-sub">{tr(ui.subtitle, lang)}</p>
          <div className="hero-actions">
            <button type="button" className="btn-primary" onClick={scrollToMenu}>
              {tr(ui.cta, lang)}
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
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
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
          <h2>{tr(ui.menuTitle, lang)}</h2>
          <p>{tr(ui.currencyNote, lang)}</p>
        </div>

        {menuCategories.map((cat, index) => (
          <section
            key={cat.id}
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
              {cat.items.map((item) => (
                <li key={item.id} className="item">
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
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="footer">
        <img src="/images/logo.png" alt="" width={56} height={56} />
        <p>{tr(ui.footer, lang)}</p>
        <a href="https://www.instagram.com/labirynt_club/" target="_blank" rel="noreferrer">
          instagram.com/labirynt_club
        </a>
        <a href="https://g.co/kgs/tm8pZae" target="_blank" rel="noreferrer">
          {tr(ui.location, lang)} · Google
        </a>
      </footer>
    </div>
  )
}

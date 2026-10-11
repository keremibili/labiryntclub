import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LangDropdown } from '../components/LangDropdown'
import { detectLang } from '../i18n/languages'
import { legalNav, menuDisclaimer, trLegal } from '../i18n/legal'
import { tr } from '../i18n/ui'
import { fetchContent } from '../lib/api'
import type { Lang, SiteContent } from '../types/content'
import { createDefaultContent } from '../data/defaultContent'
import '../App.css'

function formatPrice(amount: number) {
  return `${amount.toFixed(2)} zł`
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('pl')
  const [content, setContent] = useState<SiteContent>(() => createDefaultContent())
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    setLang(detectLang())
    fetchContent().then((data) => {
      setContent(data)
      if (data.categories[0]) setActiveCategory(data.categories[0].id)
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('labirynt-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (!content.categories.length) return
    const sections = content.categories
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
  }, [content.categories])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  const selectCategory = (id: string) => {
    setActiveCategory(id)
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page">
      <div className="ambient" aria-hidden="true" />

      <header className="topbar">
        <a className="brand-mini" href="#top" aria-label="Labirynt Club">
          <img src={content.logoImage} alt="" width={36} height={36} />
          <span>LABIRYNT</span>
        </a>
        <LangDropdown lang={lang} onChange={setLang} />
      </header>

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
            width={168}
            height={168}
          />
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
          {content.categories.map((cat) => (
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
          <h2>{tr(content.texts.menuTitle, lang)}</h2>
          <p>{tr(content.texts.currencyNote, lang)}</p>
        </div>

        <aside className="menu-disclaimer">
          <p>{trLegal(menuDisclaimer, lang)}</p>
          <Link to="/rules">{trLegal(legalNav.rules, lang)}</Link>
        </aside>

        {content.categories.map((cat, index) => (
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
                  {item.image ? (
                    <img className="item-photo" src={item.image} alt="" loading="lazy" />
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
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="footer">
        <img src={content.logoImage} alt="" width={56} height={56} />
        <p>{tr(content.texts.footer, lang)}</p>
        <div className="footer-links">
          <Link to="/rules">{trLegal(legalNav.rules, lang)}</Link>
          <Link to="/privacy">{trLegal(legalNav.privacy, lang)}</Link>
          <Link to="/terms">{trLegal(legalNav.terms, lang)}</Link>
        </div>
        <a href="https://www.instagram.com/labirynt_club/" target="_blank" rel="noreferrer">
          instagram.com/labirynt_club
        </a>
        <a href="https://g.co/kgs/tm8pZae" target="_blank" rel="noreferrer">
          {tr(content.texts.location, lang)} · Google
        </a>
      </footer>
    </div>
  )
}

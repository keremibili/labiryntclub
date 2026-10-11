import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LangDropdown } from '../components/LangDropdown'
import { detectLang } from '../i18n/languages'
import { legalNav, legalPages, trLegal } from '../i18n/legal'
import type { Lang } from '../types/content'
import '../App.css'
import './legal.css'

const pageKeys = ['rules', 'privacy', 'terms'] as const
type PageKey = (typeof pageKeys)[number]

function isPageKey(value: string | undefined): value is PageKey {
  return !!value && pageKeys.includes(value as PageKey)
}

export default function LegalPage() {
  const { page } = useParams()
  const [lang, setLang] = useState<Lang>('pl')
  const key: PageKey = isPageKey(page) ? page : 'rules'
  const doc = legalPages[key]

  useEffect(() => {
    setLang(detectLang())
  }, [])

  useEffect(() => {
    localStorage.setItem('labirynt-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="legal-page">
      <header className="legal-top">
        <Link to="/" className="legal-brand">
          <img src="/images/logo.png" alt="" width={36} height={36} />
          LABIRYNT
        </Link>
        <LangDropdown lang={lang} onChange={setLang} />
      </header>

      <nav className="legal-tabs">
        {pageKeys.map((k) => (
          <Link key={k} to={`/${k}`} className={k === key ? 'active' : ''}>
            {trLegal(legalNav[k], lang)}
          </Link>
        ))}
      </nav>

      <article className="legal-doc">
        <h1>{trLegal(doc.title, lang)}</h1>
        <p className="legal-intro">{trLegal(doc.intro, lang)}</p>
        {doc.sections.map((section) => (
          <section key={trLegal(section.heading, lang)}>
            <h2>{trLegal(section.heading, lang)}</h2>
            <p>{trLegal(section.body, lang)}</p>
          </section>
        ))}
        <p className="legal-updated">Labirynt Club · Warszawa</p>
        <Link to="/" className="legal-back">
          ← {trLegal(legalNav.back, lang)}
        </Link>
      </article>
    </div>
  )
}

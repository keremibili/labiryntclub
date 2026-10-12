import { useEffect, useRef, useState } from 'react'
import { languages } from '../i18n/languages'
import type { Lang } from '../types/content'

type Props = {
  lang: Lang
  onChange: (lang: Lang) => void
}

export function LangDropdown({ lang, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = languages.find((l) => l.code === lang) ?? languages[0]

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className="lang-dd" ref={ref}>
      <button
        type="button"
        className="lang-dd__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <img src={current.flag} alt="" width={20} height={14} />
        <span>{current.label}</span>
        <span className="lang-dd__chev" aria-hidden>
          ▾
        </span>
      </button>
      {open ? (
        <ul className="lang-dd__menu" role="listbox">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={l.code === lang}
                className={l.code === lang ? 'active' : ''}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange(l.code)
                  setOpen(false)
                }}
                onClick={() => {
                  onChange(l.code)
                  setOpen(false)
                }}
              >
                <img src={l.flag} alt="" width={20} height={14} />
                <span className="lang-dd__name">{l.name}</span>
                <span className="lang-dd__code">{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

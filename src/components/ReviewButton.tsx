import type { Lang } from '../types/content'

const REVIEW_URL = 'https://maps.app.goo.gl/jhq4CrpFruEYXS18A'

const labels: Record<Lang, string> = {
  pl: 'Oceń nas 5★ na Google',
  en: 'Rate us 5★ on Google',
  ru: 'Оцените нас 5★ в Google',
  es: 'Valóranos 5★ en Google',
  uk: 'Оцініть нас 5★ у Google',
}

type Props = {
  lang: Lang
  className?: string
}

export function ReviewButton({ lang, className = '' }: Props) {
  return (
    <a
      className={`review-btn ${className}`.trim()}
      href={REVIEW_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={labels[lang]}
    >
      <span className="review-btn__stars" aria-hidden="true">
        ★★★★★
      </span>
      <span>{labels[lang]}</span>
    </a>
  )
}

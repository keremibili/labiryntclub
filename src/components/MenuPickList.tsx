import { Check, ShoppingBag, X } from 'lucide-react'
import { cartCopy, trCart } from '../i18n/cart'
import { tr } from '../i18n/ui'
import type { Lang, Localized } from '../types/content'

export type PickItem = {
  id: string
  name: Localized
  priceLabel: string
  image?: string
}

type Props = {
  lang: Lang
  items: PickItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onRemove: (id: string) => void
  onClear: () => void
}

export function MenuPickList({ lang, items, open, onOpenChange, onRemove, onClear }: Props) {
  const count = items.length

  return (
    <>
      <button
        type="button"
        className={`pick-fab ${count ? 'pick-fab--active' : ''}`}
        onClick={() => onOpenChange(true)}
        aria-label={trCart(cartCopy.open, lang)}
      >
        <ShoppingBag size={18} aria-hidden />
        <span>{trCart(cartCopy.open, lang)}</span>
        {count ? <span className="pick-fab__count">{count}</span> : null}
      </button>

      <div
        className={`pick-drawer-backdrop ${open ? 'is-open' : ''}`}
        onClick={() => onOpenChange(false)}
        aria-hidden={!open}
      />

      <aside
        className={`pick-drawer ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        aria-label={trCart(cartCopy.title, lang)}
      >
        <header className="pick-drawer__head">
          <div>
            <h2>{trCart(cartCopy.title, lang)}</h2>
            <p>{trCart(cartCopy.hint, lang)}</p>
          </div>
          <button
            type="button"
            className="pick-drawer__close"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </header>

        {count === 0 ? (
          <p className="pick-drawer__empty">{trCart(cartCopy.empty, lang)}</p>
        ) : (
          <ul className="pick-drawer__list">
            {items.map((item) => (
              <li key={item.id} className="pick-drawer__item">
                {item.image ? (
                  <img src={item.image} alt="" className="pick-drawer__thumb" />
                ) : (
                  <span className="pick-drawer__thumb pick-drawer__thumb--empty" />
                )}
                <div className="pick-drawer__meta">
                  <strong>{tr(item.name, lang)}</strong>
                  <span>{item.priceLabel}</span>
                </div>
                <button
                  type="button"
                  className="pick-drawer__remove"
                  onClick={() => onRemove(item.id)}
                  aria-label={trCart(cartCopy.remove, lang)}
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {count > 0 ? (
          <footer className="pick-drawer__foot">
            <button type="button" className="pick-drawer__clear" onClick={onClear}>
              {trCart(cartCopy.clear, lang)}
            </button>
          </footer>
        ) : null}
      </aside>
    </>
  )
}

type CheckProps = {
  lang: Lang
  checked: boolean
  onToggle: () => void
}

export function MenuPickCheck({ lang, checked, onToggle }: CheckProps) {
  return (
    <button
      type="button"
      className={`pick-check ${checked ? 'is-checked' : ''}`}
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={checked ? trCart(cartCopy.added, lang) : trCart(cartCopy.add, lang)}
      title={checked ? trCart(cartCopy.added, lang) : trCart(cartCopy.add, lang)}
    >
      <Check size={16} strokeWidth={3} aria-hidden />
    </button>
  )
}

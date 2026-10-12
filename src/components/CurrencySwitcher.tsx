import { currencyCopy, currencyOptions, trCurrency } from '../i18n/currency'
import type { CurrencyCode } from '../lib/fxRates'
import type { Lang } from '../types/content'

type Props = {
  lang: Lang
  value: CurrencyCode
  onChange: (code: CurrencyCode) => void
  disabled?: boolean
}

export function CurrencySwitcher({ lang, value, onChange, disabled }: Props) {
  return (
    <div className="currency-switch" role="group" aria-label={trCurrency(currencyCopy.label, lang)}>
      {currencyOptions.map((code) => (
        <button
          key={code}
          type="button"
          className={value === code ? 'is-active' : ''}
          disabled={disabled && code !== 'PLN'}
          onClick={() => onChange(code)}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

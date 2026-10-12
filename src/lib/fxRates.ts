export type CurrencyCode = 'PLN' | 'EUR' | 'USD'

export type FxRates = {
  date: string
  /** PLN per 1 EUR */
  eur: number
  /** PLN per 1 USD */
  usd: number
  source: 'nbp'
}

const CACHE_KEY = 'labirynt-fx-nbp'
const CURRENCY_KEY = 'labirynt-currency'

type NbpTable = {
  effectiveDate: string
  rates: Array<{ code: string; mid: number }>
}

export function loadSavedCurrency(): CurrencyCode {
  try {
    const raw = localStorage.getItem(CURRENCY_KEY)
    if (raw === 'EUR' || raw === 'USD' || raw === 'PLN') return raw
  } catch {
    /* ignore */
  }
  return 'PLN'
}

export function saveCurrency(code: CurrencyCode) {
  try {
    localStorage.setItem(CURRENCY_KEY, code)
  } catch {
    /* ignore */
  }
}

function readCache(): FxRates | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as FxRates
    if (!parsed?.eur || !parsed?.usd || !parsed?.date) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(rates: FxRates) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(rates))
  } catch {
    /* ignore */
  }
}

export async function fetchFxRates(): Promise<FxRates> {
  const cached = readCache()
  if (cached) return cached

  const res = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json', {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`NBP ${res.status}`)

  const tables = (await res.json()) as NbpTable[]
  const table = tables[0]
  if (!table?.rates?.length) throw new Error('NBP empty')

  const eur = table.rates.find((r) => r.code === 'EUR')?.mid
  const usd = table.rates.find((r) => r.code === 'USD')?.mid
  if (!eur || !usd) throw new Error('NBP missing EUR/USD')

  const rates: FxRates = {
    date: table.effectiveDate,
    eur,
    usd,
    source: 'nbp',
  }
  writeCache(rates)
  return rates
}

export function convertFromPln(amountPln: number, currency: CurrencyCode, rates: FxRates | null): number {
  if (currency === 'PLN' || !rates) return amountPln
  const mid = currency === 'EUR' ? rates.eur : rates.usd
  return amountPln / mid
}

export function formatMoney(
  amountPln: number,
  currency: CurrencyCode,
  rates: FxRates | null,
  locale = 'en',
): string {
  const value = convertFromPln(amountPln, currency, rates)
  const rounded = Math.round(value * 100) / 100

  if (currency === 'PLN') {
    return `${rounded.toFixed(2)} zł`
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rounded)
  } catch {
    const symbol = currency === 'EUR' ? '€' : '$'
    return `${symbol}${rounded.toFixed(2)}`
  }
}

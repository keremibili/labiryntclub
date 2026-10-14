import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HelpCircle, Sparkles, X } from 'lucide-react'
import {
  guideQuestions,
  scoreGuide,
  type GuideResult,
} from '../data/drinkGuide'
import { drinkGuideUi, fillProgress, trGuide } from '../i18n/drinkGuideUi'
import { tr } from '../i18n/ui'
import type { CurrencyCode, FxRates } from '../lib/fxRates'
import { formatMoney } from '../lib/fxRates'
import type { Lang, MenuItem } from '../types/content'

type Props = {
  lang: Lang
  open: boolean
  onOpenChange: (open: boolean) => void
  itemIndex: Map<string, MenuItem>
  pickedIds: string[]
  onTogglePick: (id: string) => void
  onShowInMenu: (id: string) => void
  currency: CurrencyCode
  fxRates: FxRates | null
}

type Phase = 'intro' | 'quiz' | 'result'

export function DrinkGuide({
  lang,
  open,
  onOpenChange,
  itemIndex,
  pickedIds,
  onTogglePick,
  onShowInMenu,
  currency,
  fxRates,
}: Props) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<GuideResult | null>(null)
  const [locked, setLocked] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const advanceTimer = useRef<number | null>(null)

  const total = guideQuestions.length
  const question = guideQuestions[step]
  const selected = answers[step]

  const recs = useMemo(() => {
    if (!result) return []
    return result.recommendations
      .map((r) => {
        const item = itemIndex.get(r.id)
        if (!item) return null
        return { ...r, item }
      })
      .filter(Boolean) as Array<{ id: string; score: number; alcohol: boolean; item: MenuItem }>
  }, [result, itemIndex])

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    }
  }, [])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [step, phase])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const clearAdvanceTimer = () => {
    if (advanceTimer.current) {
      window.clearTimeout(advanceTimer.current)
      advanceTimer.current = null
    }
  }

  const reset = () => {
    clearAdvanceTimer()
    setPhase('intro')
    setStep(0)
    setAnswers([])
    setResult(null)
    setLocked(false)
  }

  const close = () => {
    onOpenChange(false)
    reset()
  }

  const advanceFrom = (currentStep: number, nextAnswers: string[]) => {
    if (currentStep < total - 1) {
      setStep(currentStep + 1)
      setLocked(false)
      return
    }
    setResult(scoreGuide(nextAnswers.filter(Boolean)))
    setPhase('result')
    setLocked(false)
  }

  const pickAnswer = (answerId: string) => {
    if (locked || phase !== 'quiz') return
    const currentStep = step
    const nextAnswers = [...answers]
    nextAnswers[currentStep] = answerId
    setAnswers(nextAnswers)
    setLocked(true)
    clearAdvanceTimer()
    advanceTimer.current = window.setTimeout(() => {
      advanceFrom(currentStep, nextAnswers)
    }, 220)
  }

  const goBack = () => {
    clearAdvanceTimer()
    setLocked(false)
    if (phase === 'result') {
      setPhase('quiz')
      setStep(total - 1)
      return
    }
    if (step === 0) {
      setPhase('intro')
      return
    }
    setStep((s) => s - 1)
  }

  const overlay =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div className="drink-guide-layer" role="presentation">
            <div className="drink-guide-backdrop is-open" onClick={close} aria-hidden />
            <aside
              className="drink-guide-panel is-open"
              role="dialog"
              aria-modal="true"
              aria-label={trGuide(drinkGuideUi.title, lang)}
            >
              <header className="drink-guide-panel__head">
                <div>
                  <p className="drink-guide-panel__eyebrow">
                    <Sparkles size={14} aria-hidden /> {trGuide(drinkGuideUi.title, lang)}
                  </p>
                  {phase === 'quiz' ? (
                    <p className="drink-guide-panel__progress">
                      {fillProgress(trGuide(drinkGuideUi.progress, lang), step + 1, total)}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="drink-guide-panel__close"
                  onClick={close}
                  aria-label={trGuide(drinkGuideUi.close, lang)}
                >
                  <X size={18} />
                </button>
              </header>

              <div className="drink-guide-panel__body" ref={bodyRef}>
                {phase === 'intro' ? (
                  <div className="drink-guide-intro">
                    <h2>{trGuide(drinkGuideUi.open, lang)}</h2>
                    <p>{trGuide(drinkGuideUi.subtitle, lang)}</p>
                    <button
                      type="button"
                      className="drink-guide-primary"
                      onClick={() => {
                        setPhase('quiz')
                        setStep(0)
                      }}
                    >
                      {trGuide(drinkGuideUi.start, lang)}
                    </button>
                  </div>
                ) : null}

                {phase === 'quiz' && question ? (
                  <div className="drink-guide-quiz">
                    <div className="drink-guide-quiz__bar" aria-hidden>
                      <span style={{ width: `${((step + 1) / total) * 100}%` }} />
                    </div>
                    <h2>{tr(question.prompt, lang)}</h2>
                    <div className="drink-guide-answers">
                      {question.answers.map((answer) => (
                        <button
                          key={answer.id}
                          type="button"
                          className={selected === answer.id ? 'is-active' : ''}
                          disabled={locked}
                          onClick={() => pickAnswer(answer.id)}
                        >
                          {tr(answer.label, lang)}
                        </button>
                      ))}
                    </div>
                    <div className="drink-guide-nav drink-guide-nav--solo">
                      <button type="button" className="drink-guide-ghost" onClick={goBack}>
                        {trGuide(drinkGuideUi.back, lang)}
                      </button>
                    </div>
                  </div>
                ) : null}

                {phase === 'result' && result ? (
                  <div className="drink-guide-result">
                    <p className="drink-guide-result__label">
                      {trGuide(drinkGuideUi.yourMode, lang)}
                    </p>
                    <h2>{tr(result.mode.title, lang)}</h2>
                    <p className="drink-guide-result__blurb">{tr(result.mode.blurb, lang)}</p>
                    <p className="drink-guide-result__for">{trGuide(drinkGuideUi.forYou, lang)}</p>

                    <ul className="drink-guide-recs">
                      {recs.map(({ id, item }) => {
                        const onList = pickedIds.includes(id)
                        const price = item.prices[0]
                        return (
                          <li key={id}>
                            {item.image ? (
                              <img src={item.image} alt="" className="drink-guide-recs__img" />
                            ) : (
                              <span className="drink-guide-recs__img drink-guide-recs__img--empty" />
                            )}
                            <div className="drink-guide-recs__meta">
                              <strong>{tr(item.name, lang)}</strong>
                              {item.description ? (
                                <span>{tr(item.description, lang)}</span>
                              ) : null}
                              {price ? (
                                <em>{formatMoney(price.amount, currency, fxRates, lang)}</em>
                              ) : null}
                            </div>
                            <div className="drink-guide-recs__actions">
                              <button
                                type="button"
                                className={onList ? 'is-on' : ''}
                                onClick={() => onTogglePick(id)}
                              >
                                {onList
                                  ? trGuide(drinkGuideUi.added, lang)
                                  : trGuide(drinkGuideUi.addPick, lang)}
                              </button>
                              <button
                                type="button"
                                className="is-ghost"
                                onClick={() => {
                                  onShowInMenu(id)
                                  close()
                                }}
                              >
                                {trGuide(drinkGuideUi.showInMenu, lang)}
                              </button>
                            </div>
                          </li>
                        )
                      })}
                    </ul>

                    <p className="drink-guide-result__hint">{trGuide(drinkGuideUi.hint, lang)}</p>

                    <div className="drink-guide-nav">
                      <button type="button" className="drink-guide-ghost" onClick={reset}>
                        {trGuide(drinkGuideUi.restart, lang)}
                      </button>
                      <button type="button" className="drink-guide-primary" onClick={close}>
                        {trGuide(drinkGuideUi.close, lang)}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <button
        type="button"
        className={`drink-guide-launch${open ? ' is-open' : ''}`}
        onClick={() => onOpenChange(true)}
      >
        <HelpCircle size={16} aria-hidden />
        <span>{trGuide(drinkGuideUi.open, lang)}</span>
      </button>
      {overlay}
    </>
  )
}

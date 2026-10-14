import type { Lang, Localized } from '../types/content'

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export const drinkGuideUi = {
  open: t(
    'Nie wiem co zamówić',
    "I can't decide what to order",
    'Не могу выбрать',
    'No sé qué pedir',
    'Не можу обрати',
  ),
  title: t(
    'Labirynt Drink Guide',
    'Labirynt Drink Guide',
    'Labirynt Drink Guide',
    'Labirynt Drink Guide',
    'Labirynt Drink Guide',
  ),
  subtitle: t(
    '10 szybkich pytań → dopasujemy drinki do Twojego nastroju.',
    '10 quick questions → drinks matched to your mood.',
    '10 быстрых вопросов → напитки под твоё настроение.',
    '10 preguntas rápidas → tragos según tu mood.',
    '10 швидких питань → напої під твій настрій.',
  ),
  start: t('Zaczynamy', 'Start', 'Начать', 'Empezar', 'Почати'),
  next: t('Dalej', 'Next', 'Дальше', 'Siguiente', 'Далі'),
  seeResults: t('Pokaż propozycje', 'See suggestions', 'Показать варианты', 'Ver sugerencias', 'Показати варіанти'),
  back: t('Wstecz', 'Back', 'Назад', 'Atrás', 'Назад'),
  close: t('Zamknij', 'Close', 'Закрыть', 'Cerrar', 'Закрити'),
  restart: t('Od nowa', 'Start over', 'Заново', 'Empezar de nuevo', 'Спочатку'),
  progress: t('Pytanie {n} / {total}', 'Question {n} / {total}', 'Вопрос {n} / {total}', 'Pregunta {n} / {total}', 'Питання {n} / {total}'),
  yourMode: t('Twój tryb', 'Your mode', 'Твой режим', 'Tu modo', 'Твій режим'),
  forYou: t(
    'Według tego stylu możesz wziąć:',
    'For this vibe you can go with:',
    'Под этот вайб тебе подойдёт:',
    'Para este vibe puedes pedir:',
    'Під цей вайб тобі підійде:',
  ),
  addPick: t('Dodaj do listy', 'Add to list', 'Добавить в список', 'Añadir a la lista', 'Додати до списку'),
  added: t('Na liście', 'On your list', 'В списке', 'En tu lista', 'У списку'),
  showInMenu: t('Pokaż w menu', 'Show in menu', 'Показать в меню', 'Ver en el menú', 'Показати в меню'),
  hint: t(
    'To sugestia — barman dopasuje szczegóły na miejscu.',
    'This is a suggestion — the bartender can fine-tune it on the spot.',
    'Это подсказка — бармен подправит на месте.',
    'Es una sugerencia — el bartender lo afina en el bar.',
    'Це підказка — бармен підправить на місці.',
  ),
}

export function trGuide(dict: Localized, lang: Lang): string {
  return dict[lang] || dict.en || dict.pl || ''
}

export function fillProgress(template: string, n: number, total: number): string {
  return template.replace('{n}', String(n)).replace('{total}', String(total))
}

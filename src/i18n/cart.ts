import type { Lang, Localized } from '../types/content'

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export const cartCopy = {
  title: t('Twoja lista', 'Your list', 'Ваш список', 'Tu lista', 'Твій список'),
  empty: t(
    'Zaznacz drinki zielonym ✓ — pojawią się tutaj.',
    'Tap the green ✓ on drinks — they’ll show up here.',
    'Отметьте напитки зелёным ✓ — они появятся здесь.',
    'Marca bebidas con ✓ verde — aparecerán aquí.',
    'Познач напої зеленим ✓ — вони з’являться тут.',
  ),
  open: t('Lista', 'List', 'Список', 'Lista', 'Список'),
  clear: t('Wyczyść', 'Clear', 'Очистить', 'Vaciar', 'Очистити'),
  remove: t('Usuń', 'Remove', 'Убрать', 'Quitar', 'Прибрати'),
  add: t('Dodaj do listy', 'Add to list', 'В список', 'Añadir a la lista', 'Додати до списку'),
  added: t('Na liście', 'On your list', 'В списке', 'En tu lista', 'У списку'),
  hint: t(
    'To tylko przypomnienie dla Ciebie — zamówienie składasz przy barze.',
    'Just a reminder for you — you still order at the bar.',
    'Это только напоминание — заказ оформляете у барной стойки.',
    'Solo es un recordatorio — pides en la barra.',
    'Це лише нагадування — замовлення робиш біля бару.',
  ),
  total: t('Razem', 'Total', 'Итого', 'Total', 'Разом'),
}

export function trCart(dict: Localized, lang: Lang) {
  return dict[lang] || dict.en || dict.pl
}

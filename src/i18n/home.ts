import type { Localized } from '../types/content'

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export const homeCopy = {
  navMenu: t('Menu', 'Menu', 'Меню', 'Carta', 'Меню'),
  navAbout: t('O nas', 'About', 'О нас', 'Nosotros', 'Про нас'),
  navGallery: t('Galeria', 'Gallery', 'Галерея', 'Galería', 'Галерея'),
  navVisit: t('Lokalizacja', 'Visit', 'Локация', 'Visítanos', 'Локація'),
  heroTitle: t(
    'Night Club & Shisha Bar',
    'Night Club & Shisha Bar',
    'Night Club & Shisha Bar',
    'Night Club & Shisha Bar',
    'Night Club & Shisha Bar',
  ),
  heroText: t(
    'Warszawa — muzyka, koktajle i shisha od zachodu do świtu.',
    'Warsaw — music, cocktails and shisha from dusk till dawn.',
    'Варшава — музыка, коктейли и кальян от заката до рассвета.',
    'Varsovia — música, cócteles y shisha del atardecer al amanecer.',
    'Варшава — музика, коктейлі та кальян від заходу до світанку.',
  ),
  ctaMenu: t('Otwórz menu', 'Open menu', 'Открыть меню', 'Abrir carta', 'Відкрити меню'),
  ctaIg: t('Instagram', 'Instagram', 'Instagram', 'Instagram', 'Instagram'),
  aboutTitle: t('Klimat Labirynt', 'The Labirynt vibe', 'Атмосфера Labirynt', 'El ambiente Labirynt', 'Атмосфера Labirynt'),
  aboutText: t(
    'Club & terrace w sercu Warszawy. Wieczory z dobrą muzyką, bar z koktajlami i strefa shishy — miejsce, do którego wraca się po więcej.',
    'A club and terrace in the heart of Warsaw. Nights with great music, a cocktail bar and a shisha zone — a place you come back to.',
    'Клуб и терраса в сердце Варшавы. Вечера с музыкой, бар с коктейлями и зона кальяна — место, куда хочется возвращаться.',
    'Club y terraza en el corazón de Varsovia. Noches con buena música, cócteles y zona de shisha — un sitio al que vuelves.',
    'Клуб і тераса в серці Варшави. Вечори з музикою, бар із коктейлями та зона кальяну — місце, куди хочеться повертатися.',
  ),
  galleryTitle: t('Z Instagrama', 'From Instagram', 'Из Instagram', 'Desde Instagram', 'З Instagram'),
  galleryText: t(
    'Najnowsze ujęcia z @labirynt_club',
    'Latest moments from @labirynt_club',
    'Свежие кадры из @labirynt_club',
    'Momentos recientes de @labirynt_club',
    'Найновіші кадри з @labirynt_club',
  ),
  visitTitle: t('Wpadaj', 'Come by', 'Заходите', 'Ven a vernos', 'Заходьте'),
  visitText: t(
    'Labirynt Club · Warszawa. Sprawdź lokalizację i zobacz menu online.',
    'Labirynt Club · Warsaw. Check the location and browse the menu online.',
    'Labirynt Club · Варшава. Смотрите локацию и меню онлайн.',
    'Labirynt Club · Varsovia. Mira la ubicación y la carta online.',
    'Labirynt Club · Варшава. Дивіться локацію та меню онлайн.',
  ),
}

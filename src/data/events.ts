import type { Localized } from '../types/content'

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

const photo = (id: string) =>
  `https://cdpfbnthap6gtj3h.public.blob.vercel-storage.com/ig/photos/${id}.jpg`
const video = (id: string) =>
  `https://cdpfbnthap6gtj3h.public.blob.vercel-storage.com/ig/videos/${id}.mp4`
const poster = (id: string) =>
  `https://cdpfbnthap6gtj3h.public.blob.vercel-storage.com/ig/posters/${id}.jpg`

export type ClubEvent = {
  id: string
  status: 'upcoming' | 'past'
  /** Sort key YYYY-MM-DD */
  dateKey: string
  dateLabel: Localized
  title: Localized
  text: Localized
  lineup?: string
  genres?: string
  entry?: Localized
  cover: string
  gallery: string[]
  video?: { src: string; poster: string }
}

export const clubEvents: ClubEvent[] = [
  {
    id: 'do-di-right-thing-2026',
    status: 'upcoming',
    dateKey: '2026-10-24',
    dateLabel: t(
      '24–25 października 2026 · Warszawa',
      '24–25 October 2026 · Warsaw',
      '24–25 октября 2026 · Варшава',
      '24–25 octubre 2026 · Varsovia',
      '24–25 жовтня 2026 · Варшава',
    ),
    title: t(
      'Do Di Right Thing · Edycja Specjalna',
      'Do Di Right Thing · Special Edition',
      'Do Di Right Thing · Special Edition',
      'Do Di Right Thing · Edición especial',
      'Do Di Right Thing · Special Edition',
    ),
    text: t(
      'Weekend dancehall / reggae z AUDIO THVG na parkiecie Labirynt. Po polsku, głośno i do rana — śledź @labirynt_club po godziny i szczegóły wjazdu.',
      'A dancehall / reggae weekend with AUDIO THVG on the Labirynt floor. In Polish energy, loud till late — follow @labirynt_club for doors and entry details.',
      'Выходные dancehall / reggae с AUDIO THVG на танцполе Labirynt. По-польски, громко до утра — следите за @labirynt_club.',
      'Fin de semana dancehall / reggae con AUDIO THVG en Labirynt. Energía en polaco, fuerte hasta tarde — sigue @labirynt_club.',
      'Вікенд dancehall / reggae з AUDIO THVG на танцполі Labirynt. Гучно до ранку — стеж за @labirynt_club.',
    ),
    lineup: 'AUDIO THVG',
    genres: 'Reggae · Dancehall · New Wave',
    entry: t(
      'Szczegóły wjazdu — Instagram',
      'Entry details — Instagram',
      'Детали входа — Instagram',
      'Entrada — Instagram',
      'Вхід — Instagram',
    ),
    cover: photo('3997672081481482904'),
    gallery: [
      photo('3997672081481482904'),
      photo('3997617266942060181_3997616730308504893'),
      photo('3997617266942060181_3997616728119088178'),
    ],
    video: {
      src: video('4004204735320395924'),
      poster: poster('4004204735320395924'),
    },
  },
  {
    id: 'midnight-afro-vibes-3',
    status: 'past',
    dateKey: '2026-10-03',
    dateLabel: t(
      '3 października 2026 · 22:00 till late',
      '3 October 2026 · 22:00 till late',
      '3 октября 2026 · 22:00 till late',
      '3 octubre 2026 · 22:00 till late',
      '3 жовтня 2026 · 22:00 till late',
    ),
    title: t(
      'Midnight Afro Vibes 3',
      'Midnight Afro Vibes 3',
      'Midnight Afro Vibes 3',
      'Midnight Afro Vibes 3',
      'Midnight Afro Vibes 3',
    ),
    text: t(
      'Labirynt Basement presents — afro night z DJ Quex DJY i MC Panashe. Afro Beat, Amapiano, GQOM i Hip Hop w samym centrum Warszawy.',
      'Labirynt Basement presents — afro night with DJ Quex DJY and MC Panashe. Afro Beat, Amapiano, GQOM and Hip Hop in central Warsaw.',
      'Labirynt Basement presents — afro night с DJ Quex DJY и MC Panashe. Afro Beat, Amapiano, GQOM и Hip Hop в центре Варшавы.',
      'Labirynt Basement presents — noche afro con DJ Quex DJY y MC Panashe. Afro Beat, Amapiano, GQOM y Hip Hop en el centro de Varsovia.',
      'Labirynt Basement presents — afro night з DJ Quex DJY і MC Panashe. Afro Beat, Amapiano, GQOM і Hip Hop у центрі Варшави.',
    ),
    lineup: 'DJ Quex DJY · MC Panashe',
    genres: 'Afro Beat · Amapiano · GQOM · Hip Hop',
    entry: t('Labirynt Club · Chmielna 5', 'Labirynt Club · Chmielna 5', 'Labirynt Club · Chmielna 5', 'Labirynt Club · Chmielna 5', 'Labirynt Club · Chmielna 5'),
    cover: photo('3997651573885126598'),
    gallery: [
      photo('3997651573885126598'),
      photo('3999702961420578546_3999700705021839308'),
      photo('3999702961420578546_3999700721312556269'),
      photo('3999702961420578546_3999700719743800745'),
    ],
    video: {
      src: video('4003421779064767724'),
      poster: poster('4003421779064767724'),
    },
  },
  {
    id: 'jersey-baile-nights',
    status: 'past',
    dateKey: '2026-08-26',
    dateLabel: t(
      'Sierpień 2026 · club nights',
      'August 2026 · club nights',
      'Август 2026 · club nights',
      'Agosto 2026 · club nights',
      'Серпень 2026 · club nights',
    ),
    title: t(
      'Jersey Club & Baile Funk',
      'Jersey Club & Baile Funk',
      'Jersey Club & Baile Funk',
      'Jersey Club & Baile Funk',
      'Jersey Club & Baile Funk',
    ),
    text: t(
      'Noce z rytmami Jersey Club i Baile Funk — DJ Alp za konsolą, parkiet rozkręcony. Every day, bigger and better.',
      'Nights of Jersey Club and Baile Funk — DJ Alp on the decks, floor fully on. Every day, bigger and better.',
      'Ночи Jersey Club и Baile Funk — DJ Alp за пультом, танцпол в огне. Every day, bigger and better.',
      'Noches de Jersey Club y Baile Funk — DJ Alp en las decks. Every day, bigger and better.',
      'Ночі Jersey Club і Baile Funk — DJ Alp за пультом. Every day, bigger and better.',
    ),
    lineup: 'DJ Alp',
    genres: 'Jersey Club · Baile Funk',
    cover: photo('3999702961420578546_3999700720658378068'),
    gallery: [
      photo('3999702961420578546_3999700720658378068'),
      photo('3999702961420578546_3999700719936806631'),
      photo('3999702961420578546_3999700705248343130'),
    ],
    video: {
      src: video('3972418376823096958'),
      poster: poster('3972418376823096958'),
    },
  },
  {
    id: 'bass-garden-open-decks-aug',
    status: 'past',
    dateKey: '2026-08-21',
    dateLabel: t(
      '21 sierpnia 2026 · 23:00',
      '21 August 2026 · 23:00',
      '21 августа 2026 · 23:00',
      '21 agosto 2026 · 23:00',
      '21 серпня 2026 · 23:00',
    ),
    title: t(
      'Bass Garden × Open Decks',
      'Bass Garden × Open Decks',
      'Bass Garden × Open Decks',
      'Bass Garden × Open Decks',
      'Bass Garden × Open Decks',
    ),
    text: t(
      'Kolejna edycja open decks z Bass Garden — każdy mógł stanąć za deckami i rozgrzać salę. Drum & bass community w Labirynt.',
      'Another Bass Garden open-decks edition — anyone could step up and heat the room. Drum & bass community at Labirynt.',
      'Ещё одно open decks от Bass Garden — любой мог встать за пультом. Drum & bass community в Labirynt.',
      'Otra edición open decks de Bass Garden — cualquiera podía subir a las decks. Comunidad drum & bass en Labirynt.',
      'Ще одне open decks від Bass Garden — кожен міг стати за пультом. Drum & bass community у Labirynt.',
    ),
    lineup: 'Open Decks · Bass Garden crew',
    genres: 'Drum & Bass · Jungle',
    entry: t('10 PLN + shot', '10 PLN + shot', '10 PLN + shot', '10 PLN + shot', '10 PLN + shot'),
    cover: photo('3999702961420578546_3999700725154494692'),
    gallery: [
      photo('3999702961420578546_3999700725154494692'),
      photo('3999702961420578546_3999700703126186934'),
      photo('3997617266942060181_3997616731893870904'),
    ],
    video: {
      src: video('3940457863838907354'),
      poster: poster('3940457863838907354'),
    },
  },
  {
    id: 'bass-garden-vol-1',
    status: 'past',
    dateKey: '2026-07-17',
    dateLabel: t(
      '17 lipca 2026 · 21:00',
      '17 July 2026 · 21:00',
      '17 июля 2026 · 21:00',
      '17 julio 2026 · 21:00',
      '17 липня 2026 · 21:00',
    ),
    title: t(
      'Bass Garden @ Labirynt vol. 1',
      'Bass Garden @ Labirynt vol. 1',
      'Bass Garden @ Labirynt vol. 1',
      'Bass Garden @ Labirynt vol. 1',
      'Bass Garden @ Labirynt vol. 1',
    ),
    text: t(
      'Chrzest Labirynt na undergroundowej mapie Warszawy — pierwsza impreza serii Bass Garden z open decks i pełnym lineupem DnB.',
      'Labirynt’s baptism on Warsaw’s underground map — the first Bass Garden night with open decks and a full DnB lineup.',
      'Крещение Labirynt на андеграундной карте Варшавы — первая вечеринка серии Bass Garden с open decks и лайнапам DnB.',
      'El bautizo de Labirynt en el underground de Varsovia — primera noche Bass Garden con open decks y lineup DnB.',
      'Хрещення Labirynt на андеграундній мапі Варшави — перша вечірка серії Bass Garden з open decks і лайнапом DnB.',
    ),
    lineup: 'AOE Buff · BassQ · Euan · Killcode · Lucid Sun · SQAYA · TrX',
    genres: 'Drum & Bass · Open Decks',
    entry: t('Wstęp wolny', 'Free entry', 'Вход свободный', 'Entrada libre', 'Вхід вільний'),
    cover: photo('3999702961420578546_3999700726127537317'),
    gallery: [
      photo('3999702961420578546_3999700726127537317'),
      photo('3999702961420578546_3999700704182940031'),
      photo('3999702961420578546_3999700705290430498'),
    ],
    video: {
      src: video('3976514554291363467'),
      poster: poster('3976514554291363467'),
    },
  },
  {
    id: 'caribbean-rave-2025',
    status: 'past',
    dateKey: '2025-11-28',
    dateLabel: t(
      '28 listopada 2025 · 21:00',
      '28 November 2025 · 21:00',
      '28 ноября 2025 · 21:00',
      '28 noviembre 2025 · 21:00',
      '28 листопада 2025 · 21:00',
    ),
    title: t(
      'Caribbean Rave · AudioThvg & Sensithief',
      'Caribbean Rave · AudioThvg & Sensithief',
      'Caribbean Rave · AudioThvg & Sensithief',
      'Caribbean Rave · AudioThvg & Sensithief',
      'Caribbean Rave · AudioThvg & Sensithief',
    ),
    text: t(
      'Nowy rozdział na mapie Warszawy: dancehall, shatta, afrobeats, hip-hop, grime, jungle i drum’n’bass — FREE entry, do białego rana.',
      'A new chapter on Warsaw’s map: dancehall, shatta, afrobeats, hip-hop, grime, jungle and drum’n’bass — FREE entry, till dawn.',
      'Новая глава на карте Варшавы: dancehall, shatta, afrobeats, hip-hop, grime, jungle и drum’n’bass — FREE entry до утра.',
      'Un nuevo capítulo en Varsovia: dancehall, shatta, afrobeats, hip-hop, grime, jungle y drum’n’bass — entrada FREE hasta el amanecer.',
      'Новий розділ на мапі Варшави: dancehall, shatta, afrobeats, hip-hop, grime, jungle і drum’n’bass — FREE entry до світанку.',
    ),
    lineup: 'AudioThvg · Sensithief',
    genres: 'Dancehall · Shatta · Afrobeats · Jungle · DnB',
    entry: t('Wstęp wolny', 'Free entry', 'Вход свободный', 'Entrada libre', 'Вхід вільний'),
    cover: photo('3999702961420578546_3999700719936806631'),
    gallery: [
      photo('3999702961420578546_3999700719936806631'),
      photo('3997617266942060181_3997616729142519271'),
      photo('3999702961420578546_3999700704988393647'),
    ],
    video: {
      src: video('4001223023956658002_4001220296233025899'),
      poster: poster('4001223023956658002_4001220296233025899'),
    },
  },
]

export const upcomingEvents = clubEvents.filter((e) => e.status === 'upcoming')
export const pastEvents = clubEvents.filter((e) => e.status === 'past')

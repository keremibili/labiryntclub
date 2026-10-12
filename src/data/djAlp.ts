const blob = (file: string) =>
  `https://cdpfbnthap6gtj3h.public.blob.vercel-storage.com/dj-alp/${file}`

export const djAlp = {
  stageName: 'DJ Alpa',
  fullName: 'Alp Kınacı',
  handle: '@alpkinaci',
  instagram: 'https://www.instagram.com/alpkinaci/',
  soundcloud: 'https://soundcloud.com/alpkinaci',
  clubInstagram: 'https://www.instagram.com/labirynt_club/',
  avatar: blob('avatar.jpg'),
  photos: [
    { src: blob('avatar.jpg'), alt: 'DJ Alpa behind the decks' },
    { src: blob('booth-1.jpg'), alt: 'DJ Alpa at Labirynt Club booth' },
    { src: blob('booth-2.jpg'), alt: 'Labirynt Club neon booth with DJ Alpa' },
    { src: blob('release-live-set.jpg'), alt: 'Dancehall Reggaeton live club set' },
    { src: blob('release-bailey.jpg'), alt: 'Bailey Nights Vol.1 live set' },
    { src: blob('release-slim-shady.jpg'), alt: 'DJ Alpa Baile Funk remix artwork' },
    { src: blob('release-brazilian-funk.jpg'), alt: 'Brazilian Funk remix artwork' },
    { src: blob('release-flor.jpg'), alt: 'Flor no Apartament artwork' },
  ],
  highlights: [
    'soundcloud.com/alpkinaci',
    'instagram.com/alpkinaci',
  ],
}

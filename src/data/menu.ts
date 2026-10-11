export type Lang = 'pl' | 'en' | 'ru' | 'es' | 'uk'

export type Localized = Record<Lang, string>

export type PriceOption = {
  amount: number
  size?: string
}

export type MenuItem = {
  id: string
  name: Localized
  prices: PriceOption[]
  image?: string
}

export type MenuCategory = {
  id: string
  title: Localized
  image: string
  items: MenuItem[]
}

const n = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

const brand = (name: string): Localized => n(name, name, name, name, name)

export const menuCategories: MenuCategory[] = [
  {
    id: 'soft-drinks',
    title: n(
      'Napoje bezalkoholowe',
      'Soft drinks',
      'Безалкогольные напитки',
      'Bebidas sin alcohol',
      'Безалкогольні напої',
    ),
    image: '/images/cat-soft-drinks.jpg',
    items: [
      { id: 'cola-zero', name: brand('Coca-Cola Zero Cukru 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      { id: 'cola-zero-caffeine', name: brand('Coca-Cola Zero Cukru Zero Kofeiny 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      { id: 'cola-original', name: brand('Coca-Cola Original Taste 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      { id: 'fanta', name: brand('Fanta Orange 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      { id: 'sprite', name: brand('Sprite 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      { id: 'kinley-tonic', name: brand('Kinley Tonic Water 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      { id: 'kinley-cherry', name: brand('Kinley Cherry Pepper 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      { id: 'kinley-purple', name: brand('Kinley Purple 250 ml'), prices: [{ amount: 12, size: '0.25 l' }] },
      {
        id: 'kropla-still',
        name: n(
          'Kropla Beskidu woda niegazowana 330 ml',
          'Kropla Beskidu still water 330 ml',
          'Kropla Beskidu негазированная вода 330 ml',
          'Kropla Beskidu agua sin gas 330 ml',
          'Kropla Beskidu негазована вода 330 ml',
        ),
        prices: [{ amount: 12, size: '0.33 l' }],
      },
      {
        id: 'kropla-sparkling',
        name: n(
          'Kropla Delice woda gazowana 330 ml',
          'Kropla Delice sparkling water 330 ml',
          'Kropla Delice газированная вода 330 ml',
          'Kropla Delice agua con gas 330 ml',
          'Kropla Delice газована вода 330 ml',
        ),
        prices: [{ amount: 12, size: '0.33 l' }],
      },
      {
        id: 'cappy-orange',
        name: n('Cappy pomarańczowy 250 ml', 'Cappy orange 250 ml', 'Cappy апельсин 250 ml', 'Cappy naranja 250 ml', 'Cappy апельсин 250 ml'),
        prices: [{ amount: 12, size: '0.25 l' }],
      },
      {
        id: 'cappy-apple',
        name: n('Cappy jabłkowy 250 ml', 'Cappy apple 250 ml', 'Cappy яблоко 250 ml', 'Cappy manzana 250 ml', 'Cappy яблуко 250 ml'),
        prices: [{ amount: 12, size: '0.25 l' }],
      },
      {
        id: 'cappy-multi',
        name: n('Cappy multiwitamina 250 ml', 'Cappy multivitamin 250 ml', 'Cappy мультивитамин 250 ml', 'Cappy multivitamina 250 ml', 'Cappy мультивітамін 250 ml'),
        prices: [{ amount: 12, size: '0.25 l' }],
      },
      {
        id: 'cappy-grapefruit',
        name: n('Cappy grejpfrutowy 250 ml', 'Cappy grapefruit 250 ml', 'Cappy грейпфрут 250 ml', 'Cappy pomelo 250 ml', 'Cappy грейпфрут 250 ml'),
        prices: [{ amount: 12, size: '0.25 l' }],
      },
    ],
  },
  {
    id: 'bottles',
    title: n('Butelki', 'Bottles', 'Бутылки', 'Botellas', 'Пляшки'),
    image: '/images/cat-spirits.jpg',
    items: [
      { id: 'b-finlandia', name: brand('Finlandia'), prices: [{ amount: 200, size: '0.50 l' }] },
      { id: 'b-jd-fire', name: brand("Jack Daniel's Tennessee Fire"), prices: [{ amount: 360, size: '0.70 l' }] },
      { id: 'b-jd-honey', name: brand("Jack Daniel's Tennessee Honey"), prices: [{ amount: 360, size: '0.70 l' }] },
      { id: 'b-jd-apple', name: brand("Jack Daniel's Tennessee Apple"), prices: [{ amount: 360, size: '0.70 l' }] },
      { id: 'b-zubrowka', name: brand('Żubrówka Bison Grass'), prices: [{ amount: 160, size: '0.50 l' }] },
      { id: 'b-jim-beam', name: brand('Jim Beam'), prices: [{ amount: 250, size: '0.70 l' }] },
      { id: 'b-chivas-12', name: brand('Chivas Regal 12 Y.O.'), prices: [{ amount: 380, size: '0.70 l' }] },
      { id: 'b-chivas-18', name: brand('Chivas Regal 18 Y.O.'), prices: [{ amount: 800, size: '0.70 l' }] },
      { id: 'b-gentleman', name: brand('Gentleman Jack'), prices: [{ amount: 450, size: '0.70 l' }] },
      { id: 'b-jw-red', name: brand('Johnnie Walker Red Label'), prices: [{ amount: 260, size: '0.70 l' }] },
      { id: 'b-ballantines', name: brand("Ballantine's"), prices: [{ amount: 260, size: '0.70 l' }] },
      { id: 'b-grants', name: brand("Grant's"), prices: [{ amount: 260, size: '0.70 l' }] },
      { id: 'b-don-diego', name: brand('Don Diego Silver'), prices: [{ amount: 300, size: '0.70 l' }] },
      { id: 'b-absolut', name: brand('Absolut'), prices: [{ amount: 180, size: '0.50 l' }] },
      { id: 'b-belvedere', name: brand('Belvedere'), prices: [{ amount: 300, size: '0.50 l' }] },
      { id: 'b-jameson', name: brand('Jameson'), prices: [{ amount: 360, size: '0.70 l' }] },
    ],
  },
  {
    id: 'vodka',
    title: n('Wódka', 'Vodka', 'Водка', 'Vodka', 'Горілка'),
    image: '/images/cat-spirits.jpg',
    items: [
      { id: 'v-finlandia', name: brand('Finlandia'), prices: [{ amount: 10, size: '0.25 l' }] },
      { id: 'v-zubrowka-biala', name: brand('Żubrówka Biała'), prices: [{ amount: 8, size: '0.25 l' }] },
      { id: 'v-soplica', name: brand('Soplica'), prices: [{ amount: 8, size: '0.25 l' }] },
      { id: 'v-absolut', name: brand('Absolut'), prices: [{ amount: 10, size: '0.25 l' }] },
      { id: 'v-belvedere', name: brand('Belvedere'), prices: [{ amount: 18 }] },
      { id: 'v-chivas-12', name: brand('Chivas Regal 12 Y.O.'), prices: [{ amount: 28, size: '0.04 l' }] },
      { id: 'v-jd', name: brand("Jack Daniel's Old No. 7"), prices: [{ amount: 25, size: '0.04 l' }] },
      { id: 'v-grants', name: brand("Grant's"), prices: [{ amount: 22, size: '0.04 l' }] },
      { id: 'v-gentleman', name: brand('Gentleman Jack'), prices: [{ amount: 30, size: '0.04 l' }] },
      { id: 'v-jameson', name: brand('Jameson'), prices: [{ amount: 27, size: '0.04 l' }] },
      { id: 'v-jim-beam', name: brand('Jim Beam'), prices: [{ amount: 23, size: '0.04 l' }] },
      { id: 'v-ballantines', name: brand("Ballantine's"), prices: [{ amount: 23, size: '0.04 l' }] },
    ],
  },
  {
    id: 'gin',
    title: n('Gin', 'Gin', 'Джин', 'Ginebra', 'Джин'),
    image: '/images/cat-spirits.jpg',
    items: [
      { id: 'g-bombay', name: brand('Bombay Sapphire'), prices: [{ amount: 20, size: '0.25 l' }] },
      { id: 'g-gordons', name: brand("Gordon's Gin"), prices: [{ amount: 18, size: '0.25 l' }] },
      { id: 'g-bialowieski', name: brand('Gin Białowieski Żubrówka'), prices: [{ amount: 14, size: '0.25 l' }] },
    ],
  },
  {
    id: 'shots',
    title: n('Shots', 'Shots', 'Шоты', 'Chupitos', 'Шоти'),
    image: '/images/cat-spirits.jpg',
    items: [
      { id: 's-jager', name: brand('Jägermeister'), prices: [{ amount: 20, size: '0.04 l' }] },
      { id: 's-tequila', name: brand('Tequila'), prices: [{ amount: 15, size: '0.03 l' }] },
      { id: 's-sambuca', name: brand('Sambuca'), prices: [{ amount: 25, size: '0.04 l' }] },
    ],
  },
  {
    id: 'beer-bottle',
    title: n('Piwo w butelkach', 'Bottled beer', 'Пиво в бутылках', 'Cerveza en botella', 'Пиво в пляшках'),
    image: '/images/cat-beer.jpg',
    items: [
      { id: 'bb-zywiec-00', name: brand('Żywiec 0.0'), prices: [{ amount: 16 }] },
      { id: 'bb-desperados', name: brand('Desperados'), prices: [{ amount: 19 }] },
      { id: 'bb-porter', name: brand('Żywiec Porter'), prices: [{ amount: 19 }] },
      { id: 'bb-biale', name: brand('Żywiec Białe'), prices: [{ amount: 19, size: '0.50 l' }] },
      { id: 'bb-ipa', name: brand('Żywiec IPA'), prices: [{ amount: 19, size: '0.50 l' }] },
      { id: 'bb-apa', name: brand('Żywiec APA'), prices: [{ amount: 19, size: '0.50 l' }] },
      { id: 'bb-corona', name: brand('Corona Extra'), prices: [{ amount: 20 }] },
    ],
  },
  {
    id: 'beer-draft',
    title: n('Piwo beczkowe', 'Draft beer', 'Разливное пиво', 'Cerveza de barril', 'Пиво розливне'),
    image: '/images/cat-beer.jpg',
    items: [
      {
        id: 'bd-zywiec',
        name: brand('Żywiec'),
        prices: [
          { amount: 12, size: '0.30 l' },
          { amount: 16, size: '0.50 l' },
        ],
      },
      {
        id: 'bd-biale',
        name: brand('Żywiec Białe'),
        prices: [
          { amount: 14, size: '0.30 l' },
          { amount: 18, size: '0.50 l' },
        ],
      },
    ],
  },
  {
    id: 'shisha',
    title: n('Shisha', 'Shisha', 'Кальян', 'Shisha', 'Кальян'),
    image: '/images/cat-shisha.jpg',
    items: [
      {
        id: 'sh-classic',
        name: n('Classic', 'Classic', 'Классика', 'Clásico', 'Класика'),
        prices: [{ amount: 80 }],
      },
      {
        id: 'sh-dark-classic',
        name: n(
          'Ciemny i klasyczny miks',
          'Dark & classic mix',
          'Тёмный и классический микс',
          'Mezcla oscura y clásica',
          'Темний і класичний мікс',
        ),
        prices: [{ amount: 100 }],
      },
      {
        id: 'sh-dark',
        name: n('Ciemny', 'Dark', 'Тёмный', 'Oscuro', 'Темний'),
        prices: [{ amount: 120 }],
      },
    ],
  },
]

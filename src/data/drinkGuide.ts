import type { Localized } from '../types/content'

const L = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export type DrinkTag =
  | 'sweet'
  | 'sour'
  | 'bitter'
  | 'fresh'
  | 'tropical'
  | 'creamy'
  | 'herbal'
  | 'strong'
  | 'light'
  | 'party'
  | 'elegant'
  | 'energy'
  | 'nonalc'
  | 'beer'
  | 'shisha'
  | 'classic'
  | 'premium'
  | 'mint'
  | 'coffee'
  | 'citrus'
  | 'shot'

export type ModeId =
  | 'neon-rush'
  | 'soft-glow'
  | 'sour-edge'
  | 'tropical-float'
  | 'dark-velvet'
  | 'zero-fuel'
  | 'smoke-sip'

export type DrinkProfile = {
  id: string
  tags: DrinkTag[]
  alcohol: boolean
}

export type GuideAnswer = {
  id: string
  label: Localized
  scores: Partial<Record<DrinkTag, number>>
  modes?: Partial<Record<ModeId, number>>
  forceNonAlc?: boolean
  allowAlc?: boolean
}

export type GuideQuestion = {
  id: string
  prompt: Localized
  answers: GuideAnswer[]
}

export type GuideMode = {
  id: ModeId
  title: Localized
  blurb: Localized
  tags: DrinkTag[]
}

export const guideModes: GuideMode[] = [
  {
    id: 'neon-rush',
    title: L('Neon Rush', 'Neon Rush', 'Neon Rush', 'Neon Rush', 'Neon Rush'),
    blurb: L(
      'Chcesz energii, basu i szybkiego startu nocy.',
      'You want energy, bass and a fast start to the night.',
      'Хочешь энергию, бас и быстрый старт ночи.',
      'Quieres energía, bajo y un arranque rápido de la noche.',
      'Хочеш енергію, бас і швидкий старт ночі.',
    ),
    tags: ['energy', 'party', 'strong', 'herbal', 'shot'],
  },
  {
    id: 'soft-glow',
    title: L('Soft Glow', 'Soft Glow', 'Soft Glow', 'Soft Glow', 'Soft Glow'),
    blurb: L(
      'Lekko, przyjemnie, bez pośpiechu — rozmowa i dobra atmosfera.',
      'Easy, pleasant, no rush — conversation and good vibes.',
      'Легко, приятно, без спешки — разговор и вайб.',
      'Fácil, agradable, sin prisa — conversación y buen vibe.',
      'Легко, приємно, без поспіху — розмова і вайб.',
    ),
    tags: ['light', 'elegant', 'bitter', 'classic', 'fresh'],
  },
  {
    id: 'sour-edge',
    title: L('Sour Edge', 'Sour Edge', 'Sour Edge', 'Sour Edge', 'Sour Edge'),
    blurb: L(
      'Lubisz wyraziste, kwaśne i czyste smaki.',
      'You like bold, sour and clean flavours.',
      'Любишь яркие, кислые и чистые вкусы.',
      'Te gustan sabores vivos, ácidos y limpios.',
      'Любиш яскраві, кислі й чисті смаки.',
    ),
    tags: ['sour', 'citrus', 'classic', 'fresh'],
  },
  {
    id: 'tropical-float',
    title: L('Tropical Float', 'Tropical Float', 'Tropical Float', 'Tropical Float', 'Tropical Float'),
    blurb: L(
      'Owocowo, słodko, wakacyjnie — jak mini urlop w szklance.',
      'Fruity, sweet, vacation vibes — a mini holiday in a glass.',
      'Фруктово, сладко, по-отпускному — мини-отпуск в бокале.',
      'Afrutado, dulce, vibes de vacaciones — mini holiday en vaso.',
      'Фруктово, солодко, відпускний вайб — міні-відпустка в келиху.',
    ),
    tags: ['tropical', 'sweet', 'fresh', 'light'],
  },
  {
    id: 'dark-velvet',
    title: L('Dark Velvet', 'Dark Velvet', 'Dark Velvet', 'Dark Velvet', 'Dark Velvet'),
    blurb: L(
      'Głęboko, kremowo, nocny klimat — wolniej i intensywniej.',
      'Deep, creamy, late-night mood — slower and richer.',
      'Глубоко, кремово, ночной вайб — медленнее и насыщеннее.',
      'Profundo, cremoso, mood de madrugada — más lento e intenso.',
      'Глибоко, кремово, нічний вайб — повільніше й насиченіше.',
    ),
    tags: ['creamy', 'coffee', 'premium', 'strong'],
  },
  {
    id: 'zero-fuel',
    title: L('Zero Fuel', 'Zero Fuel', 'Zero Fuel', 'Zero Fuel', 'Zero Fuel'),
    blurb: L(
      'Bez alkoholu, ale z charakterem — świeżo i z powerem.',
      'No alcohol, still with character — fresh and powered up.',
      'Без алкоголя, но с характером — свежо и с энергией.',
      'Sin alcohol, con carácter — fresco y con energía.',
      'Без алкоголю, але з характером — свіжо й з енергією.',
    ),
    tags: ['nonalc', 'energy', 'fresh', 'citrus'],
  },
  {
    id: 'smoke-sip',
    title: L('Smoke & Sip', 'Smoke & Sip', 'Smoke & Sip', 'Smoke & Sip', 'Smoke & Sip'),
    blurb: L(
      'Shisha + drink obok — długi, relaksujący rytm nocy.',
      'Shisha plus a drink beside it — a long, relaxed night rhythm.',
      'Кальян + напиток рядом — длинный, спокойный ритм ночи.',
      'Shisha + un trago al lado — ritmo largo y relajado.',
      'Кальян + напій поруч — довгий, спокійний ритм ночі.',
    ),
    tags: ['shisha', 'light', 'tropical', 'creamy'],
  },
]

/** Profiles for scoreable menu items (cocktails + soft energy + beer + shisha). */
export const drinkProfiles: DrinkProfile[] = [
  { id: 'c-gin-tonic', tags: ['bitter', 'fresh', 'classic', 'light', 'citrus'], alcohol: true },
  { id: 'c-cuba-libre', tags: ['sweet', 'citrus', 'classic', 'light'], alcohol: true },
  { id: 'c-tequila-sunrise', tags: ['sweet', 'tropical', 'classic', 'light'], alcohol: true },
  { id: 'c-blue-lagoon', tags: ['sweet', 'citrus', 'fresh', 'party'], alcohol: true },
  { id: 'c-jagerbomb', tags: ['herbal', 'energy', 'party', 'strong'], alcohol: true },
  { id: 'c-mojito', tags: ['mint', 'fresh', 'citrus', 'light', 'classic'], alcohol: true },
  { id: 'c-pina-colada', tags: ['tropical', 'sweet', 'creamy', 'light'], alcohol: true },
  { id: 'c-sex-on-the-beach', tags: ['sweet', 'tropical', 'party', 'light'], alcohol: true },
  { id: 'c-jungle-juice', tags: ['tropical', 'sweet', 'party', 'light'], alcohol: true },
  { id: 'c-zombie', tags: ['tropical', 'sweet', 'strong', 'party'], alcohol: true },
  { id: 'c-white-russian', tags: ['creamy', 'coffee', 'premium', 'elegant'], alcohol: true },
  { id: 'c-lynchburg-lemonade', tags: ['citrus', 'fresh', 'sweet', 'classic'], alcohol: true },
  { id: 'c-cosmopolitan', tags: ['elegant', 'sour', 'citrus', 'premium'], alcohol: true },
  { id: 'c-margarita', tags: ['sour', 'citrus', 'classic', 'strong'], alcohol: true },
  { id: 'c-aperol-spritz', tags: ['bitter', 'light', 'elegant', 'fresh'], alcohol: true },
  { id: 'c-jager-mojito', tags: ['herbal', 'mint', 'fresh', 'party'], alcohol: true },
  { id: 'c-caipirinha', tags: ['sour', 'citrus', 'classic', 'strong'], alcohol: true },
  { id: 'c-bahama-mama', tags: ['tropical', 'sweet', 'premium', 'party'], alcohol: true },
  { id: 'c-vodka-sour', tags: ['sour', 'citrus', 'classic', 'light'], alcohol: true },
  { id: 'c-whiskey-sour', tags: ['sour', 'classic', 'premium', 'elegant'], alcohol: true },
  { id: 'c-gin-sour', tags: ['sour', 'fresh', 'classic', 'citrus'], alcohol: true },
  { id: 'c-long-island-ice-tea', tags: ['strong', 'party', 'classic', 'sweet'], alcohol: true },
  { id: 'c-brazilian-julep', tags: ['strong', 'mint', 'premium', 'herbal'], alcohol: true },
  { id: 'c-bob-marley', tags: ['tropical', 'sweet', 'party', 'fresh'], alcohol: true },
  { id: 'c-spring-paradise', tags: ['tropical', 'fresh', 'premium', 'citrus'], alcohol: true },
  { id: 'c-green-oasis', tags: ['tropical', 'fresh', 'citrus', 'light'], alcohol: true },
  { id: 'c-melon-sunset', tags: ['tropical', 'sweet', 'fresh', 'light'], alcohol: true },
  { id: 'c-screwdriver-blue', tags: ['citrus', 'sweet', 'fresh', 'party'], alcohol: true },
  { id: 'c-tropical-red-bull', tags: ['nonalc', 'energy', 'tropical', 'fresh'], alcohol: false },
  { id: 'c-red-bull-mojito', tags: ['energy', 'mint', 'fresh', 'party'], alcohol: true },
  { id: 'c-pineapple-mint-red-bull', tags: ['nonalc', 'energy', 'tropical', 'mint'], alcohol: false },
  { id: 'c-apple-red-bull', tags: ['nonalc', 'energy', 'fresh', 'citrus'], alcohol: false },
  { id: 'c-kamikaze-x4', tags: ['shot', 'sour', 'party', 'strong', 'citrus'], alcohol: true },
  { id: 'c-b-52', tags: ['shot', 'creamy', 'coffee', 'sweet', 'party'], alcohol: true },
  { id: 'c-baby-guinnes', tags: ['shot', 'creamy', 'coffee', 'sweet'], alcohol: true },
  { id: 'c-slippery-nipple', tags: ['shot', 'creamy', 'sweet', 'party'], alcohol: true },
  { id: 'c-malibu-shot', tags: ['shot', 'tropical', 'sweet', 'light'], alcohol: true },
  { id: 'c-absinthe-sugar-flame', tags: ['shot', 'strong', 'herbal', 'party'], alcohol: true },
  { id: 'c-hiroshima', tags: ['shot', 'strong', 'party', 'creamy'], alcohol: true },
  { id: 'c-redhead-slut', tags: ['shot', 'herbal', 'sweet', 'party'], alcohol: true },
  { id: 'bb-desperados', tags: ['beer', 'sweet', 'party', 'light'], alcohol: true },
  { id: 'bb-corona', tags: ['beer', 'light', 'fresh', 'classic'], alcohol: true },
  { id: 'bb-ipa', tags: ['beer', 'bitter', 'classic'], alcohol: true },
  { id: 'bd-zywiec', tags: ['beer', 'classic', 'light'], alcohol: true },
  { id: 'bb-zywiec-00', tags: ['beer', 'nonalc', 'light'], alcohol: false },
  { id: 'cola-original', tags: ['nonalc', 'sweet', 'classic', 'light'], alcohol: false },
  { id: 'sh-classic', tags: ['shisha', 'light'], alcohol: false },
  { id: 'sh-dark', tags: ['shisha', 'strong'], alcohol: false },
  { id: 'sh-dark-classic', tags: ['shisha', 'premium'], alcohol: false },
]

export const guideQuestions: GuideQuestion[] = [
  {
    id: 'mood-now',
    prompt: L(
      'Jak się dziś czujesz?',
      'How do you feel today?',
      'Как ты себя сегодня чувствуешь?',
      '¿Cómo te sientes hoy?',
      'Як ти себе сьогодні почуваєш?',
    ),
    answers: [
      {
        id: 'tired',
        label: L('Zmęczony/a — potrzebuję soft startu', 'Tired — need a soft start', 'Устал(а) — нужен мягкий старт', 'Cansado/a — necesito arranque suave', 'Втомлений/а — потрібен м’який старт'),
        scores: { light: 3, creamy: 2, elegant: 1 },
        modes: { 'soft-glow': 2, 'dark-velvet': 1 },
      },
      {
        id: 'chill',
        label: L('Spokojny/a i zrelaksowany/a', 'Chill and relaxed', 'Спокойно и расслабленно', 'Tranquilo/a y relajado/a', 'Спокійно й розслаблено'),
        scores: { light: 2, bitter: 1, fresh: 2, classic: 1 },
        modes: { 'soft-glow': 3 },
      },
      {
        id: 'hyped',
        label: L('Na hype — chcę parkiet', 'Hyped — I want the dancefloor', 'На хайпе — хочу танцпол', 'Con hype — quiero la pista', 'На хайпі — хочу танцпол'),
        scores: { party: 3, energy: 3, strong: 1 },
        modes: { 'neon-rush': 3 },
      },
      {
        id: 'stressed',
        label: L('Stres — wycisz mnie', 'Stressed — calm me down', 'Стресс — успокой меня', 'Estrés — cálmame', 'Стрес — заспокой мене'),
        scores: { creamy: 2, mint: 2, light: 2, shisha: 1 },
        modes: { 'soft-glow': 2, 'smoke-sip': 2 },
      },
    ],
  },
  {
    id: 'mood-end',
    prompt: L(
      'Jak chcesz się czuć pod koniec nocy?',
      'How do you want to feel by the end of the night?',
      'Как хочешь себя чувствовать к концу ночи?',
      '¿Cómo quieres sentirte al final de la noche?',
      'Як хочеш почуватися наприкінці ночі?',
    ),
    answers: [
      {
        id: 'energized',
        label: L('Naładowany/a energią', 'Fully charged', 'Полный энергии', 'A tope de energía', 'Заряджений/а енергією'),
        scores: { energy: 3, party: 2, strong: 1 },
        modes: { 'neon-rush': 3, 'zero-fuel': 1 },
      },
      {
        id: 'floaty',
        label: L('Lekko i wakacyjnie', 'Light and floaty', 'Легко и по-отпускному', 'Ligero y flotando', 'Легко й відпускно'),
        scores: { tropical: 3, sweet: 2, fresh: 2 },
        modes: { 'tropical-float': 3 },
      },
      {
        id: 'wild',
        label: L('Dziko i głośno', 'Wild and loud', 'Дико и громко', 'Salvaje y ruidoso', 'Дико й гучно'),
        scores: { strong: 3, party: 3, shot: 2 },
        modes: { 'neon-rush': 3 },
      },
      {
        id: 'cozy',
        label: L('Przytulnie, głęboko', 'Cozy and deep', 'Уютно и глубоко', 'Acogedor y profundo', 'Затишно й глибоко'),
        scores: { creamy: 3, coffee: 2, premium: 1 },
        modes: { 'dark-velvet': 3, 'smoke-sip': 1 },
      },
    ],
  },
  {
    id: 'alcohol',
    prompt: L(
      'Alkohol — tak, lekko, czy zero?',
      'Alcohol — yes, light, or zero?',
      'Алкоголь — да, легко или zero?',
      'Alcohol — ¿sí, suave o zero?',
      'Алкоголь — так, легко чи zero?',
    ),
    answers: [
      {
        id: 'yes',
        label: L('Tak, pełny drink', 'Yes, a proper drink', 'Да, нормальный напиток', 'Sí, un trago de verdad', 'Так, нормальний напій'),
        scores: { classic: 1 },
        allowAlc: true,
      },
      {
        id: 'light-alc',
        label: L('Raczej lekko', 'Keep it light', 'Скорее легко', 'Más bien suave', 'Скоріше легко'),
        scores: { light: 3, bitter: 1 },
        allowAlc: true,
        modes: { 'soft-glow': 2 },
      },
      {
        id: 'zero',
        label: L('Bez alkoholu', 'No alcohol', 'Без алкоголя', 'Sin alcohol', 'Без алкоголю'),
        scores: { nonalc: 5, energy: 1, fresh: 1 },
        forceNonAlc: true,
        modes: { 'zero-fuel': 4 },
      },
      {
        id: 'surprise',
        label: L('Zaskocz mnie', 'Surprise me', 'Удиви меня', 'Sorpréndeme', 'Здивуй мене'),
        scores: { party: 1, premium: 1, tropical: 1 },
        allowAlc: true,
      },
    ],
  },
  {
    id: 'taste',
    prompt: L(
      'Jaki smak lubisz najbardziej?',
      'Which taste do you like most?',
      'Какой вкус любишь больше всего?',
      '¿Qué sabor te gusta más?',
      'Який смак любиш найбільше?',
    ),
    answers: [
      {
        id: 'sweet',
        label: L('Słodki', 'Sweet', 'Сладкий', 'Dulce', 'Солодкий'),
        scores: { sweet: 4, tropical: 1 },
        modes: { 'tropical-float': 2 },
      },
      {
        id: 'sour',
        label: L('Kwaśny / cytrusowy', 'Sour / citrus', 'Кислый / цитрус', 'Ácido / cítrico', 'Кислий / цитрус'),
        scores: { sour: 4, citrus: 3 },
        modes: { 'sour-edge': 3 },
      },
      {
        id: 'bitter',
        label: L('Gorzki / wytrawny', 'Bitter / dry', 'Горький / сухой', 'Amargo / seco', 'Гіркий / сухий'),
        scores: { bitter: 4, elegant: 2 },
        modes: { 'soft-glow': 2 },
      },
      {
        id: 'creamy',
        label: L('Kremowy / kawowy', 'Creamy / coffee', 'Кремовый / кофейный', 'Cremoso / café', 'Кремовий / кавовий'),
        scores: { creamy: 4, coffee: 3 },
        modes: { 'dark-velvet': 3 },
      },
    ],
  },
  {
    id: 'world',
    prompt: L(
      'Jaki klimat smaku?',
      'What flavour world?',
      'Какой мир вкуса?',
      '¿Qué mundo de sabor?',
      'Який світ смаку?',
    ),
    answers: [
      {
        id: 'fresh-mint',
        label: L('Świeży / miętowy', 'Fresh / minty', 'Свежий / мятный', 'Fresco / menta', 'Свіжий / м’ятний'),
        scores: { fresh: 3, mint: 3, citrus: 1 },
      },
      {
        id: 'tropical',
        label: L('Tropikalny / owocowy', 'Tropical / fruity', 'Тропический / фруктовый', 'Tropical / afrutado', 'Тропічний / фруктовий'),
        scores: { tropical: 4, sweet: 2 },
        modes: { 'tropical-float': 3 },
      },
      {
        id: 'herbal',
        label: L('Ziołowy / dunkler kick', 'Herbal / dark kick', 'Травяной / тёмный kick', 'Herbal / kick oscuro', 'Трав’яний / темний kick'),
        scores: { herbal: 4, strong: 1 },
        modes: { 'neon-rush': 2 },
      },
      {
        id: 'classic-spirit',
        label: L('Klasyczny spiritowy', 'Classic spirit-forward', 'Классический spirit', 'Clásico spirit', 'Класичний spirit'),
        scores: { classic: 3, elegant: 2, premium: 1 },
        modes: { 'sour-edge': 1, 'soft-glow': 1 },
      },
    ],
  },
  {
    id: 'strength',
    prompt: L(
      'Jak mocno ma uderzyć?',
      'How hard should it hit?',
      'Насколько сильно должно ударить?',
      '¿Qué tan fuerte quieres el golpe?',
      'Наскільки сильно має вдарити?',
    ),
    answers: [
      {
        id: 'easy',
        label: L('Łagodnie — long drink', 'Easy — long drink', 'Мягко — long drink', 'Suave — long drink', 'М’яко — long drink'),
        scores: { light: 4 },
      },
      {
        id: 'medium',
        label: L('Średnio — czuję, ale kontroluję', 'Medium — I feel it, still in control', 'Средне — чувствую, но контролирую', 'Medio — lo siento, bajo control', 'Середньо — відчуваю, але контролюю'),
        scores: { classic: 2, premium: 1 },
      },
      {
        id: 'strong',
        label: L('Mocno', 'Strong', 'Крепко', 'Fuerte', 'Міцно'),
        scores: { strong: 4, premium: 1 },
        modes: { 'neon-rush': 2, 'dark-velvet': 1 },
      },
      {
        id: 'shots',
        label: L('Shoty / party mode', 'Shots / party mode', 'Шоты / party mode', 'Chupitos / party mode', 'Шоти / party mode'),
        scores: { shot: 5, party: 3, strong: 2 },
        modes: { 'neon-rush': 3 },
      },
    ],
  },
  {
    id: 'format',
    prompt: L(
      'Co wolisz dziś w ręku?',
      'What do you want in your hand tonight?',
      'Что хочешь держать в руке сегодня?',
      '¿Qué quieres tener en la mano esta noche?',
      'Що хочеш тримати в руці сьогодні?',
    ),
    answers: [
      {
        id: 'cocktail',
        label: L('Koktajl', 'Cocktail', 'Коктейль', 'Cóctel', 'Коктейль'),
        scores: { classic: 2, premium: 1, tropical: 1 },
      },
      {
        id: 'beer',
        label: L('Piwo', 'Beer', 'Пиво', 'Cerveza', 'Пиво'),
        scores: { beer: 5, light: 1 },
      },
      {
        id: 'soft',
        label: L('Soft / energy', 'Soft / energy', 'Софт / energy', 'Soft / energy', 'Софт / energy'),
        scores: { nonalc: 3, energy: 2, fresh: 1 },
        modes: { 'zero-fuel': 2 },
      },
      {
        id: 'mix',
        label: L('Mix — drink + coś jeszcze', 'Mix — drink + something else', 'Микс — напиток + ещё что-то', 'Mix — trago + algo más', 'Мікс — напій + ще щось'),
        scores: { party: 1, shisha: 2, light: 1 },
        modes: { 'smoke-sip': 2 },
      },
    ],
  },
  {
    id: 'setting',
    prompt: L(
      'Gdzie będziesz spędzać wieczór?',
      'Where will you spend the evening?',
      'Где будешь проводить вечер?',
      '¿Dónde pasarás la noche?',
      'Де проводитимеш вечір?',
    ),
    answers: [
      {
        id: 'dancefloor',
        label: L('Na parkiecie', 'On the dancefloor', 'На танцполе', 'En la pista', 'На танцполі'),
        scores: { party: 3, energy: 2, shot: 1 },
        modes: { 'neon-rush': 3 },
      },
      {
        id: 'terrace',
        label: L('Na tarasie / rozmowy', 'Terrace / talks', 'На террасе / разговоры', 'Terraza / charla', 'На терасі / розмови'),
        scores: { light: 2, elegant: 2, bitter: 1, fresh: 1 },
        modes: { 'soft-glow': 2, 'tropical-float': 1 },
      },
      {
        id: 'booth',
        label: L('W ciemniejszym boothu', 'In a darker booth', 'В более тёмном booth', 'En un booth más oscuro', 'У темнішому booth'),
        scores: { creamy: 2, premium: 2, strong: 1 },
        modes: { 'dark-velvet': 3 },
      },
      {
        id: 'shisha-zone',
        label: L('Strefa shisha', 'Shisha zone', 'Зона кальяна', 'Zona shisha', 'Зона кальяну'),
        scores: { shisha: 5, light: 1 },
        modes: { 'smoke-sip': 4 },
      },
    ],
  },
  {
    id: 'company',
    prompt: L(
      'Z kim jesteś?',
      'Who are you with?',
      'С кем ты?',
      '¿Con quién estás?',
      'З ким ти?',
    ),
    answers: [
      {
        id: 'solo',
        label: L('Solo / we dwoje', 'Solo / with one person', 'Один / вдвоём', 'Solo / en pareja', 'Наодинці / удвох'),
        scores: { elegant: 2, creamy: 1, classic: 1 },
        modes: { 'soft-glow': 1, 'dark-velvet': 1 },
      },
      {
        id: 'friends',
        label: L('Mała ekipa', 'Small crew', 'Небольшая компания', 'Grupo pequeño', 'Невелика компанія'),
        scores: { classic: 1, tropical: 1, beer: 1 },
      },
      {
        id: 'party-table',
        label: L('Duży stół / celebracja', 'Big table / celebration', 'Большой стол / праздник', 'Mesa grande / celebración', 'Великий стіл / святкування'),
        scores: { party: 3, shot: 2, strong: 1, tropical: 1 },
        modes: { 'neon-rush': 2, 'tropical-float': 1 },
      },
      {
        id: 'date',
        label: L('Randka / vibe we dwoje', 'Date night vibe', 'Свидание', 'Cita / vibe de dos', 'Побачення'),
        scores: { elegant: 3, premium: 2, creamy: 1 },
        modes: { 'dark-velvet': 2, 'soft-glow': 1 },
      },
    ],
  },
  {
    id: 'shisha',
    prompt: L(
      'Shisha też w grze?',
      'Is shisha also on the table?',
      'Кальян тоже в деле?',
      '¿La shisha también entra?',
      'Кальян теж у грі?',
    ),
    answers: [
      {
        id: 'shisha-yes',
        label: L('Tak — must have', 'Yes — must have', 'Да — must have', 'Sí — must have', 'Так — must have'),
        scores: { shisha: 6 },
        modes: { 'smoke-sip': 4 },
      },
      {
        id: 'shisha-maybe',
        label: L('Może później', 'Maybe later', 'Может позже', 'Quizá luego', 'Можливо пізніше'),
        scores: { shisha: 2 },
        modes: { 'smoke-sip': 1 },
      },
      {
        id: 'shisha-no',
        label: L('Dziś tylko drinki', 'Drinks only tonight', 'Сегодня только напитки', 'Solo tragos esta noche', 'Сьогодні лише напої'),
        scores: { classic: 1 },
      },
      {
        id: 'shisha-after',
        label: L('Najpierw drink, potem dym', 'Drink first, smoke after', 'Сначала напиток, потом дым', 'Antes el trago, luego el humo', 'Спочатку напій, потім дим'),
        scores: { shisha: 3, light: 1, tropical: 1 },
        modes: { 'smoke-sip': 2 },
      },
    ],
  },
]

export type GuideResult = {
  mode: GuideMode
  scores: Partial<Record<DrinkTag, number>>
  modeScores: Partial<Record<ModeId, number>>
  recommendations: Array<{ id: string; score: number; alcohol: boolean }>
  nonAlcOnly: boolean
}

export function scoreGuide(answerIds: string[]): GuideResult {
  const tagScores: Partial<Record<DrinkTag, number>> = {}
  const modeScores: Partial<Record<ModeId, number>> = {}
  let nonAlcOnly = false

  for (const q of guideQuestions) {
    const answer = q.answers.find((a) => answerIds.includes(a.id))
    if (!answer) continue
    if (answer.forceNonAlc) nonAlcOnly = true
    for (const [tag, value] of Object.entries(answer.scores) as [DrinkTag, number][]) {
      tagScores[tag] = (tagScores[tag] ?? 0) + value
    }
    if (answer.modes) {
      for (const [mode, value] of Object.entries(answer.modes) as [ModeId, number][]) {
        modeScores[mode] = (modeScores[mode] ?? 0) + value
      }
    }
  }

  if (nonAlcOnly) {
    modeScores['zero-fuel'] = (modeScores['zero-fuel'] ?? 0) + 3
  }

  const mode =
    guideModes
      .map((m) => ({
        mode: m,
        score:
          (modeScores[m.id] ?? 0) +
          m.tags.reduce((sum, tag) => sum + (tagScores[tag] ?? 0) * 0.35, 0),
      }))
      .sort((a, b) => b.score - a.score)[0]?.mode ?? guideModes[0]

  const ranked = drinkProfiles
    .filter((d) => (nonAlcOnly ? !d.alcohol : true))
    .map((d) => {
      let score = d.tags.reduce((sum, tag) => sum + (tagScores[tag] ?? 0), 0)
      // Boost drinks that match winning mode tags
      score += d.tags.filter((t) => mode.tags.includes(t)).length * 1.5
      // Soft preference: if beer score high, boost beer; if shisha high keep one shisha
      return { id: d.id, score, alcohol: d.alcohol, tags: d.tags }
    })
    .sort((a, b) => b.score - a.score)

  const picks: Array<{ id: string; score: number; alcohol: boolean }> = []
  const used = new Set<string>()

  const pushUnique = (item: (typeof ranked)[number] | undefined) => {
    if (!item || used.has(item.id) || item.score <= 0) return
    used.add(item.id)
    picks.push({ id: item.id, score: item.score, alcohol: item.alcohol })
  }

  // Always try one drink matching mode, then fill
  for (const item of ranked) {
    if (picks.length >= 3) break
    // Prefer non-shisha for main slots first
    if (item.tags.includes('shisha')) continue
    pushUnique(item)
  }

  // If shisha interest is high, append one shisha
  if ((tagScores.shisha ?? 0) >= 3) {
    const shisha = ranked.find((d) => d.tags.includes('shisha'))
    pushUnique(shisha)
  }

  // Fill remaining up to 4
  for (const item of ranked) {
    if (picks.length >= 4) break
    pushUnique(item)
  }

  // Fallback
  if (!picks.length) {
    const fallback = nonAlcOnly
      ? ranked.filter((d) => !d.alcohol).slice(0, 3)
      : ranked.slice(0, 3)
    for (const item of fallback) pushUnique(item)
  }

  return {
    mode,
    scores: tagScores,
    modeScores,
    recommendations: picks,
    nonAlcOnly,
  }
}

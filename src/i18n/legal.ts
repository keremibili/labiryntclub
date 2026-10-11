import type { Lang, Localized } from '../types/content'

const t = (pl: string, en: string, ru: string, es: string, uk: string): Localized => ({
  pl,
  en,
  ru,
  es,
  uk,
})

export const legalNav = {
  rules: t('Regulamin klubu', 'Club rules', 'Правила клуба', 'Normas del club', 'Правила клубу'),
  privacy: t('Polityka prywatności', 'Privacy policy', 'Политика конфиденциальности', 'Política de privacidad', 'Політика конфіденційності'),
  terms: t('Regulamin i warunki', 'Terms & conditions', 'Условия использования', 'Términos y condiciones', 'Умови використання'),
  disclaimer: t('Zastrzeżenie', 'Disclaimer', 'Отказ от ответственности', 'Aviso legal', 'Застереження'),
  back: t('Wróć do menu', 'Back to menu', 'Назад к меню', 'Volver al menú', 'Назад до меню'),
}

export const legalPages: Record<
  'rules' | 'privacy' | 'terms',
  { title: Localized; intro: Localized; sections: { heading: Localized; body: Localized }[] }
> = {
  rules: {
    title: legalNav.rules,
    intro: t(
      'Wstęp na teren Labirynt Club oznacza akceptację poniższych zasad bezpieczeństwa i porządku. Zasady obowiązują wszystkich gości, na barze, na tarasie oraz w strefie shishy.',
      'Entry to Labirynt Club means you accept the safety and house rules below. They apply to every guest at the bar, terrace and shisha area.',
      'Вход на территорию Labirynt Club означает согласие с правилами безопасности и порядка. Правила действуют для всех гостей: бар, терраса и зона кальяна.',
      'La entrada a Labirynt Club implica la aceptación de las normas de seguridad y convivencia. Aplican a todos los clientes en barra, terraza y zona de shisha.',
      'Вхід на територію Labirynt Club означає прийняття правил безпеки та порядку. Правила діють для всіх гостей: бар, тераса та зона кальяну.',
    ),
    sections: [
      {
        heading: t('Zero tolerancji dla narkotyków', 'Zero tolerance for drugs', 'Нулевая терпимость к наркотикам', 'Tolerancia cero con las drogas', 'Нульова толерантність до наркотиків'),
        body: t(
          'Sprzedaż, posiadanie, oferowanie lub używanie nielegalnych substancji na terenie klubu jest surowo zabronione. Osoba naruszająca tę zasadę zostanie natychmiast usunięta z lokalu. W razie potrzeby sprawa zostanie zgłoszona organom ścigania.',
          'Selling, possessing, offering or using illegal substances on club premises is strictly prohibited. Anyone who breaks this rule will be removed immediately. Where necessary, the matter will be reported to law enforcement.',
          'Продажа, хранение, предложение или употребление незаконных веществ на территории клуба строго запрещены. Нарушитель будет немедленно удален. При необходимости случай будет передан в правоохранительные органы.',
          'Está estrictamente prohibido vender, poseer, ofrecer o consumir sustancias ilegales en el club. Quien lo incumpla será expulsado de inmediato. Si es necesario, se avisará a las autoridades.',
          'Продаж, зберігання, пропонування або вживання незаконних речовин на території клубу суворо заборонені. Порушника буде негайно видалено. За потреби справу буде передано до правоохоронних органів.',
        ),
      },
      {
        heading: t('Zakłócanie porządku', 'Disturbing the peace', 'Нарушение порядка', 'Alteración del orden', 'Порушення порядку'),
        body: t(
          'Agresja, prowokacje, molestowanie, wulgarne zachowanie lub stwarzanie zagrożenia dla innych gości bądź personelu skutkuje usunięciem z klubu. Bilet / wstęp może zostać anulowany bez zwrotu kosztów.',
          'Aggression, provocation, harassment, abusive behaviour or creating a risk to other guests or staff will result in removal from the club. Tickets / entry may be cancelled without refund.',
          'Агрессия, провокации, домогательства, оскорбительное поведение или создание угрозы для гостей либо персонала влекут удаление из клуба. Билет / вход может быть аннулирован без возврата средств.',
          'La agresión, provocación, acoso, conducta abusiva o poner en riesgo a clientes o personal implica la expulsión. La entrada / ticket puede anularse sin reembolso.',
          'Агресія, провокації, домагання, образлива поведінка або створення загрози для гостей чи персоналу ведуть до видалення з клубу. Квиток / вхід може бути скасовано без повернення коштів.',
        ),
      },
      {
        heading: t('Szkody materialne', 'Property damage', 'Материальный ущерб', 'Daños materiales', 'Матеріальна шкода'),
        body: t(
          'Osoba, która zniszczy lub uszkodzi mienie klubu (szkło, meble, sprzęt, wyposażenie tarasu itp.), ponosi pełną odpowiedzialność finansową za naprawę lub wymianę.',
          'Anyone who breaks or damages club property (glassware, furniture, equipment, terrace fittings, etc.) is fully financially responsible for repair or replacement.',
          'Лицо, повредившее имущество клуба (посуду, мебель, оборудование, оснащение террасы и т.п.), несет полную финансовую ответственность за ремонт или замену.',
          'Quien rompa o dañe bienes del club (cristalería, mobiliario, equipo, terraza, etc.) responde económicamente de la reparación o sustitución.',
          'Особа, яка пошкодить майно клубу (скло, меблі, обладнання, терасу тощо), несе повну фінансову відповідальність за ремонт або заміну.',
        ),
      },
      {
        heading: t('Rzeczy osobiste', 'Personal belongings', 'Личные вещи', 'Objetos personales', 'Особисті речі'),
        body: t(
          'Każdy gość odpowiada za własne rzeczy. Labirynt Club nie ponosi odpowiedzialności za zagubione, skradzione lub pozostawione bez nadzoru przedmioty, o ile szkoda nie wynika z umyślnego działania personelu.',
          'Every guest is responsible for their own belongings. Labirynt Club is not liable for lost, stolen or unattended items, except where loss results from intentional staff misconduct.',
          'Каждый гость отвечает за свои вещи. Labirynt Club не несет ответственности за утерянные, украденные или оставленные без присмотра предметы, кроме случаев умышленной вины персонала.',
          'Cada cliente es responsable de sus pertenencias. Labirynt Club no responde de objetos perdidos, robados o desatendidos, salvo dolo del personal.',
          'Кожен гість відповідає за свої речі. Labirynt Club не відповідає за загублені, вкрадені чи залишені без нагляду речі, крім умисної вини персоналу.',
        ),
      },
      {
        heading: t('Alkohol i odpowiedzialność', 'Alcohol responsibility', 'Алкоголь и ответственность', 'Alcohol y responsabilidad', 'Алкоголь і відповідальність'),
        body: t(
          'Gość ponosi odpowiedzialność za ilość i skutki spożytego alkoholu. Personel może odmówić dalszej sprzedaży alkoholu osobie nietrzeźwej. Nie serwujemy alkoholu osobom niepełnoletnim — dokument tożsamości może być wymagany.',
          'Guests are responsible for how much they drink and the consequences. Staff may refuse further alcohol service to intoxicated persons. We do not serve alcohol to minors — ID may be requested.',
          'Гость отвечает за количество выпитого алкоголя и последствия. Персонал может отказать в продаже алкоголя нетрезвому гостю. Несовершеннолетним алкоголь не продается — документ может быть запрошен.',
          'El cliente es responsable de lo que bebe y de sus consecuencias. El personal puede negar más alcohol a quien esté intoxicado. No servimos alcohol a menores; se puede pedir identificación.',
          'Гість відповідає за кількість випитого алкоголю та наслідки. Персонал може відмовити в подальшому продажу алкоголю нетверезій особі. Неповнолітнім алкоголь не продається — можуть перевірити документ.',
        ),
      },
      {
        heading: t('Bezpieczeństwo', 'Safety', 'Безопасность', 'Seguridad', 'Безпека'),
        body: t(
          'Stosuj się do poleceń ochrony i personelu. Ewakuuj lokal niezwłocznie w razie alarmu. Zabrania się wnoszenia broni, materiałów pirotechnicznych i niebezpiecznych przedmiotów. Shisha oraz urządzenia elektroniczne używaj wyłącznie zgodnie z instrukcją personelu.',
          'Follow security and staff instructions. Evacuate immediately if an alarm sounds. Weapons, pyrotechnics and dangerous items are forbidden. Use shisha and electronic devices only as instructed by staff.',
          'Следуйте указаниям охраны и персонала. Немедленно эвакуируйтесь при тревоге. Оружие, пиротехника и опасные предметы запрещены. Кальян и устройства используйте только по инструкции персонала.',
          'Siga las indicaciones de seguridad y del personal. Evacúe de inmediato ante una alarma. Quedan prohibidas armas, pirotecnia y objetos peligrosos. Use la shisha y dispositivos solo según indiquen los empleados.',
          'Дотримуйтесь вказівок охорони та персоналу. Негайно евакуюйтеся під час тривоги. Зброя, піротехніка та небезпечні предмети заборонені. Кальян і пристрої використовуйте лише за інструкцією персоналу.',
        ),
      },
      {
        heading: t('Menu i ceny', 'Menu & prices', 'Меню и цены', 'Carta y precios', 'Меню та ціни'),
        body: t(
          'Ceny w menu podane są w PLN i mogą ulec zmianie. Zdjęcia mają charakter poglądowy. Alergeny i skład — zapytaj obsługę przed zamówieniem. Reklamacje dotyczące zamówienia zgłaszaj niezwłocznie personelowi.',
          'Menu prices are in PLN and may change. Photos are illustrative. Ask staff about allergens and ingredients before ordering. Report order issues to staff immediately.',
          'Цены в меню указаны в PLN и могут изменяться. Фото носят ознакомительный характер. Об аллергенах и составе спрашивайте персонал до заказа. Претензии по заказу сообщайте сразу.',
          'Los precios de la carta están en PLN y pueden cambiar. Las fotos son orientativas. Consulte alérgenos e ingredientes al personal antes de pedir. Reclame problemas del pedido de inmediato.',
          'Ціни в меню вказані в PLN і можуть змінюватися. Фото мають ознайомчий характер. Про алергени та склад запитуйте персонал перед замовленням. Скарги щодо замовлення повідомляйте одразу.',
        ),
      },
      {
        heading: t('Wizerunek i monitoring', 'Image & CCTV', 'Изображение и видеонаблюдение', 'Imagen y videovigilancia', 'Зображення та відеоспостереження'),
        body: t(
          'Na terenie klubu może być prowadzony monitoring wizyjny w celach bezpieczeństwa. Udział w imprezach publicznych może wiązać się z rejestracją wizerunku (zdjęcia/wideo) na potrzeby dokumentacji lub promocji — szczegóły w Polityce prywatności.',
          'CCTV may operate on the premises for security. Attending public events may involve image capture (photo/video) for documentation or promotion — see the Privacy Policy for details.',
          'На территории может вестись видеонаблюдение в целях безопасности. Участие в публичных мероприятиях может включать фиксацию изображения (фото/видео) для документации или продвижения — подробности в Политике конфиденциальности.',
          'Puede haber videovigilancia por seguridad. Asistir a eventos públicos puede implicar captación de imagen (foto/vídeo) con fines documentales o promocionales; detalles en la Política de privacidad.',
          'На території може вестися відеоспостереження з метою безпеки. Участь у публічних заходах може передбачати фіксацію зображення (фото/відео) для документації чи промо — деталі в Політиці конфіденційності.',
        ),
      },
    ],
  },
  privacy: {
    title: legalNav.privacy,
    intro: t(
      'Niniejsza Polityka prywatności wyjaśnia, jak Labirynt Club („my”) przetwarza dane w związku ze stroną labiryntclub.pl oraz działalnością klubu w Warszawie.',
      'This Privacy Policy explains how Labirynt Club (“we”) process data in connection with labiryntclub.pl and club operations in Warsaw.',
      'Настоящая Политика конфиденциальности объясняет, как Labirynt Club («мы») обрабатывает данные в связи с сайтом labiryntclub.pl и деятельностью клуба в Варшаве.',
      'Esta Política de privacidad explica cómo Labirynt Club («nosotros») trata datos en relación con labiryntclub.pl y la actividad del club en Varsovia.',
      'Ця Політика конфіденційності пояснює, як Labirynt Club («ми») обробляє дані у зв’язку з labiryntclub.pl та діяльністю клубу у Варшаві.',
    ),
    sections: [
      {
        heading: t('Administrator danych', 'Data controller', 'Оператор данных', 'Responsable del tratamiento', 'Володілець даних'),
        body: t(
          'Administratorem danych jest operator Labirynt Club w Warszawie. W sprawach prywatności skontaktuj się przez oficjalny profil Instagram @labirynt_club lub dane kontaktowe podane na Google Maps lokalu.',
          'The data controller is the operator of Labirynt Club in Warsaw. For privacy matters contact the official Instagram @labirynt_club or the venue details listed on Google Maps.',
          'Оператор данных — администрация Labirynt Club в Варшаве. По вопросам конфиденциальности пишите в официальный Instagram @labirynt_club или используйте контакты заведения в Google Maps.',
          'El responsable es el operador de Labirynt Club en Varsovia. Para privacidad contacte Instagram oficial @labirynt_club o los datos del local en Google Maps.',
          'Володілець даних — оператор Labirynt Club у Варшаві. З питань конфіденційності звертайтесь до офіційного Instagram @labirynt_club або контактів закладу в Google Maps.',
        ),
      },
      {
        heading: t('Jakie dane zbieramy', 'What we collect', 'Какие данные собираем', 'Qué datos recogemos', 'Які дані збираємо'),
        body: t(
          'Strona menu może przetwarzać dane techniczne (adres IP, typ przeglądarki, język, logi serwera) oraz preferencję języka zapisaną lokalnie w urządzeniu. Jeśli kontaktujesz się z nami w mediach społecznościowych, przetwarzamy dane, które nam przekażesz.',
          'The menu website may process technical data (IP address, browser type, language, server logs) and a language preference stored locally on your device. If you contact us on social media, we process the information you provide.',
          'Сайт меню может обрабатывать технические данные (IP, тип браузера, язык, логи сервера) и языковые настройки, сохраненные локально на устройстве. При обращении в соцсетях обрабатываем данные, которые вы передаете.',
          'El sitio de la carta puede tratar datos técnicos (IP, navegador, idioma, logs) y la preferencia de idioma guardada localmente. Si nos contacta en redes, tratamos la información que nos facilite.',
          'Сайт меню може обробляти технічні дані (IP, браузер, мова, логи сервера) та мовну перевагу, збережену локально на пристрої. Якщо пишете нам у соцмережах, обробляємо надану вами інформацію.',
        ),
      },
      {
        heading: t('Cele i podstawa', 'Purposes & legal basis', 'Цели и основания', 'Fines y base legal', 'Цілі та підстави'),
        body: t(
          'Dane wykorzystujemy do działania strony, bezpieczeństwa IT, analityki w niezbędnym zakresie, odpowiedzi na zapytania oraz — w lokalu — bezpieczeństwa gości (np. monitoring). Podstawą może być prawnie uzasadniony interes, wykonanie umowy/usługi lub obowiązek prawny.',
          'We use data to run the website, for IT security, limited analytics, responding to enquiries and — on site — guest safety (e.g. CCTV). Legal bases may include legitimate interest, performance of a service/contract, or legal obligation.',
          'Данные используются для работы сайта, ИТ-безопасности, ограниченной аналитики, ответов на запросы и — в клубе — безопасности гостей (например, видеонаблюдение). Основания: законный интерес, исполнение услуги/договора или юридическая обязанность.',
          'Usamos los datos para operar el sitio, seguridad informática, analítica limitada, responder consultas y — en el local — seguridad (p. ej. videovigilancia). Bases: interés legítimo, prestación del servicio/contrato u obligación legal.',
          'Дані використовуємо для роботи сайту, ІТ-безпеки, обмеженої аналітики, відповідей на запити та — у закладі — безпеки гостей (напр. відеоспостереження). Підстави: законний інтерес, надання послуги/договір або правовий обов’язок.',
        ),
      },
      {
        heading: t('Okres przechowywania', 'Retention', 'Срок хранения', 'Conservación', 'Строк зберігання'),
        body: t(
          'Dane techniczne i logi przechowujemy nie dłużej niż to potrzebne do celów bezpieczeństwa i utrzymania serwisu, a następnie usuwamy lub anonimizujemy, o ile dłuższy okres nie wynika z prawa.',
          'Technical data and logs are kept no longer than needed for security and service maintenance, then deleted or anonymised unless a longer period is required by law.',
          'Технические данные и логи хранятся не дольше, чем нужно для безопасности и поддержки сервиса, затем удаляются или обезличиваются, если более долгий срок не требуется законом.',
          'Los datos técnicos y logs se conservan solo el tiempo necesario para seguridad y mantenimiento; después se eliminan o anonimizan, salvo obligación legal.',
          'Технічні дані та логи зберігаємо не довше, ніж потрібно для безпеки й підтримки сервісу, потім видаляємо або анонімізуємо, якщо довший строк не вимагає закон.',
        ),
      },
      {
        heading: t('Twoje prawa', 'Your rights', 'Ваши права', 'Sus derechos', 'Ваші права'),
        body: t(
          'Zgodnie z RODO możesz m.in. żądać dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, wniesienia sprzeciwu oraz skargi do Prezesa UODO. Aby skorzystać z praw, skontaktuj się z nami kanałami wskazanymi powyżej.',
          'Under GDPR you may request access, rectification, erasure, restriction, object to processing, and lodge a complaint with a supervisory authority. To exercise rights, contact us via the channels above.',
          'Согласно GDPR вы можете запросить доступ, исправление, удаление, ограничение обработки, возразить против обработки и подать жалобу в надзорный орган. Для реализации прав свяжитесь с нами указанными каналами.',
          'Conforme al RGPD puede solicitar acceso, rectificación, supresión, limitación, oponerse al tratamiento y reclamar ante la autoridad de control. Para ejercer derechos, contáctenos por los canales indicados.',
          'Згідно з GDPR ви можете вимагати доступ, виправлення, видалення, обмеження обробки, заперечити проти обробки та подати скаргу до наглядового органу. Для реалізації прав звертайтесь зазначеними каналами.',
        ),
      },
    ],
  },
  terms: {
    title: legalNav.terms,
    intro: t(
      'Niniejsze Warunki określają zasady korzystania ze strony labiryntclub.pl oraz ogólne warunki uczestnictwa w ofercie Labirynt Club (menu, imprezy, wstęp).',
      'These Terms govern use of labiryntclub.pl and general conditions for Labirynt Club services (menu, events, entry).',
      'Настоящие Условия регулируют использование labiryntclub.pl и общие условия услуг Labirynt Club (меню, мероприятия, вход).',
      'Estos Términos regulan el uso de labiryntclub.pl y las condiciones generales de Labirynt Club (carta, eventos, entrada).',
      'Ці Умови регулюють користування labiryntclub.pl та загальні умови послуг Labirynt Club (меню, події, вхід).',
    ),
    sections: [
      {
        heading: t('Korzystanie ze strony', 'Website use', 'Использование сайта', 'Uso del sitio', 'Користування сайтом'),
        body: t(
          'Strona służy do prezentacji menu i informacji o klubie. Zabrania się działań zakłócających działanie serwisu, nieuprawnionego dostępu oraz wykorzystywania treści w sposób naruszający prawo lub dobre obyczaje.',
          'The site presents the menu and club information. You must not disrupt the service, attempt unauthorised access, or use content unlawfully or improperly.',
          'Сайт предназначен для меню и информации о клубе. Запрещены действия, нарушающие работу сервиса, несанкционированный доступ и незаконное использование контента.',
          'El sitio presenta la carta e información del club. Queda prohibido alterar el servicio, acceder sin autorización o usar el contenido de forma ilegal o indebida.',
          'Сайт призначений для меню та інформації про клуб. Заборонено порушувати роботу сервісу, несанкціонований доступ і незаконне використання контенту.',
        ),
      },
      {
        heading: t('Oferta i rezerwacje', 'Offers & reservations', 'Предложения и брони', 'Ofertas y reservas', 'Пропозиції та бронювання'),
        body: t(
          'Informacje na stronie mają charakter informacyjny i nie stanowią oferty handlowej w rozumieniu prawa cywilnego, o ile nie wskazano inaczej. Warunki imprez, wstępu i rezerwacji mogą być ustalane osobno przez personel klubu.',
          'Website information is informational and not a binding commercial offer unless stated otherwise. Event, entry and reservation terms may be set separately by club staff.',
          'Информация на сайте носит справочный характер и не является офертой, если не указано иное. Условия мероприятий, входа и брони могут определяться персоналом отдельно.',
          'La información del sitio es orientativa y no constituye oferta vinculante salvo indicación contraria. Eventos, entrada y reservas pueden acordarse aparte con el personal.',
          'Інформація на сайті має ознайомчий характер і не є офертою, якщо не зазначено інше. Умови подій, входу та бронювання може окремо визначати персонал.',
        ),
      },
      {
        heading: t('Płatności i anulowanie', 'Payments & cancellation', 'Оплата и отмена', 'Pagos y cancelación', 'Оплата та скасування'),
        body: t(
          'Opłaty za napoje, shishę i usługi ponosisz zgodnie z aktualnym cennikiem. W przypadku naruszenia regulaminu klubu wstęp może zostać anulowany bez zwrotu. Zwroty — wyłącznie gdy wymagają tego przepisy lub wyraźna decyzja klubu.',
          'You pay for drinks, shisha and services per the current price list. If club rules are breached, entry may be cancelled without refund. Refunds only where required by law or expressly granted by the club.',
          'Оплата напитков, кальяна и услуг — по актуальному прайсу. При нарушении правил вход может быть аннулирован без возврата. Возврат — только если требует закон или прямо решает клуб.',
          'Paga bebidas, shisha y servicios según la tarifa vigente. Si incumple las normas, la entrada puede anularse sin reembolso. Reembolsos solo si la ley lo exige o el club lo concede.',
          'Оплата напоїв, кальяну та послуг — за актуальним прайсом. У разі порушення правил вхід може бути скасовано без повернення. Повернення — лише якщо вимагає закон або прямо вирішує клуб.',
        ),
      },
      {
        heading: t('Ograniczenie odpowiedzialności', 'Limitation of liability', 'Ограничение ответственности', 'Limitación de responsabilidad', 'Обмеження відповідальності'),
        body: t(
          'W najszerszym zakresie dozwolonym prawem nie odpowiadamy za szkody pośrednie wynikające z korzystania ze strony lub udziału w imprezach, z wyjątkiem szkód wynikających z umyślnego działania lub rażącego niedbalstwa oraz przypadków, gdy odpowiedzialności nie można wyłączyć.',
          'To the fullest extent permitted by law we are not liable for indirect damages arising from website use or event attendance, except for intentional misconduct or gross negligence, or where liability cannot be excluded.',
          'В максимальной степени, допускаемой законом, мы не отвечаем за косвенный ущерб от использования сайта или участия в мероприятиях, кроме умысла, грубой неосторожности и случаев, когда ответственность нельзя исключить.',
          'En la máxima medida permitida por la ley no respondemos de daños indirectos por el uso del sitio o asistencia a eventos, salvo dolo, negligencia grave o cuando la responsabilidad no pueda excluirse.',
          'У максимально дозволеному законом обсязі ми не відповідаємо за непрямі збитки від користування сайтом чи участі в подіях, крім умислу, грубої необережності та випадків, коли відповідальність не можна виключити.',
        ),
      },
      {
        heading: t('Prawo właściwe', 'Governing law', 'Применимое право', 'Ley aplicable', 'Застосовне право'),
        body: t(
          'Warunki podlegają prawu polskiemu. Spory rozstrzygane są przez właściwe sądy w Polsce, z uwzględnieniem bezwzględnie obowiązujących przepisów o ochronie konsumentów.',
          'These Terms are governed by Polish law. Disputes are resolved by competent courts in Poland, subject to mandatory consumer protection rules.',
          'Условия регулируются правом Польши. Споры рассматривают компетентные суды Польши с учетом императивных норм защиты потребителей.',
          'Estos Términos se rigen por la ley polaca. Los conflictos se dirimen ante tribunales competentes en Polonia, sin perjuicio de normas imperativas de consumidores.',
          'Умови регулюються правом Польщі. Спори розглядають компетентні суди Польщі з урахуванням імперативних норм захисту споживачів.',
        ),
      },
      {
        heading: t('Akceptacja regulaminu klubu', 'Acceptance of club rules', 'Принятие правил клуба', 'Aceptación de las normas', 'Прийняття правил клубу'),
        body: t(
          'Korzystając ze strony lub wchodząc do Labirynt Club, potwierdzasz zapoznanie się z Regulaminem klubu, Polityką prywatności oraz niniejszymi Warunkami.',
          'By using the website or entering Labirynt Club you confirm you have read the Club Rules, Privacy Policy and these Terms.',
          'Используя сайт или входя в Labirynt Club, вы подтверждаете ознакомление с Правилами клуба, Политикой конфиденциальности и настоящими Условиями.',
          'Al usar el sitio o entrar en Labirynt Club confirma haber leído las Normas del club, la Política de privacidad y estos Términos.',
          'Користуючись сайтом або заходячи до Labirynt Club, ви підтверджуєте ознайомлення з Правилами клубу, Політикою конфіденційності та цими Умовами.',
        ),
      },
    ],
  },
}

export const menuDisclaimer = t(
  'Wstęp = akceptacja regulaminu. Zakaz narkotyków. Za szkody i własne rzeczy odpowiadasz Ty. 18+ alkohol.',
  'Entry = acceptance of the rules. No drugs. You are liable for damage and your belongings. 18+ alcohol.',
  'Вход = согласие с правилами. Наркотики запрещены. Ущерб и вещи — ваша ответственность. 18+ алкоголь.',
  'Entrada = aceptación de las normas. Prohibidas las drogas. Usted responde de daños y pertenencias. Alcohol 18+.',
  'Вхід = прийняття правил. Наркотики заборонені. Шкода та речі — ваша відповідальність. 18+ алкоголь.',
)

export function trLegal(dict: Localized, lang: Lang) {
  return dict[lang]
}

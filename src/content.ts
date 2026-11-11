/**
 * Всё содержимое сайта собрано здесь — меняй тексты, ссылки и проекты,
 * не трогая вёрстку. Для каждой локали свой набор строк.
 */

export type Language = 'ru' | 'en'

export type DemoId = 'orbit' | 'store' | 'fitness'

/** Разбор проекта: задача, решение и результат. */
export type ProjectCase = {
  challenge: string
  solution: string[]
  result: string
  metrics: { value: string; label: string }[]
}

export type ExperienceItem = {
  period: string
  role: string
  company: string
  summary: string
  points: string[]
  stack: string[]
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
}

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  dateLabel: string
  readingTime: string
  tags: string[]
  blocks: BlogBlock[]
}

export type SiteContent = {
  meta: { title: string; description: string }
  nav: { id: string; label: string }[]
  profile: {
    name: string
    shortName: string
    initials: string
    role: string
    availability: string
    location: string
    email: string
    telegram: string
    about: string[]
    stats: { value: string; label: string }[]
  }
  facts: { icon: 'code' | 'spark' | 'gauge'; title: string; text: string }[]
  experience: ExperienceItem[]
  testimonials: Testimonial[]
  blog: {
    metaTitle: string
    metaDescription: string
    title: string
    lead: string
    backHome: string
    readMore: string
    backToBlog: string
    minRead: string
    posts: BlogPost[]
  }
  skills: { title: string; items: string[] }[]
  projects: {
    title: string
    description: string
    tags: string[]
    year: string
    tone: 'violet' | 'cyan' | 'amber' | 'pink' | 'lime'
    demoId: DemoId | null
    demoUrl: string | null
    codeUrl: string
    case: ProjectCase
  }[]
  socials: { label: string; href: string; icon: 'github' | 'telegram' | 'linkedin' }[]
  ui: {
    languageLabel: string
    themeToLight: string
    themeToDark: string
    menuOpen: string
    menuClose: string
    navLabel: string
    contactCta: string
    heroTitleStart: string
    heroTitleEnd: string
    heroLead: string
    viewProjects: string
    writeMe: string
    marqueeLabel: string
    aboutEyebrow: string
    aboutTitle: string
    aboutLead: string
    experienceEyebrow: string
    experienceTitle: string
    experienceLead: string
    testimonialsEyebrow: string
    testimonialsTitle: string
    testimonialsLead: string
    blogNav: string
    notFoundTitle: string
    notFoundText: string
    notFoundCta: string
    skillsEyebrow: string
    skillsTitle: string
    skillsLead: string
    projectsEyebrow: string
    projectsTitle: string
    projectsLead: string
    demo: string
    code: string
    caseCta: string
    caseEyebrow: string
    caseChallenge: string
    caseSolution: string
    caseResult: string
    caseClose: string
    contactEyebrow: string
    contactTitle: string
    contactLead: string
    telegramCta: string
    formName: string
    formEmail: string
    formMessage: string
    formNamePlaceholder: string
    formEmailPlaceholder: string
    formMessagePlaceholder: string
    formSubmit: string
    formSending: string
    formSuccess: string
    formError: string
    formPrivacy: string
    formRequired: string
    formEmailInvalid: string
    formMessageShort: string
    formOr: string
    footerMadeWith: string
    backToTop: string
    socialsLabel: string
  }
}

export const sectionIds = ['home', 'about', 'experience', 'skills', 'projects', 'contact'] as const

export const siteContent: Record<Language, SiteContent> = {
  ru: {
    meta: {
      title: 'Yury Katok — Frontend-разработчик',
      description:
        'Yury Katok — frontend-разработчик. Создаю быстрые, доступные и аккуратные интерфейсы на React и TypeScript.',
    },
    nav: [
      { id: 'home', label: 'Главная' },
      { id: 'about', label: 'Обо мне' },
      { id: 'experience', label: 'Опыт' },
      { id: 'skills', label: 'Навыки' },
      { id: 'projects', label: 'Проекты' },
      { id: 'blog', label: 'Блог' },
      { id: 'contact', label: 'Контакты' },
    ],
    profile: {
      name: 'Yury Katok',
      shortName: 'Юрий',
      initials: 'YK',
      role: 'Frontend-разработчик',
      availability: 'Открыт к новым проектам',
      location: 'Работаю удалённо',
      email: 'kotokyura@gmail.com',
      telegram: 'https://t.me/ktk314',
      about: [
        'Меня зовут Yury, я frontend-разработчик: превращаю макеты и идеи в быстрые, доступные интерфейсы на React и TypeScript.',
        'Люблю аккуратный код, продуманную анимацию и детали, которые замечаешь не сразу — но чувствуешь каждый день.',
      ],
      stats: [
        { value: '5+', label: 'лет в разработке' },
        { value: '30+', label: 'завершённых проектов' },
        { value: '12', label: 'довольных клиентов' },
      ],
    },
    facts: [
      {
        icon: 'code',
        title: 'Чистый код',
        text: 'TypeScript, понятная архитектура и тесты там, где они нужны.',
      },
      {
        icon: 'spark',
        title: 'Внимание к деталям',
        text: 'Микроанимации, состояния и типографика — до последнего пикселя.',
      },
      {
        icon: 'gauge',
        title: 'Скорость',
        text: 'Оптимизация загрузки и рендера: Lighthouse 95+ на реальных проектах.',
      },
    ],
    experience: [
      {
        period: '2024 — сейчас',
        role: 'Frontend-разработчик',
        company: 'Фриланс и продуктовые команды',
        summary:
          'Отвечаю за интерфейсы целиком: от обсуждения сценария до релиза и метрик.',
        points: [
          'Собираю интерфейсы на React и TypeScript для стартапов и малого бизнеса.',
          'Сократил время на новые страницы, вынеся общие компоненты и токены в дизайн-систему.',
          'Держу Lighthouse 95+ и проверяю доступность до релиза, а не после.',
        ],
        stack: ['React', 'TypeScript', 'Vite', 'CSS'],
      },
      {
        period: '2022 — 2024',
        role: 'Frontend-разработчик',
        company: 'Digital-агентство',
        summary:
          'Вёл несколько проектов параллельно: лендинги, корпоративные сайты и внутренние админки.',
        points: [
          'Держал в работе 6–8 проектов одновременно и сдавал их без переносов сроков.',
          'Перевёл сборку на Vite и настроил общие линты — сборки ускорились в разы.',
          'Проводил код-ревью и помогал дизайнерам проверять макеты на адаптивность.',
        ],
        stack: ['React', 'JavaScript', 'SCSS', 'Git'],
      },
      {
        period: '2021 — 2022',
        role: 'Junior Frontend-разработчик',
        company: 'Веб-студия',
        summary:
          'Начинал с вёрстки и постепенно забрал интерактив и интеграции с API.',
        points: [
          'Верстал адаптивные интерфейсы по макетам Figma с точностью до отступа.',
          'Добавлял анимации и интерактивные блоки на чистом JavaScript.',
          'Разобрался с Git, код-ревью и процессами выпуска релизов.',
        ],
        stack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      },
    ],
    testimonials: [
      {
        quote:
          'Юрий берёт задачу целиком: сам задаёт вопросы по макету, предлагает, как упростить сценарий, и приносит готовый результат. С ним релизы перестали переноситься.',
        name: 'Анна Морозова',
        role: 'Product Manager',
        initials: 'АМ',
      },
      {
        quote:
          'Отдал ему админку, которую до этого переделывали трижды. Через две недели получил интерфейс, в котором новый менеджер разобрался без инструкции.',
        name: 'Дмитрий Соколов',
        role: 'Основатель студии',
        initials: 'ДС',
      },
      {
        quote:
          'Редкий случай, когда вёрстка получается лучше макета: он замечает, что на телефоне кнопка уезжает под палец, и предлагает решение раньше, чем я успеваю спросить.',
        name: 'Елена Ким',
        role: 'Product Designer',
        initials: 'ЕК',
      },
    ],
    blog: {
      metaTitle: 'Блог фронтенд-разработчика',
      metaDescription:
        'Заметки о React, TypeScript, производительности и деталях интерфейса — на примере проектов этого сайта.',
      title: 'Заметки о фронтенде',
      lead: 'Пишу о решениях, которые можно проверить в коде: демо, анимации, типизация и SEO.',
      backHome: 'На главную',
      readMore: 'Читать заметку',
      backToBlog: 'Все заметки',
      minRead: 'мин чтения',
      posts: [
        {
          slug: 'demos-without-libraries',
          title: 'Живые демо без единой библиотеки',
          excerpt:
            'Как три интерактивных проекта на сайте работают на чистом React и SVG — без чартов, стейт-менеджеров и UI-китов.',
          date: '2026-10-18',
          dateLabel: '18 октября 2026',
          readingTime: '6 мин',
          tags: ['React', 'SVG', 'Архитектура'],
          blocks: [
            {
              type: 'paragraph',
              text: 'Когда я добавлял на сайт живые демо, хотелось, чтобы их можно было потрогать, а не просто посмотреть на скриншот. Ограничение было одно: никаких тяжёлых зависимостей. Всё нужное уже есть в React и браузере.',
            },
            { type: 'heading', text: 'График на SVG' },
            {
              type: 'paragraph',
              text: 'Данные для графика — обычный массив точек. Я перевожу их в координаты через viewBox и рисую path: масштабирование остаётся за браузером, а наведение считается по индексу ближайшей точки. Никакого canvas и пересчёта пикселей при ресайзе.',
            },
            { type: 'heading', text: 'Корзина как производное состояние' },
            {
              type: 'paragraph',
              text: 'В магазине хранится только список позиций. Сумма, количество и скидки вычисляются из него, поэтому состояние не может разъехаться: нет второго источника правды, который нужно синхронизировать.',
            },
            {
              type: 'list',
              items: [
                'Фильтры и сортировка — чистые функции над каталогом.',
                'Корзина — пара «товар → количество».',
                'Оформление заказа очищает состояние и показывает подтверждение.',
              ],
            },
            { type: 'heading', text: 'Трекер и localStorage' },
            {
              type: 'paragraph',
              text: 'В трекере важно не потерять прогресс. Запись сохраняется в localStorage при каждом изменении, а при загрузке парсится в try/catch: если данные повреждены, приложение стартует с пустым списком, а не падает.',
            },
            {
              type: 'quote',
              text: 'Самое сложное в демо — не нарисовать интерфейс, а сделать так, чтобы он вёл себя предсказуемо после сотни кликов.',
            },
            {
              type: 'paragraph',
              text: 'В итоге три демо добавляют к бандлу меньше, чем одна средняя чарт-библиотека, и продолжают работать после загрузки страницы.',
            },
          ],
        },
        {
          slug: 'motion-that-doesnt-get-in-the-way',
          title: 'Анимации, которые не мешают',
          excerpt:
            'Почему на этом сайте нет motion-библиотеки и как обойтись transform, opacity и IntersectionObserver.',
          date: '2026-09-27',
          dateLabel: '27 сентября 2026',
          readingTime: '5 мин',
          tags: ['CSS', 'Производительность', 'UX'],
          blocks: [
            {
              type: 'paragraph',
              text: 'Анимация нужна не для красоты. Она объясняет, откуда появился блок, что изменилось и куда нажать. Если анимация не отвечает на вопрос — она мешает.',
            },
            { type: 'heading', text: 'Только transform и opacity' },
            {
              type: 'paragraph',
              text: 'Эти два свойства браузер анимирует на композиторе: они не вызывают пересчёт layout и не заставляют перерисовывать соседние элементы. Как только в transition попадают width, top или box-shadow, начинаются дёрганья на слабых машинах.',
            },
            { type: 'heading', text: 'IntersectionObserver вместо scroll' },
            {
              type: 'paragraph',
              text: 'Появление секций построено на наблюдателе: он срабатывает один раз, когда блок попадает в зону видимости, и сразу отписывается. Обработчик scroll, который на каждом кадре считает getBoundingClientRect, — самый простой способ уронить FPS.',
            },
            {
              type: 'list',
              items: [
                'Задержка появления задаётся через CSS-переменную, а не таймером.',
                'Первый экран показывается сразу, без ожидания наблюдателя.',
                'Ссылки и кнопки остаются кликабельными во время анимации.',
              ],
            },
            { type: 'heading', text: 'Когда лучше без анимации' },
            {
              type: 'paragraph',
              text: 'Если пользователь просит уменьшить движение, контент должен оставаться доступным. На этом сайте анимации включены всегда — так попросил владелец, — но правило про доступность стоит держать в голове при следующем редизайне.',
            },
            {
              type: 'paragraph',
              text: 'Без библиотеки анимаций бандл остаётся маленьким, а поведение предсказуемым: всё описано в CSS, и его видно в DevTools.',
            },
          ],
        },
        {
          slug: 'bilingual-site-one-source',
          title: 'Двуязычный сайт на одном источнике данных',
          excerpt:
            'Как держать RU и EN синхронными, не дублируя вёрстку и не забывая про SEO.',
          date: '2026-08-30',
          dateLabel: '30 августа 2026',
          readingTime: '4 мин',
          tags: ['TypeScript', 'i18n', 'SEO'],
          blocks: [
            {
              type: 'paragraph',
              text: 'Самый быстрый способ сделать двуязычный сайт — скопировать компоненты и перевести текст. Самый надёжный — держать один набор компонентов и два набора строк.',
            },
            { type: 'heading', text: 'Тип как контракт' },
            {
              type: 'paragraph',
              text: 'Весь контент описан типом SiteContent, а siteContent — это Record<Language, SiteContent>. Если в английской версии забыть поле, TypeScript не даст собрать проект. Это дешевле, чем ловить пустой заголовок на проде.',
            },
            { type: 'heading', text: 'Язык в URL, а не только в localStorage' },
            {
              type: 'paragraph',
              text: 'Переключатель меняет адрес: русская версия живёт на /, английская — на /en. Так ссылку можно отправить сразу на нужном языке, а поисковик видит две страницы с правильными hreflang, а не одну с переключателем.',
            },
            {
              type: 'list',
              items: [
                'Заголовок, description и Open Graph обновляются вместе с маршрутом.',
                'sitemap.xml содержит обе языковые версии и статьи блога.',
                'Тесты проверяют, что наборы строк в RU и EN совпадают.',
              ],
            },
            { type: 'heading', text: 'Что это даёт' },
            {
              type: 'paragraph',
              text: 'Контент правится в одном файле, перевод не отстаёт, а SEO не зависит от того, догадается ли краулер нажать на переключатель. Для небольшого сайта этого достаточно — без i18n-фреймворка и лишних зависимостей.',
            },
          ],
        },
      ],
    },
    skills: [
      {
        title: 'Frontend',
        items: ['React', 'TypeScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
      },
      {
        title: 'Инструменты',
        items: ['Vite', 'Git', 'Figma', 'Storybook', 'Jest', 'ESLint'],
      },
      {
        title: 'Дополнительно',
        items: ['Node.js', 'REST API', 'Анимации', 'Доступность (a11y)', 'Оптимизация'],
      },
    ],
    projects: [
      {
        title: 'Orbit Dashboard',
        description:
          'Аналитическая панель: интерактивный SVG-график, переключение периода и разбивка по источникам трафика. Всё считается на клиенте.',
        tags: ['React', 'TypeScript', 'SVG'],
        year: '2026',
        tone: 'violet',
        demoId: 'orbit',
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'Нужна была панель, которая показывает динамику трафика за период и работает без бэкенда: все данные живут в браузере.',
          solution: [
            'Собрал интерактивный SVG-график с наведением и подсказками без сторонних библиотек.',
            'Добавил переключение периода на 7, 30 и 90 дней и пересчёт агрегатов на клиенте.',
            'Показал разбивку по источникам трафика с доступной легендой и подписями.',
          ],
          result:
            'График и метрики пересчитываются мгновенно, без запросов к серверу и без загрузки чарт-библиотек.',
          metrics: [
            { value: '3', label: 'периода отчёта' },
            { value: '0', label: 'внешних зависимостей' },
            { value: 'SVG', label: 'вместо canvas' },
          ],
        },
      },
      {
        title: 'Nord Store',
        description:
          'Мини-магазин с фильтрами по категориям, сортировкой по цене и рабочей корзиной: количество, сумма и оформление заказа.',
        tags: ['React', 'TypeScript', 'State'],
        year: '2026',
        tone: 'cyan',
        demoId: 'store',
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'Показать полный цикл покупки в одном экране: выбор товара, фильтры, корзина и оформление заказа.',
          solution: [
            'Сделал фильтры по категориям и сортировку по цене и названию.',
            'Собрал корзину с изменением количества, подсчётом суммы и понятным пустым состоянием.',
            'Добавил оформление заказа с подтверждением и очисткой корзины.',
          ],
          result:
            'Весь сценарий — от выбора товара до заказа — проходит без перезагрузки страницы и потери состояния.',
          metrics: [
            { value: '12', label: 'товаров в каталоге' },
            { value: '4', label: 'категории' },
            { value: '1', label: 'экран' },
          ],
        },
      },
      {
        title: 'Pulse Fit',
        description:
          'Трекер тренировок: недельная цель, добавление и удаление записей, сохранение прогресса в localStorage между визитами.',
        tags: ['React', 'TypeScript', 'localStorage'],
        year: '2026',
        tone: 'amber',
        demoId: 'fitness',
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'Трекер тренировок, который помнит прогресс между визитами и мотивирует закрыть недельную цель.',
          solution: [
            'Добавил создание и удаление записей с валидацией ввода.',
            'Нарисовал кольцо прогресса недельной цели на SVG без библиотек.',
            'Сохранил данные в localStorage и восстановил их при следующем визите.',
          ],
          result:
            'Прогресс не теряется при перезагрузке, а цель видна с первого экрана.',
          metrics: [
            { value: '7', label: 'дней в цели' },
            { value: 'localStorage', label: 'хранение' },
            { value: '0', label: 'запросов к API' },
          ],
        },
      },
      {
        title: 'Portfolio',
        description:
          'Этот сайт: двуязычный интерфейс (RU/EN), светлая и тёмная темы, адаптивная вёрстка и анимации при прокрутке.',
        tags: ['React', 'Vite', 'i18n'],
        year: '2026',
        tone: 'pink',
        demoId: null,
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'Собрать личный сайт, который одинаково хорошо выглядит на телефоне и десктопе, в двух языках и двух темах.',
          solution: [
            'Вынес весь контент в один типизированный источник для RU и EN.',
            'Сделал темы на CSS-переменных без мигания при загрузке страницы.',
            'Добавил анимации появления на IntersectionObserver и навигацию с клавиатуры.',
          ],
          result:
            'Сайт собирается в статику, деплоится автоматически и не тянет тяжёлых UI-библиотек.',
          metrics: [
            { value: '2', label: 'языка' },
            { value: '2', label: 'темы' },
            { value: '0', label: 'UI-библиотек' },
          ],
        },
      },
      {
        title: 'NeuroHelper',
        description:
          'Бесплатный ИИ-ассистент в Telegram: ответы с памятью диалога, генерация картинок на FLUX, разбор фото и голоса, монетизация через встроенные платежи Telegram Stars.',
        tags: ['Python', 'Telegram', 'AI'],
        year: '2026',
        tone: 'lime',
        demoId: null,
        demoUrl: 'https://t.me/kotyura_bot',
        codeUrl: 'https://t.me/kotyura_bot',
        case: {
          challenge:
            'Нужен был ИИ-ассистент, которым пользуются прямо в чате, без регистрации и VPN, и который при этом зарабатывает без внешних платёжных систем и договоров.',
          solution: [
            'Собрал бота на Python: память диалога, генерация картинок через FLUX, разбор фото и голосовых сообщений, цепочка резервных ИИ-провайдеров.',
            'Сделал freemium: бесплатные запросы в день, Premium и кредиты — оплата встроенными средствами Telegram (Stars).',
            'Добавил реферальную программу с наградами за приглашённых, лимиты, админку и автоперезапуск через watchdog.',
          ],
          result:
            'Пользователю не нужен аккаунт, карта и VPN, а монетизация идёт по встроенным платежам Telegram — без эквайринга, договоров и налоговой сложности.',
          metrics: [
            { value: '0 ₽', label: 'порог входа для пользователя' },
            { value: 'Stars', label: 'встроенные платежи Telegram' },
            { value: '24/7', label: 'watchdog и автоперезапуск' },
          ],
        },
      },
    ],
    socials: [
      { label: 'GitHub', href: 'https://github.com/kotokyra-dev', icon: 'github' },
      { label: 'Telegram', href: 'https://t.me/ktk314', icon: 'telegram' },
    ],
    ui: {
      languageLabel: 'Язык',
      themeToLight: 'Включить светлую тему',
      themeToDark: 'Включить тёмную тему',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
      navLabel: 'Основная навигация',
      contactCta: 'Связаться',
      heroTitleStart: 'Привет, я',
      heroTitleEnd: 'Создаю интерфейсы, которыми приятно пользоваться.',
      heroLead:
        'Frontend-разработчик, работаю удалённо. Проектирую и собираю быстрые, доступные и аккуратные веб-приложения на React и TypeScript.',
      viewProjects: 'Смотреть проекты',
      writeMe: 'Написать мне',
      marqueeLabel: 'Технологии',
      aboutEyebrow: 'Обо мне',
      aboutTitle: 'Разработчик, который думает о продукте',
      aboutLead:
        'Не просто переношу макеты в код — помогаю сделать продукт понятнее и быстрее.',
      experienceEyebrow: 'Опыт',
      experienceTitle: 'Пять лет в продуктовой разработке',
      experienceLead:
        'От вёрстки лендингов до интерфейсов с живыми демо и аналитикой.',
      testimonialsEyebrow: 'Отзывы',
      testimonialsTitle: 'Что говорят люди, с которыми я работал',
      testimonialsLead:
        'Короткие отзывы коллег и клиентов — без регалий и красивых слов.',
      blogNav: 'Блог',
      notFoundTitle: 'Страница не нашлась',
      notFoundText: 'Возможно, ссылка устарела или в адресе опечатка.',
      notFoundCta: 'Вернуться на главную',
      skillsEyebrow: 'Навыки',
      skillsTitle: 'Технологии, с которыми работаю каждый день',
      skillsLead:
        'Подбираю инструменты под задачу, а не наоборот — от прототипа до продакшена.',
      projectsEyebrow: 'Проекты',
      projectsTitle: 'Несколько работ, которыми горжусь',
      projectsLead:
        'От аналитических панелей до дизайн-систем. Каждый проект — про реальную задачу и измеримый результат.',
      demo: 'Демо',
      code: 'Код',
      caseCta: 'Кейс',
      caseEyebrow: 'Разбор проекта',
      caseChallenge: 'Задача',
      caseSolution: 'Что сделал',
      caseResult: 'Результат',
      caseClose: 'Закрыть кейс',
      contactEyebrow: 'Контакты',
      contactTitle: 'Давайте сделаем что-то классное',
      contactLead:
        'Открыт к новым проектам и интересным задачам. Отвечаю в течение рабочего дня.',
      telegramCta: 'Написать в Telegram',
      formName: 'Имя',
      formEmail: 'Email',
      formMessage: 'Сообщение',
      formNamePlaceholder: 'Как к вам обращаться',
      formEmailPlaceholder: 'you@example.com',
      formMessagePlaceholder: 'Пара слов о задаче, сроках и бюджете',
      formSubmit: 'Отправить сообщение',
      formSending: 'Отправляю…',
      formSuccess: 'Сообщение отправлено. Отвечу в течение рабочего дня.',
      formError: 'Не получилось отправить. Напишите на почту — ссылка ниже.',
      formPrivacy: 'Отправляя форму, вы соглашаетесь на обработку данных для ответа.',
      formRequired: 'Заполните это поле',
      formEmailInvalid: 'Проверьте адрес почты',
      formMessageShort: 'Минимум 10 символов',
      formOr: 'или',
      footerMadeWith: 'Сделано на React + Vite',
      backToTop: 'Наверх',
      socialsLabel: 'Социальные сети',
    },
  },
  en: {
    meta: {
      title: 'Yury Katok — Frontend Developer',
      description:
        'Yury Katok — frontend developer building fast, accessible and polished interfaces with React and TypeScript.',
    },
    nav: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
      { id: 'blog', label: 'Blog' },
      { id: 'contact', label: 'Contact' },
    ],
    profile: {
      name: 'Yury Katok',
      shortName: 'Yury',
      initials: 'YK',
      role: 'Frontend Developer',
      availability: 'Open to new projects',
      location: 'Working remotely',
      email: 'kotokyura@gmail.com',
      telegram: 'https://t.me/ktk314',
      about: [
        "I'm Yury, a frontend developer who turns designs and ideas into fast, accessible interfaces with React and TypeScript.",
        "I care about clean code, thoughtful motion and the details you don't notice at first — but feel every day.",
      ],
      stats: [
        { value: '5+', label: 'years of experience' },
        { value: '30+', label: 'projects delivered' },
        { value: '12', label: 'happy clients' },
      ],
    },
    facts: [
      {
        icon: 'code',
        title: 'Clean code',
        text: 'TypeScript, clear architecture and tests where they matter.',
      },
      {
        icon: 'spark',
        title: 'Attention to detail',
        text: 'Micro-interactions, states and typography — down to the last pixel.',
      },
      {
        icon: 'gauge',
        title: 'Performance',
        text: 'Optimised loading and rendering: Lighthouse 95+ on real projects.',
      },
    ],
    experience: [
      {
        period: '2024 — present',
        role: 'Frontend Developer',
        company: 'Freelance & product teams',
        summary:
          'I own the interface end to end: from shaping the flow to shipping and measuring it.',
        points: [
          'Building React and TypeScript interfaces for startups and small businesses.',
          'Cut time-to-new-page by moving shared components and tokens into a design system.',
          'Keeping Lighthouse at 95+ and checking accessibility before release, not after.',
        ],
        stack: ['React', 'TypeScript', 'Vite', 'CSS'],
      },
      {
        period: '2022 — 2024',
        role: 'Frontend Developer',
        company: 'Digital agency',
        summary:
          'Ran several projects in parallel: landing pages, corporate sites and internal dashboards.',
        points: [
          'Kept 6–8 projects in flight and shipped them without slipping deadlines.',
          'Moved the build to Vite and set up shared linting — builds got dramatically faster.',
          'Reviewed code and helped designers validate layouts across breakpoints.',
        ],
        stack: ['React', 'JavaScript', 'SCSS', 'Git'],
      },
      {
        period: '2021 — 2022',
        role: 'Junior Frontend Developer',
        company: 'Web studio',
        summary:
          'Started with markup and gradually took over interactivity and API integrations.',
        points: [
          'Built responsive layouts from Figma with pixel-accurate spacing.',
          'Added animations and interactive blocks in vanilla JavaScript.',
          'Learned Git, code review and release workflows.',
        ],
        stack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
      },
    ],
    testimonials: [
      {
        quote:
          'Yury takes the whole task: he asks the right questions about the design, suggests how to simplify the flow, and brings back a finished result. Releases stopped slipping.',
        name: 'Anna Morozova',
        role: 'Product Manager',
        initials: 'AM',
      },
      {
        quote:
          'I handed him an admin panel that had been rebuilt three times before. Two weeks later I got an interface a new manager could use without a manual.',
        name: 'Dmitry Sokolov',
        role: 'Studio founder',
        initials: 'DS',
      },
      {
        quote:
          'A rare case where the build turns out better than the mockup: he notices the button ends up under your thumb on mobile and suggests a fix before I ask.',
        name: 'Elena Kim',
        role: 'Product Designer',
        initials: 'EK',
      },
    ],
    blog: {
      metaTitle: 'Frontend notes',
      metaDescription:
        'Notes on React, TypeScript, performance and interface details — based on the projects on this site.',
      title: 'Notes on frontend',
      lead: 'Writing about decisions you can check in the code: demos, motion, typing and SEO.',
      backHome: 'Back home',
      readMore: 'Read the note',
      backToBlog: 'All notes',
      minRead: 'min read',
      posts: [
        {
          slug: 'demos-without-libraries',
          title: 'Live demos without a single library',
          excerpt:
            'How three interactive projects on this site run on plain React and SVG — no chart libs, state managers or UI kits.',
          date: '2026-10-18',
          dateLabel: 'October 18, 2026',
          readingTime: '6 min',
          tags: ['React', 'SVG', 'Architecture'],
          blocks: [
            {
              type: 'paragraph',
              text: 'When I added live demos to the site, I wanted them to be touchable, not just screenshots. There was one constraint: no heavy dependencies. Everything I needed was already in React and the browser.',
            },
            { type: 'heading', text: 'A chart in SVG' },
            {
              type: 'paragraph',
              text: 'The chart data is just an array of points. I map it to coordinates through a viewBox and draw a path: scaling is left to the browser, and hover is resolved by the index of the nearest point. No canvas and no pixel maths on resize.',
            },
            { type: 'heading', text: 'Cart as derived state' },
            {
              type: 'paragraph',
              text: 'The store keeps only the list of line items. Totals, quantities and discounts are derived from it, so state cannot drift: there is no second source of truth to sync.',
            },
            {
              type: 'list',
              items: [
                'Filters and sorting are pure functions over the catalog.',
                'The cart maps each product to a quantity.',
                'Checkout resets state and shows a confirmation.',
              ],
            },
            { type: 'heading', text: 'The tracker and localStorage' },
            {
              type: 'paragraph',
              text: 'In the tracker the important part is not losing progress. Every change is written to localStorage, and on load the value is parsed in try/catch: if the data is corrupted, the app starts with an empty list instead of crashing.',
            },
            {
              type: 'quote',
              text: 'The hard part of a demo is not drawing the interface — it is making it behave predictably after a hundred clicks.',
            },
            {
              type: 'paragraph',
              text: 'In the end the three demos add less to the bundle than one average chart library, and keep working after the page has loaded.',
            },
          ],
        },
        {
          slug: 'motion-that-doesnt-get-in-the-way',
          title: 'Motion that does not get in the way',
          excerpt:
            'Why this site ships no motion library, and how transform, opacity and IntersectionObserver are enough.',
          date: '2026-09-27',
          dateLabel: 'September 27, 2026',
          readingTime: '5 min',
          tags: ['CSS', 'Performance', 'UX'],
          blocks: [
            {
              type: 'paragraph',
              text: 'Motion is not decoration. It explains where a block came from, what changed and where to click. If an animation answers no question, it gets in the way.',
            },
            { type: 'heading', text: 'Transform and opacity only' },
            {
              type: 'paragraph',
              text: 'The browser animates these two properties on the compositor: they trigger no layout and do not repaint neighbouring elements. As soon as width, top or box-shadow enter a transition, weaker machines start to stutter.',
            },
            { type: 'heading', text: 'IntersectionObserver instead of scroll' },
            {
              type: 'paragraph',
              text: 'Section reveals use an observer: it fires once when a block enters the viewport and unsubscribes immediately. A scroll handler that measures getBoundingClientRect on every frame is the easiest way to tank the frame rate.',
            },
            {
              type: 'list',
              items: [
                'The reveal delay comes from a CSS variable, not a timer.',
                'The first screen renders immediately, without waiting for the observer.',
                'Links and buttons stay clickable during the animation.',
              ],
            },
            { type: 'heading', text: 'When to skip motion' },
            {
              type: 'paragraph',
              text: 'If a visitor asks for reduced motion, content must stay available. This site always runs animations because the owner asked for it, but the accessibility rule is still worth keeping in mind for the next redesign.',
            },
            {
              type: 'paragraph',
              text: 'Without a motion library the bundle stays small and the behaviour stays predictable: it is all in CSS and visible in DevTools.',
            },
          ],
        },
        {
          slug: 'bilingual-site-one-source',
          title: 'A bilingual site from one source of truth',
          excerpt:
            'How to keep RU and EN in sync without duplicating markup — and without forgetting SEO.',
          date: '2026-08-30',
          dateLabel: 'August 30, 2026',
          readingTime: '4 min',
          tags: ['TypeScript', 'i18n', 'SEO'],
          blocks: [
            {
              type: 'paragraph',
              text: 'The fastest way to build a bilingual site is to copy the components and translate the text. The most reliable way is to keep one set of components and two sets of strings.',
            },
            { type: 'heading', text: 'Types as a contract' },
            {
              type: 'paragraph',
              text: 'All content is described by the SiteContent type, and siteContent is a Record<Language, SiteContent>. If a field is missing from the English version, TypeScript refuses to build. That is cheaper than finding an empty heading in production.',
            },
            { type: 'heading', text: 'Language in the URL, not just localStorage' },
            {
              type: 'paragraph',
              text: 'The switcher changes the address: the Russian version lives at /, the English one at /en. A link can be shared in the right language, and search engines see two pages with proper hreflang instead of one page with a toggle.',
            },
            {
              type: 'list',
              items: [
                'Title, description and Open Graph update with the route.',
                'sitemap.xml lists both languages and the blog posts.',
                'Tests assert that the RU and EN string sets match.',
              ],
            },
            { type: 'heading', text: 'What it buys you' },
            {
              type: 'paragraph',
              text: 'Content is edited in one file, translations do not lag behind, and SEO does not depend on whether a crawler clicks the switcher. For a small site that is enough — no i18n framework, no extra dependencies.',
            },
          ],
        },
      ],
    },
    skills: [
      {
        title: 'Frontend',
        items: ['React', 'TypeScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
      },
      {
        title: 'Tools',
        items: ['Vite', 'Git', 'Figma', 'Storybook', 'Jest', 'ESLint'],
      },
      {
        title: 'Also',
        items: ['Node.js', 'REST API', 'Motion', 'Accessibility (a11y)', 'Performance'],
      },
    ],
    projects: [
      {
        title: 'Orbit Dashboard',
        description:
          'Analytics dashboard with an interactive SVG chart, period switching and a traffic-source breakdown. All computed on the client.',
        tags: ['React', 'TypeScript', 'SVG'],
        year: '2026',
        tone: 'violet',
        demoId: 'orbit',
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'Build a dashboard that shows traffic dynamics for a period and works without a backend: all data lives in the browser.',
          solution: [
            'Built an interactive SVG chart with hover states and tooltips, no chart libraries.',
            'Added 7, 30 and 90 day period switching with aggregates recomputed on the client.',
            'Visualised the traffic-source breakdown with an accessible legend and labels.',
          ],
          result:
            'The chart and metrics update instantly, with no server requests and no chart library bundle.',
          metrics: [
            { value: '3', label: 'report periods' },
            { value: '0', label: 'external deps' },
            { value: 'SVG', label: 'instead of canvas' },
          ],
        },
      },
      {
        title: 'Nord Store',
        description:
          'Mini store with category filters, price sorting and a working cart: quantities, total and checkout flow.',
        tags: ['React', 'TypeScript', 'State'],
        year: '2026',
        tone: 'cyan',
        demoId: 'store',
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'Show the full purchase flow on a single screen: product selection, filters, cart and checkout.',
          solution: [
            'Added category filters plus sorting by price and name.',
            'Built a cart with quantity controls, total calculation and a clear empty state.',
            'Implemented checkout with confirmation and cart reset.',
          ],
          result:
            'The whole flow — from picking a product to placing an order — works without reloads or lost state.',
          metrics: [
            { value: '12', label: 'catalog items' },
            { value: '4', label: 'categories' },
            { value: '1', label: 'screen' },
          ],
        },
      },
      {
        title: 'Pulse Fit',
        description:
          'Workout tracker with a weekly goal, add and delete entries, and progress saved to localStorage between visits.',
        tags: ['React', 'TypeScript', 'localStorage'],
        year: '2026',
        tone: 'amber',
        demoId: 'fitness',
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'A workout tracker that remembers progress between visits and nudges you towards a weekly goal.',
          solution: [
            'Added entry creation and deletion with input validation.',
            'Drew the weekly goal progress ring in SVG, without libraries.',
            'Persisted data in localStorage and restored it on the next visit.',
          ],
          result: 'Progress survives reloads, and the goal is visible from the first screen.',
          metrics: [
            { value: '7', label: 'days per goal' },
            { value: 'localStorage', label: 'persistence' },
            { value: '0', label: 'API requests' },
          ],
        },
      },
      {
        title: 'Portfolio',
        description:
          'This site: bilingual UI (RU/EN), light and dark themes, responsive layout and scroll animations.',
        tags: ['React', 'Vite', 'i18n'],
        year: '2026',
        tone: 'pink',
        demoId: null,
        demoUrl: null,
        codeUrl: 'https://github.com/kotokyra-dev/portfolio',
        case: {
          challenge:
            'Build a personal site that looks equally good on mobile and desktop, in two languages and two themes.',
          solution: [
            'Moved all content into a single typed source for RU and EN.',
            'Implemented themes with CSS variables and no flash on page load.',
            'Added reveal animations via IntersectionObserver and keyboard-friendly navigation.',
          ],
          result:
            'The site builds to static files, deploys automatically and ships no heavy UI libraries.',
          metrics: [
            { value: '2', label: 'languages' },
            { value: '2', label: 'themes' },
            { value: '0', label: 'UI libraries' },
          ],
        },
      },
      {
        title: 'NeuroHelper',
        description:
          'A free AI assistant inside Telegram: chat with memory, FLUX image generation, photo and voice analysis, monetized through Telegram Stars.',
        tags: ['Python', 'Telegram', 'AI'],
        year: '2026',
        tone: 'lime',
        demoId: null,
        demoUrl: 'https://t.me/kotyura_bot',
        codeUrl: 'https://t.me/kotyura_bot',
        case: {
          challenge:
            'An AI assistant people could use right inside a chat, with no signup and no VPN, that still earns money without any external payment provider or contracts.',
          solution: [
            'Built the bot in Python: conversation memory, FLUX image generation, photo and voice analysis, and a chain of fallback AI providers.',
            'Built a freemium model: free daily quota, Premium and credit packs paid with Telegram Stars.',
            'Added a referral program with milestone rewards, usage limits, an admin panel and a watchdog for automatic restarts.',
          ],
          result:
            'Users need no account, card or VPN, while payments run through Telegram built-ins — no acquirer, contracts or tax complexity.',
          metrics: [
            { value: '$0', label: 'entry cost for users' },
            { value: 'Stars', label: 'Telegram built-in payments' },
            { value: '24/7', label: 'watchdog and auto-restart' },
          ],
        },
      },
    ],
    socials: [
      { label: 'GitHub', href: 'https://github.com/kotokyra-dev', icon: 'github' },
      { label: 'Telegram', href: 'https://t.me/ktk314', icon: 'telegram' },
    ],
    ui: {
      languageLabel: 'Language',
      themeToLight: 'Switch to light theme',
      themeToDark: 'Switch to dark theme',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      navLabel: 'Main navigation',
      contactCta: 'Get in touch',
      heroTitleStart: "Hi, I'm",
      heroTitleEnd: 'I build interfaces people enjoy using.',
      heroLead:
        'Frontend developer working remotely. I design and build fast, accessible and polished web apps with React and TypeScript.',
      viewProjects: 'View projects',
      writeMe: 'Get in touch',
      marqueeLabel: 'Technologies',
      aboutEyebrow: 'About me',
      aboutTitle: 'A developer who thinks about the product',
      aboutLead:
        "I don't just turn designs into code — I help make the product clearer and faster.",
      experienceEyebrow: 'Experience',
      experienceTitle: 'Five years of product development',
      experienceLead: 'From landing page markup to interfaces with live demos and analytics.',
      testimonialsEyebrow: 'Testimonials',
      testimonialsTitle: 'What people I worked with say',
      testimonialsLead: 'Short notes from colleagues and clients — no titles, no fluff.',
      blogNav: 'Blog',
      notFoundTitle: 'Page not found',
      notFoundText: 'The link may be outdated, or there is a typo in the address.',
      notFoundCta: 'Back to home',
      skillsEyebrow: 'Skills',
      skillsTitle: 'Tools I work with every day',
      skillsLead:
        'I pick tools for the job, not the other way around — from prototype to production.',
      projectsEyebrow: 'Projects',
      projectsTitle: "A few projects I'm proud of",
      projectsLead:
        'From analytics dashboards to design systems. Every project is about a real problem and a measurable result.',
      demo: 'Live demo',
      code: 'Source',
      caseCta: 'Case study',
      caseEyebrow: 'Case study',
      caseChallenge: 'The challenge',
      caseSolution: 'What I did',
      caseResult: 'The result',
      caseClose: 'Close case study',
      contactEyebrow: 'Contact',
      contactTitle: "Let's build something great",
      contactLead:
        "I'm open to new projects and interesting challenges. I reply within one business day.",
      telegramCta: 'Message me on Telegram',
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      formNamePlaceholder: 'What should I call you?',
      formEmailPlaceholder: 'you@example.com',
      formMessagePlaceholder: 'A few words about the task, timeline and budget',
      formSubmit: 'Send message',
      formSending: 'Sending…',
      formSuccess: 'Message sent. I will reply within one business day.',
      formError: 'Could not send. Email me instead — the link is below.',
      formPrivacy: 'By submitting this form you agree to your data being used to reply.',
      formRequired: 'Please fill in this field',
      formEmailInvalid: 'Check the email address',
      formMessageShort: 'At least 10 characters',
      formOr: 'or',
      footerMadeWith: 'Built with React + Vite',
      backToTop: 'Back to top',
      socialsLabel: 'Social profiles',
    },
  },
}

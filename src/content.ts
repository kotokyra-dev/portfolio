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
  skills: { title: string; items: string[] }[]
  projects: {
    title: string
    description: string
    tags: string[]
    year: string
    tone: 'violet' | 'cyan' | 'amber' | 'pink'
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

export const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'] as const

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
      { id: 'skills', label: 'Навыки' },
      { id: 'projects', label: 'Проекты' },
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
        { value: '40+', label: 'завершённых проектов' },
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
      { id: 'skills', label: 'Skills' },
      { id: 'projects', label: 'Projects' },
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
        { value: '40+', label: 'projects delivered' },
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

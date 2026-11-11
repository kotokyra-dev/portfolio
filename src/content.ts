/**
 * Всё содержимое сайта собрано здесь — меняй тексты, ссылки и проекты,
 * не трогая вёрстку. Для каждой локали свой набор строк.
 */

export type Language = 'ru' | 'en'

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
    links: { demo: string; code: string }
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
    contactEyebrow: string
    contactTitle: string
    contactLead: string
    telegramCta: string
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
      shortName: 'Yury',
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
          'Аналитическая панель для SaaS: интерактивные графики, фильтры и тёмная тема из коробки.',
        tags: ['React', 'TypeScript', 'Recharts'],
        year: '2026',
        tone: 'violet',
        links: { demo: '#', code: '#' },
      },
      {
        title: 'Nord Store',
        description:
          'Интернет-магазин с каталогом, корзиной и оплатой. Быстрая навигация и SEO-оптимизация.',
        tags: ['Next.js', 'Stripe', 'Tailwind'],
        year: '2025',
        tone: 'cyan',
        links: { demo: '#', code: '#' },
      },
      {
        title: 'Pulse Fit',
        description:
          'Веб-трекер тренировок как PWA: офлайн-режим, push-уведомления и плавные переходы.',
        tags: ['React', 'PWA', 'IndexedDB'],
        year: '2025',
        tone: 'amber',
        links: { demo: '#', code: '#' },
      },
      {
        title: 'Aurora UI',
        description:
          'Дизайн-система из 60+ компонентов с документацией в Storybook и полной поддержкой a11y.',
        tags: ['Storybook', 'Design System', 'a11y'],
        year: '2024',
        tone: 'pink',
        links: { demo: '#', code: '#' },
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
      contactEyebrow: 'Контакты',
      contactTitle: 'Давайте сделаем что-то классное',
      contactLead:
        'Открыт к новым проектам и интересным задачам. Отвечаю в течение рабочего дня.',
      telegramCta: 'Написать в Telegram',
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
          'Analytics dashboard for a SaaS product: interactive charts, filters and dark mode out of the box.',
        tags: ['React', 'TypeScript', 'Recharts'],
        year: '2026',
        tone: 'violet',
        links: { demo: '#', code: '#' },
      },
      {
        title: 'Nord Store',
        description:
          'Online store with a catalogue, cart and checkout. Fast navigation and SEO-friendly pages.',
        tags: ['Next.js', 'Stripe', 'Tailwind'],
        year: '2025',
        tone: 'cyan',
        links: { demo: '#', code: '#' },
      },
      {
        title: 'Pulse Fit',
        description:
          'Workout tracker built as a PWA: offline mode, push notifications and smooth transitions.',
        tags: ['React', 'PWA', 'IndexedDB'],
        year: '2025',
        tone: 'amber',
        links: { demo: '#', code: '#' },
      },
      {
        title: 'Aurora UI',
        description:
          'A design system of 60+ components documented in Storybook with full a11y support.',
        tags: ['Storybook', 'Design System', 'a11y'],
        year: '2024',
        tone: 'pink',
        links: { demo: '#', code: '#' },
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
      contactEyebrow: 'Contact',
      contactTitle: "Let's build something great",
      contactLead:
        "I'm open to new projects and interesting challenges. I reply within one business day.",
      telegramCta: 'Message me on Telegram',
      footerMadeWith: 'Built with React + Vite',
      backToTop: 'Back to top',
      socialsLabel: 'Social profiles',
    },
  },
}

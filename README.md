# Портфолио — одностраничный сайт

Персональный сайт-визитка на React + TypeScript + Vite: светлая и тёмная темы,
переключение языка (RU/EN), анимации при прокрутке, адаптивная вёрстка.
В разделе «Проекты» — четыре кейса с разбором задачи и три интерактивных демо,
которые открываются прямо на сайте. Есть рабочая форма связи, SEO-разметка,
аналитика Vercel и CI с тестами.

**Живой сайт:** https://portfolio-kotokyra.vercel.app

## Запуск

```bash
npm install      # установить зависимости (один раз)
npm run dev      # dev-сервер: http://localhost:5173
npm run build    # production-сборка в папку dist/
npm run preview  # локальный просмотр собранной версии
npm run lint     # проверка кода
npm run test     # тесты (Vitest)
```

## Форма связи

Форма отправляет POST на `/api/contact` — это серверная функция Vercel
(`api/contact.js`), которая пересылает письмо через [Resend](https://resend.com).

В Vercel → Project → Settings → Environment Variables добавь:

| Переменная           | Значение                                            |
| -------------------- | --------------------------------------------------- |
| `RESEND_API_KEY`     | ключ из личного кабинета Resend                     |
| `CONTACT_TO_EMAIL`   | куда приходит письмо (по умолчанию email из сайта)  |
| `CONTACT_FROM_EMAIL` | отправитель, например `Portfolio <hi@your-domain.ru>` |

Без своего домена используй `Portfolio <onboarding@resend.dev>`: Resend разрешает
такую отправку только на адрес владельца аккаунта. Пока ключ не задан, форма
показывает ошибку и предлагает написать на почту напрямую.

В `npm run dev` серверной функции нет: локально форма тоже покажет fallback на почту.
Проверить отправку можно командой `npx vercel dev` или уже на задеплоенном сайте.

## SEO и аналитика

- `index.html` — Open Graph, Twitter Card, canonical и JSON-LD (Person).
- `public/og-image.png` — картинка 1200×630 для превью ссылки.
- `public/robots.txt` и `public/sitemap.xml`.
- `@vercel/analytics` — просмотры и источники (включается в настройках проекта Vercel).

## Что где менять

| Что нужно                    | Файл                                   |
| ---------------------------- | -------------------------------------- |
| Имя, роль, тексты (RU и EN)  | `src/content.ts`                       |
| Навыки, проекты и кейсы      | `src/content.ts`                       |
| Тексты демо-проектов         | `src/demos/*.tsx`                      |
| Цвета, шрифты, отступы       | `src/index.css` (переменные в `:root`) |
| Стили секций                 | `src/App.css`                          |
| Заголовок и мета-теги        | `index.html`                           |
| Иконка сайта                 | `public/favicon.svg`                   |
| OG-картинка                  | `public/og-image.png`                  |

Почти весь контент лежит в `src/content.ts` — правь тексты и ссылки там,
вёрстку трогать не нужно.

## Структура

```
api/
└── contact.js           # серверная функция отправки формы
src/
├── App.tsx              # сборка страницы из секций
├── App.css              # стили секций
├── index.css            # переменные, сброс, базовые стили
├── content.ts           # весь контент сайта (ru / en)
├── content.test.ts      # проверки целостности контента
├── lib/
│   ├── validate.ts      # валидация формы
│   └── validate.test.ts # тесты валидации
├── hooks/
│   ├── useTheme.ts      # переключение светлой/тёмной темы
│   └── useScrollSpy.ts  # подсветка активного пункта меню
├── i18n/
│   ├── context.ts       # контекст языка и хук useLanguage
│   └── LanguageProvider.tsx # хранение выбранного языка
├── demos/
│   ├── DemoModal.tsx    # модальное окно для демо
│   ├── OrbitDemo.tsx    # аналитическая панель
│   ├── StoreDemo.tsx    # мини-магазин с корзиной
│   ├── FitnessDemo.tsx  # трекер тренировок
│   └── demos.css        # стили демо
└── components/
    ├── Header.tsx       # шапка и мобильное меню
    ├── Hero.tsx         # первый экран
    ├── TechMarquee.tsx  # бегущая строка технологий
    ├── About.tsx        # обо мне
    ├── Skills.tsx       # навыки
    ├── Projects.tsx     # проекты
    ├── CaseModal.tsx    # модальное окно кейса
    ├── Contact.tsx      # контакты
    ├── ContactForm.tsx  # форма связи
    ├── Footer.tsx       # подвал
    ├── Reveal.tsx       # появление блоков при прокрутке
    └── icons.tsx        # SVG-иконки
```

## Что заменить перед публикацией

- [ ] Имя, роль и тексты в `src/content.ts` (блоки `ru` и `en`)
- [ ] Английские переводы в `siteContent.en`
- [ ] Email и ссылки на соцсети (`profile.email`, `socials`)
- [ ] Ссылки на код проектов (`codeUrl` в массиве `projects`)
- [ ] Реальные цифры в `profile.stats`
- [ ] Заголовок и описание в `index.html`
- [ ] Цвета акцента в `src/index.css`, если нужна другая палитра

## Публикация

Сайт задеплоен на Vercel: **https://portfolio-kotokyra.vercel.app**

Репозиторий подключён к Vercel, поэтому каждый `git push` в `main` запускает
сборку и обновляет продакшн автоматически (1–2 минуты). Пуши в другие ветки
и пулл-реквесты получают превью-деплои.

Ручной деплой, если нужно:

```bash
npx vercel --prod
```

CI (`.github/workflows/ci.yml`) на каждый пуш и PR запускает линт, тесты и сборку.

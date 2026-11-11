# Портфолио — одностраничный сайт

Персональный сайт-визитка на React + TypeScript + Vite: светлая и тёмная темы,
переключение языка (RU/EN), анимации при прокрутке, адаптивная вёрстка.
В разделе «Проекты» — четыре кейса с разбором задачи и три интерактивных демо,
которые открываются прямо на сайте. Есть опыт работы, отзывы, блог с отдельными
страницами, рабочая форма связи, SEO-разметка, PWA-манифест, аналитика Vercel
и CI с тестами.

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

### Как получить ключ Resend

1. Зарегистрируйся на [resend.com](https://resend.com) (бесплатный тариф — 3000 писем в месяц).
2. Открой **API Keys → Create API Key**, выбери право **Sending access** и скопируй ключ (`re_...`). Он показывается один раз.
3. Без своего домена оставь отправителя `Portfolio <onboarding@resend.dev>`, а в `CONTACT_TO_EMAIL` укажи почту, на которую зарегистрирован Resend.
4. Если есть домен: **Domains → Add Domain**, добавь DNS-записи (SPF, DKIM, DMARC) и дождись статуса Verified. Затем используй отправителя вида `Portfolio <hi@your-domain.ru>`.
5. В Vercel открой **Project → Settings → Environment Variables** и добавь `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` для Production (и Preview, если нужно).
6. Нажми **Redeploy** у последнего деплоя или сделай любой пуш — переменные подхватятся функцией.
7. Отправь тестовое сообщение с сайта. Ответ `200 {"ok":true}` — письмо ушло; `503 not_configured` — не задан ключ; `502 delivery_failed` — смотри логи функции и Resend → Emails.

В `npm run dev` серверной функции нет: локально форма тоже покажет fallback на почту.
Проверить отправку можно командой `npx vercel dev` или уже на задеплоенном сайте.

## Маршруты и язык

Язык хранится в адресе, поэтому ссылку можно сразу отправить на нужной версии:

| Страница        | RU              | EN                 |
| --------------- | --------------- | ------------------ |
| Главная         | `/`             | `/en`              |
| Блог            | `/blog`         | `/en/blog`         |
| Статья блога    | `/blog/:slug`   | `/en/blog/:slug`   |
| Неизвестный URL | 404-страница    | 404-страница       |

Роутер самописный и лежит в `src/router.ts` — без внешних зависимостей.
`vercel.json` переписывает все пути (кроме `/api/*`) на `index.html`, чтобы
статьи открывались по прямой ссылке. Заголовок, description, canonical,
Open Graph и hreflang обновляются в `src/hooks/usePageMeta.ts`.

## SEO и аналитика

- `index.html` — Open Graph, Twitter Card, canonical и JSON-LD (Person).
- `public/og-image.png` — картинка 1200×630 для превью ссылки.
- `public/robots.txt` и `public/sitemap.xml` — обе языковые версии и все статьи.
- `public/manifest.webmanifest` и `public/icons/*` — установка сайта как PWA.
- `@vercel/analytics` — просмотры и источники (включается в настройках проекта Vercel).

## Что где менять

| Что нужно                    | Файл                                   |
| ---------------------------- | -------------------------------------- |
| Имя, роль, тексты (RU и EN)  | `src/content.ts`                       |
| Опыт работы                  | `experience` в `src/content.ts`        |
| Отзывы                       | `testimonials` в `src/content.ts`      |
| Статьи блога                 | `blog.posts` в `src/content.ts`        |
| Навыки, проекты и кейсы      | `src/content.ts`                       |
| Тексты демо-проектов         | `src/demos/*.tsx`                      |
| Цвета, шрифты, отступы       | `src/index.css` (переменные в `:root`) |
| Стили секций                 | `src/App.css`                          |
| Заголовок и мета-теги        | `index.html`                           |
| Иконка сайта                 | `public/favicon.svg`                   |
| PWA-иконки и манифест        | `public/icons/*`, `public/manifest.webmanifest` |
| OG-картинка                  | `public/og-image.png`                  |

Почти весь контент лежит в `src/content.ts` — правь тексты и ссылки там,
вёрстку трогать не нужно.

## Структура

```
api/
└── contact.js           # серверная функция отправки формы
src/
├── App.tsx              # выбор страницы по маршруту
├── App.css              # стили секций и страниц
├── index.css            # переменные, сброс, базовые стили
├── content.ts           # весь контент сайта (ru / en)
├── content.test.ts      # проверки целостности контента
├── router.ts            # маршруты и перехват внутренних ссылок
├── router.test.ts       # тесты разбора и сборки путей
├── lib/
│   ├── validate.ts      # валидация формы
│   └── validate.test.ts # тесты валидации
├── hooks/
│   ├── useTheme.ts      # переключение светлой/тёмной темы
│   ├── usePageMeta.ts   # title, canonical, OG и hreflang
│   └── useScrollSpy.ts  # подсветка активного пункта меню
├── i18n/
│   ├── context.ts       # контекст языка и хук useLanguage
│   └── LanguageProvider.tsx # язык из URL и переключатель
├── demos/
│   ├── DemoModal.tsx    # модальное окно для демо
│   ├── OrbitDemo.tsx    # аналитическая панель
│   ├── StoreDemo.tsx    # мини-магазин с корзиной
│   ├── FitnessDemo.tsx  # трекер тренировок
│   └── demos.css        # стили демо
└── components/
    ├── Header.tsx       # шапка и мобильное меню
    ├── Home.tsx         # главная страница из секций
    ├── Hero.tsx         # первый экран
    ├── TechMarquee.tsx  # бегущая строка технологий
    ├── About.tsx        # обо мне
    ├── Experience.tsx   # таймлайн опыта
    ├── Skills.tsx       # навыки
    ├── Projects.tsx     # проекты
    ├── Testimonials.tsx # отзывы
    ├── CaseModal.tsx    # модальное окно кейса
    ├── BlogPage.tsx     # список статей
    ├── BlogPostPage.tsx # страница статьи
    ├── NotFound.tsx     # 404
    ├── Contact.tsx      # контакты
    ├── ContactForm.tsx  # форма связи
    ├── Footer.tsx       # подвал
    ├── Reveal.tsx       # появление блоков при прокрутке
    └── icons.tsx        # SVG-иконки
```

## Что заменить перед публикацией

- [ ] Имя, роль и тексты в `src/content.ts` (блоки `ru` и `en`)
- [ ] Английские переводы в `siteContent.en`
- [ ] Опыт работы в `experience` и отзывы в `testimonials`
- [ ] Статьи блога в `blog.posts` (даты, тексты, slug)
- [ ] Email и ссылки на соцсети (`profile.email`, `socials`)
- [ ] Ссылки на код проектов (`codeUrl` в массиве `projects`)
- [ ] Реальные цифры в `profile.stats`
- [ ] Заголовок и описание в `index.html`
- [ ] Цвета акцента в `src/index.css`, если нужна другая палитра

## Публикация

Сайт задеплоен на Vercel: **https://portfolio-kotokyra.vercel.app**

Репозиторий подключён к Vercel, поэтому каждый `git push` в `main` запускает
сборку и обновляет продакшн автоматически (1–2 минуты). Пуши в другие ветки
и пулл-реквесты получают превью-деплои. `vercel.json` отвечает за SPA-маршруты:
прямые ссылки на статьи блога открываются без 404.

Ручной деплой, если нужно:

```bash
npx vercel --prod
```

CI (`.github/workflows/ci.yml`) на каждый пуш и PR запускает линт, тесты и сборку.

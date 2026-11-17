import { useEffect } from 'react'
import type { BotFeatureIcon } from '../content'
import { useLanguage } from '../i18n/context'
import { trackEvent } from '../lib/analytics'
import { buildPath } from '../router'
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  ChatIcon,
  CodeIcon,
  ImageIcon,
  MicIcon,
  SparkIcon,
  StarsIcon,
  TelegramIcon,
} from './icons'
import { Reveal } from './Reveal'

const ORIGIN = 'https://kotok.site'

const featureIcons: Record<BotFeatureIcon, typeof ChatIcon> = {
  chat: ChatIcon,
  spark: SparkIcon,
  image: ImageIcon,
  mic: MicIcon,
  tools: CodeIcon,
  stars: StarsIcon,
}

export function BotPage() {
  const { content, language } = useLanguage()
  const bot = content.bot
  const go = (place: string) => trackEvent('bot_open', { place })

  // Разметка для поисковиков: приложение и ответы на частые вопросы.
  useEffect(() => {
    const id = 'bot-structured-data'
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'NeuroHelper',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Telegram',
          url: `${ORIGIN}${buildPath(language, '/bot')}`,
          description: bot.metaDescription,
        },
        {
          '@type': 'FAQPage',
          mainEntity: bot.faq.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
      ],
    })

    document.getElementById(id)?.remove()
    document.head.appendChild(script)
    return () => script.remove()
  }, [language, bot])

  return (
    <div className="bot-page">
      <section className="section bot-hero">
        <div className="container bot-hero__grid">
          <div className="bot-hero__content">
            <Reveal>
              <span className="eyebrow">{bot.eyebrow}</span>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="bot-hero__title">{bot.title}</h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="bot-hero__lead">{bot.lead}</p>
            </Reveal>

            <Reveal delay={200}>
              <span className="bot-status">
                <span className="bot-status__dot" aria-hidden="true" />
                {bot.status}
              </span>
            </Reveal>

            <Reveal delay={260}>
              <div className="bot-hero__actions">
                <a
                  className="btn btn--primary"
                  href={bot.botLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => go('hero')}
                >
                  <TelegramIcon />
                  {bot.ctaPrimary}
                </a>
                <a
                  className="btn btn--ghost"
                  href="#pricing"
                  onClick={() => trackEvent('bot_pricing_view', { place: 'hero' })}
                >
                  {bot.ctaSecondary}
                  <ArrowDownIcon />
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="bot-stats">
                {bot.stats.map((stat) => (
                  <div className="stat" key={stat.label}>
                    <dt className="stat__label">{stat.label}</dt>
                    <dd className="stat__value">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal className="bot-hero__visual" delay={180}>
            <div className="bot-chat" aria-hidden="true">
              <div className="bot-chat__bar">
                <span className="bot-chat__avatar">N</span>
                <span className="bot-chat__person">
                  <span className="bot-chat__name">{bot.chat.name}</span>
                  <span className="bot-chat__online">
                    <span className="bot-chat__dot" />
                    {bot.chat.online}
                  </span>
                </span>
                <TelegramIcon className="bot-chat__tg" />
              </div>

              <div className="bot-chat__body">
                <p className="bot-msg bot-msg--user">{bot.chat.userText}</p>
                <p className="bot-msg bot-msg--bot">{bot.chat.botText}</p>
                <p className="bot-msg bot-msg--user">{bot.chat.userText2}</p>
                <span className="bot-art">
                  <span className="bot-art__label">{bot.chat.artLabel}</span>
                </span>
              </div>

              <div className="bot-chat__input">
                <span className="bot-chat__field" />
                <span className="bot-chat__send">
                  <TelegramIcon />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bot-features">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">{bot.featuresEyebrow}</span>
            <h2 className="section__title">{bot.featuresTitle}</h2>
            <p className="section__lead">{bot.featuresLead}</p>
          </Reveal>

          <div className="bot-features__grid">
            {bot.features.map((feature, index) => {
              const Icon = featureIcons[feature.icon]
              return (
                <Reveal as="article" className="bot-feature" delay={index * 60} key={feature.title}>
                  <span className="bot-feature__icon">
                    <Icon />
                  </span>
                  <h3 className="bot-feature__title">{feature.title}</h3>
                  <p className="bot-feature__text">{feature.text}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="section bot-pricing">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">{bot.pricingEyebrow}</span>
            <h2 className="section__title">{bot.pricingTitle}</h2>
            <p className="section__lead">{bot.pricingLead}</p>
          </Reveal>

          <div className="bot-plans">
            {bot.plans.map((plan, index) => (
              <Reveal
                as="article"
                className={`bot-plan ${plan.highlight ? 'bot-plan--highlight' : ''}`}
                delay={index * 80}
                key={plan.name}
              >
                {plan.badge && <span className="bot-plan__badge">{plan.badge}</span>}

                <h3 className="bot-plan__name">{plan.name}</h3>
                <p className="bot-plan__price">
                  <strong>{plan.price}</strong>
                  <span>{plan.period}</span>
                </p>
                <p className="bot-plan__desc">{plan.description}</p>

                <ul className="bot-plan__features">
                  {plan.features.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <a
                  className={`btn bot-plan__cta ${plan.highlight ? 'btn--primary' : 'btn--ghost'}`}
                  href={bot.botLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => go(`pricing-${plan.name}`)}
                >
                  {plan.cta}
                  <ArrowUpRightIcon />
                </a>
              </Reveal>
            ))}
          </div>

          <p className="bot-pricing__note">{bot.pricingNote}</p>
        </div>
      </section>

      <section className="section bot-ref">
        <div className="container">
          <Reveal className="bot-ref__panel">
            <div className="bot-ref__copy">
              <span className="eyebrow">{bot.refEyebrow}</span>
              <h2 className="bot-ref__title">{bot.refTitle}</h2>
              <p className="bot-ref__text">{bot.refText}</p>
              <a
                className="btn btn--primary"
                href={bot.botLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => go('referral')}
              >
                {bot.refCta}
                <ArrowUpRightIcon />
              </a>
            </div>

            <ul className="bot-ref__list">
              {bot.refMilestones.map((milestone) => (
                <li key={milestone.referrals}>
                  <span className="bot-ref__count">{milestone.referrals}</span>
                  <span className="bot-ref__reward">{milestone.reward}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section bot-faq">
        <div className="container bot-faq__grid">
          <Reveal className="bot-faq__head">
            <span className="eyebrow">{bot.faqEyebrow}</span>
            <h2 className="section__title">{bot.faqTitle}</h2>
          </Reveal>

          <div className="bot-faq__list">
            {bot.faq.map((item, index) => (
              <Reveal key={item.q} delay={index * 50}>
                <details className="bot-faq__item">
                  <summary>
                    {item.q}
                    <span className="bot-faq__mark" aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bot-final">
        <div className="container">
          <Reveal className="bot-final__panel">
            <h2 className="bot-final__title">{bot.ctaTitle}</h2>
            <p className="bot-final__text">{bot.ctaText}</p>
            <a
              className="btn btn--primary"
              href={bot.botLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => go('final')}
            >
              <TelegramIcon />
              {bot.ctaButton}
            </a>
            <p className="bot-final__note">{bot.ctaNote}</p>
          </Reveal>

          <a className="link bot-page__back" href={buildPath(language, '/')}>
            ← {bot.backHome}
          </a>
        </div>
      </section>
    </div>
  )
}

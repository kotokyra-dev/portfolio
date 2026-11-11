import { useLanguage } from '../i18n/context'
import { ArrowDownIcon, ArrowUpRightIcon, MapPinIcon } from './icons'
import { Reveal } from './Reveal'

export function Hero() {
  const { content } = useLanguage()
  const { profile, ui } = content

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <Reveal>
            <span className="badge">
              <span className="badge__dot" aria-hidden="true" />
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="hero__title">
              {ui.heroTitleStart} <span className="grad">{profile.shortName}</span>.
              <br />
              {ui.heroTitleEnd}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="hero__lead">{ui.heroLead}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#projects">
                {ui.viewProjects}
                <ArrowDownIcon />
              </a>
              <a className="btn btn--ghost" href="#contact">
                {ui.writeMe}
                <ArrowUpRightIcon />
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="hero__location">
              <MapPinIcon />
              {profile.location}
            </p>
          </Reveal>

          <Reveal delay={380}>
            <dl className="hero__stats">
              {profile.stats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <dt className="stat__label">{stat.label}</dt>
                  <dd className="stat__value">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="hero__visual" delay={220}>
          <span className="orb" aria-hidden="true" />

          <div className="code-card">
            <div className="code-card__bar" aria-hidden="true">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
              <span className="code-card__file">developer.ts</span>
            </div>
            <pre className="code-card__body">
              <code>
                <span className="tok-key">const</span> developer = {'{\n'}
                {'  '}name: <span className="tok-str">'{profile.shortName}'</span>,{'\n'}
                {'  '}stack: [<span className="tok-str">'React'</span>, <span className="tok-str">'TS'</span>],{'\n'}
                {'  '}focus: <span className="tok-str">'UX & performance'</span>,{'\n'}
                {'  '}available: <span className="tok-key">true</span>,{'\n'}
                {'}'}
              </code>
            </pre>
          </div>

          <span className="float-chip float-chip--1" aria-hidden="true">
            <span className="float-chip__dot" style={{ background: '#61dafb' }} />
            React
          </span>
          <span className="float-chip float-chip--2" aria-hidden="true">
            <span className="float-chip__dot" style={{ background: '#3178c6' }} />
            TypeScript
          </span>
          <span className="float-chip float-chip--3" aria-hidden="true">
            <span className="float-chip__dot" style={{ background: '#a259ff' }} />
            Figma
          </span>
        </Reveal>
      </div>
    </section>
  )
}

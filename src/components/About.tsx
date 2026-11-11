import { useLanguage } from '../i18n/context'
import { factIcons } from './iconMaps'
import { Reveal } from './Reveal'

export function About() {
  const { content } = useLanguage()
  const { facts, profile, ui } = content

  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{ui.aboutEyebrow}</span>
          <h2 className="section__title">{ui.aboutTitle}</h2>
          <p className="section__lead">{ui.aboutLead}</p>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text" delay={80}>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <div className="facts">
            {facts.map((fact, index) => {
              const Icon = factIcons[fact.icon]
              return (
                <Reveal as="article" className="fact" delay={120 + index * 80} key={fact.title}>
                  <span className="fact__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="fact__title">{fact.title}</h3>
                    <p className="fact__text">{fact.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useLanguage } from '../i18n/context'
import { Reveal } from './Reveal'

export function Experience() {
  const { content } = useLanguage()
  const { experience, ui } = content

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{ui.experienceEyebrow}</span>
          <h2 className="section__title">{ui.experienceTitle}</h2>
          <p className="section__lead">{ui.experienceLead}</p>
        </Reveal>

        <ol className="timeline">
          {experience.map((item, index) => (
            <Reveal as="li" className="timeline__item" delay={index * 90} key={item.period}>
              <div className="timeline__rail" aria-hidden="true">
                <span className="timeline__dot" />
              </div>

              <div className="timeline__body">
                <div className="timeline__top">
                  <h3 className="timeline__role">{item.role}</h3>
                  <span className="timeline__period">{item.period}</span>
                </div>
                <p className="timeline__company">{item.company}</p>
                <p className="timeline__summary">{item.summary}</p>

                <ul className="timeline__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <ul className="timeline__stack" aria-label={item.role}>
                  {item.stack.map((tool) => (
                    <li className="tag" key={tool}>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

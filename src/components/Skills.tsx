import { useLanguage } from '../i18n/context'
import { Reveal } from './Reveal'

export function Skills() {
  const { content } = useLanguage()
  const { skills, ui } = content

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{ui.skillsEyebrow}</span>
          <h2 className="section__title">{ui.skillsTitle}</h2>
          <p className="section__lead">{ui.skillsLead}</p>
        </Reveal>

        <div className="skills__grid">
          {skills.map((group, index) => (
            <Reveal as="article" className="skill-card" delay={index * 100} key={group.title}>
              <h3 className="skill-card__title">{group.title}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <li className="chip" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

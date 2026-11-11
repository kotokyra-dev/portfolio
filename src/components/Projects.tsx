import { useLanguage } from '../i18n/context'
import { ArrowUpRightIcon } from './icons'
import { Reveal } from './Reveal'

export function Projects() {
  const { content } = useLanguage()
  const { projects, ui } = content

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{ui.projectsEyebrow}</span>
          <h2 className="section__title">{ui.projectsTitle}</h2>
          <p className="section__lead">{ui.projectsLead}</p>
        </Reveal>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <Reveal as="article" className="project" delay={index * 80} key={project.title}>
              <div className={`project__thumb project__thumb--${project.tone}`} aria-hidden="true">
                <span className="project__num">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="project__body">
                <div className="project__top">
                  <h3 className="project__title">{project.title}</h3>
                  <span className="project__year">{project.year}</span>
                </div>
                <p className="project__text">{project.description}</p>

                <ul className="project__tags">
                  {project.tags.map((tag) => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="project__links">
                  <a className="link" href={project.links.demo}>
                    {ui.demo}
                    <ArrowUpRightIcon />
                  </a>
                  <a className="link" href={project.links.code}>
                    {ui.code}
                    <ArrowUpRightIcon />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

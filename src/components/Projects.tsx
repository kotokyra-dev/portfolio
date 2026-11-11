import { useState } from 'react'
import type { DemoId, ProjectCase } from '../content'
import { DemoModal } from '../demos/DemoModal'
import { useLanguage } from '../i18n/context'
import { CaseModal } from './CaseModal'
import { ArrowUpRightIcon, CaseIcon, PlayIcon } from './icons'
import { Reveal } from './Reveal'

function Preview({ demo }: { demo: DemoId | null }) {
  if (demo === 'orbit') {
    return (
      <div className="project__mock project__mock--orbit" aria-hidden="true">
        <div className="project__mock-bar">
          <i />
          <i />
          <i />
        </div>
        <svg className="project__mock-chart" viewBox="0 0 120 44" preserveAspectRatio="none">
          <path d="M2 37 20 29 38 33 56 19 74 24 92 11 118 6" />
        </svg>
        <div className="project__mock-row">
          <span />
          <span />
          <span />
        </div>
      </div>
    )
  }

  if (demo === 'store') {
    return (
      <div className="project__mock project__mock--store" aria-hidden="true">
        <div className="project__mock-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="project__mock-grid">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="project__mock-row">
          <span />
          <span />
        </div>
      </div>
    )
  }

  if (demo === 'fitness') {
    return (
      <div className="project__mock project__mock--fit" aria-hidden="true">
        <div className="project__mock-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="project__mock-fit">
          <span className="project__mock-ring" />
          <div className="project__mock-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project__mock project__mock--folio" aria-hidden="true">
      <div className="project__mock-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="project__mock-hero">
        <span className="project__mock-line project__mock-line--lg" />
        <span className="project__mock-line" />
        <span className="project__mock-line project__mock-line--sm" />
      </div>
      <div className="project__mock-row">
        <span />
        <span />
      </div>
    </div>
  )
}

export function Projects() {
  const { content } = useLanguage()
  const { projects, ui } = content
  const [demo, setDemo] = useState<DemoId | null>(null)
  const [caseStudy, setCaseStudy] = useState<{ title: string; data: ProjectCase } | null>(null)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">{ui.projectsEyebrow}</span>
          <h2 className="section__title">{ui.projectsTitle}</h2>
          <p className="section__lead">{ui.projectsLead}</p>
        </Reveal>

        <div className="projects__grid">
          {projects.map((project, index) => {
            const demoId = project.demoId
            return (
              <Reveal as="article" className="project" delay={index * 80} key={project.title}>
                <div className={`project__thumb project__thumb--${project.tone}`}>
                  <Preview demo={demoId} />
                  {demoId && (
                    <span className="project__badge">
                      <span className="project__badge-dot" aria-hidden="true" />
                      {ui.demo}
                    </span>
                  )}
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
                    <button
                      type="button"
                      className="link link--button"
                      onClick={() => setCaseStudy({ title: project.title, data: project.case })}
                    >
                      {ui.caseCta}
                      <CaseIcon />
                    </button>
                    {demoId ? (
                      <button
                        type="button"
                        className="link link--button"
                        onClick={() => setDemo(demoId)}
                      >
                        {ui.demo}
                        <PlayIcon />
                      </button>
                    ) : project.demoUrl ? (
                      <a
                        className="link"
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {ui.demo}
                        <ArrowUpRightIcon />
                      </a>
                    ) : null}
                    <a
                      className="link"
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ui.code}
                      <ArrowUpRightIcon />
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {demo && <DemoModal demo={demo} onClose={() => setDemo(null)} />}
      {caseStudy && (
        <CaseModal
          title={caseStudy.title}
          data={caseStudy.data}
          onClose={() => setCaseStudy(null)}
        />
      )}
    </section>
  )
}

import { useEffect, useRef } from 'react'
import type { ProjectCase } from '../content'
import { useLanguage } from '../i18n/context'
import { CloseIcon } from './icons'

type CaseModalProps = {
  title: string
  data: ProjectCase
  onClose: () => void
}

export function CaseModal({ title, data, onClose }: CaseModalProps) {
  const { content } = useLanguage()
  const { ui } = content
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="demo-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="demo-window case-window" role="dialog" aria-modal="true" aria-label={title}>
        <div className="demo-head">
          <div>
            <p className="demo-eyebrow">{ui.caseEyebrow}</p>
            <h2 className="demo-title">{title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label={ui.caseClose}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="demo-body case-body">
          <ul className="case-metrics">
            {data.metrics.map((metric) => (
              <li className="case-metric" key={metric.label}>
                <span className="case-metric__value">{metric.value}</span>
                <span className="case-metric__label">{metric.label}</span>
              </li>
            ))}
          </ul>

          <div className="case-block">
            <h3 className="case-block__title">{ui.caseChallenge}</h3>
            <p className="case-block__text">{data.challenge}</p>
          </div>

          <div className="case-block">
            <h3 className="case-block__title">{ui.caseSolution}</h3>
            <ul className="case-list">
              {data.solution.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="case-block case-block--result">
            <h3 className="case-block__title">{ui.caseResult}</h3>
            <p className="case-block__text">{data.result}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, type ComponentType } from 'react'
import { CloseIcon } from '../components/icons'
import type { DemoId } from '../content'
import { useLanguage } from '../i18n/context'
import { FitnessDemo } from './FitnessDemo'
import { OrbitDemo } from './OrbitDemo'
import { StoreDemo } from './StoreDemo'
import './demos.css'

const components: Record<DemoId, ComponentType> = {
  orbit: OrbitDemo,
  store: StoreDemo,
  fitness: FitnessDemo,
}

const titles: Record<DemoId, string> = {
  orbit: 'Orbit Dashboard',
  store: 'Nord Store',
  fitness: 'Pulse Fit',
}

type DemoModalProps = {
  demo: DemoId
  onClose: () => void
}

export function DemoModal({ demo, onClose }: DemoModalProps) {
  const { language } = useLanguage()
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

  const Demo = components[demo]

  return (
    <div
      className="demo-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="demo-window" role="dialog" aria-modal="true" aria-label={titles[demo]}>
        <div className="demo-head">
          <div>
            <p className="demo-eyebrow">{language === 'ru' ? 'Живое демо' : 'Live demo'}</p>
            <h2 className="demo-title">{titles[demo]}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label={language === 'ru' ? 'Закрыть демо' : 'Close demo'}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="demo-body">
          <Demo />
        </div>
      </div>
    </div>
  )
}

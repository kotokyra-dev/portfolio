import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/context'

const techs = [
  'React',
  'TypeScript',
  'Next.js',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Figma',
  'Storybook',
  'Accessibility',
  'Performance',
]

/** Радиус, в котором курсор «чувствует» элемент, px. */
const RADIUS = 190
/** Максимальное смещение элемента к курсору, px. */
const MAX_PULL = 12

function Track() {
  return (
    <ul className="marquee__list">
      {techs.map((tech) => (
        <li className="marquee__item" key={tech}>
          <span className="marquee__star" aria-hidden="true">
            ✦
          </span>
          {tech}
        </li>
      ))}
    </ul>
  )
}

export function TechMarquee() {
  const { content } = useLanguage()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reduceMotion = reduced.matches

    const items = Array.from(root.querySelectorAll<HTMLElement>('.marquee__item'))
    let frame = 0
    let pointerX = 0
    let active = false

    const reset = (item: HTMLElement) => {
      item.style.setProperty('--pull', '0px')
      item.style.setProperty('--glow', '0')
    }

    const apply = () => {
      frame = 0
      // Пока указатель вне строки — плавно возвращаем элементы на место.
      for (const item of items) {
        const rect = item.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const distance = Math.abs(pointerX - center)
        const strength = active ? Math.max(0, 1 - distance / RADIUS) : 0
        const pull = reduceMotion
          ? 0
          : Math.max(-MAX_PULL, Math.min(MAX_PULL, (pointerX - center) * 0.09 * strength))
        item.style.setProperty('--pull', `${pull.toFixed(2)}px`)
        item.style.setProperty('--glow', strength.toFixed(3))
      }
    }

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(apply)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointerX = event.clientX
      active = true
      schedule()
    }

    const onPointerLeave = () => {
      active = false
      pointerX = -9999
      schedule()
    }

    const onBlur = () => {
      active = false
      pointerX = -9999
      schedule()
    }

    root.addEventListener('pointermove', onPointerMove, { passive: true })
    root.addEventListener('pointerleave', onPointerLeave, { passive: true })
    window.addEventListener('blur', onBlur)

    return () => {
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('blur', onBlur)
      if (frame) window.cancelAnimationFrame(frame)
      items.forEach(reset)
    }
  }, [])

  return (
    <div className="marquee" aria-label={content.ui.marqueeLabel} ref={rootRef}>
      <div className="marquee__track">
        <Track />
        <div aria-hidden="true" className="marquee__clone">
          <Track />
        </div>
      </div>
    </div>
  )
}

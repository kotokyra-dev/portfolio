import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Задержка появления в миллисекундах. */
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'header'
}

/** Плавно показывает содержимое при попадании в область видимости. */
export function Reveal({ children, className = '', delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    // Если элемент уже в зоне видимости, показываем его сразу, не дожидаясь
    // наблюдателя: это спасает контент, когда страница отрисована без кадров
    // (например, вкладка в фоне).
    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      const timer = window.setTimeout(() => setVisible(true), 500)
      return () => {
        cancelAnimationFrame(frame)
        window.clearTimeout(timer)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const Tag = as as 'div'
  const style = { '--reveal-delay': `${delay}ms` } as CSSProperties

  return (
    <Tag ref={ref as never} className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  )
}

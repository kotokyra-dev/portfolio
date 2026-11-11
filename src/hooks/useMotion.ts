import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'
const STORAGE_KEY = 'motion'

function readForced() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

/**
 * Следит за системной настройкой «уменьшить движение» и позволяет
 * включить анимации вручную, даже если в ОС они отключены.
 */
export function useMotion() {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia(QUERY).matches,
  )
  const [forced, setForced] = useState(readForced)

  useEffect(() => {
    const query = window.matchMedia(QUERY)
    const onChange = (event: MediaQueryListEvent) => setSystemReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (forced) root.dataset.motion = 'on'
    else delete root.dataset.motion
  }, [forced])

  const toggleMotion = () => {
    setForced((current) => {
      const next = !current
      try {
        if (next) localStorage.setItem(STORAGE_KEY, 'on')
        else localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return { systemReduced, motionEnabled: !systemReduced || forced, toggleMotion }
}

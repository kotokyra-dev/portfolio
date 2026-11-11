import { useEffect, useState } from 'react'

/** Возвращает id секции, которая сейчас находится в центре экрана. */
export function useScrollSpy(ids: readonly string[], offset = 96, key?: string) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const handleScroll = () => {
      let current = elements[0].id
      for (const el of elements) {
        if (el.getBoundingClientRect().top - offset <= 0) current = el.id
      }
      setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [ids, offset, key])

  return active
}

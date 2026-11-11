import { useEffect, useMemo, useState } from 'react'
import type { Language } from './content'

export type Route =
  | { name: 'home' }
  | { name: 'blog' }
  | { name: 'post'; slug: string }
  | { name: 'notFound' }

const ROUTE_EVENT = 'portfolio:route'

/** Разбирает путь: /en — английская версия, /blog — заметки. */
export function parsePath(pathname: string): { language: Language; route: Route } {
  let path = pathname.replace(/\/+$/, '')
  let language: Language = 'ru'

  if (path === '/en' || path.startsWith('/en/')) {
    language = 'en'
    path = path.slice(3)
  }

  if (path === '' || path === '/') return { language, route: { name: 'home' } }
  if (path === '/blog') return { language, route: { name: 'blog' } }

  const post = /^\/blog\/([\w-]+)$/.exec(path)
  if (post) return { language, route: { name: 'post', slug: post[1] } }

  return { language, route: { name: 'notFound' } }
}

/** Собирает путь с учётом языка. */
export function buildPath(language: Language, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (language === 'ru') return clean
  return clean === '/' ? '/en' : `/en${clean}`
}

/** Текущий путь без языкового префикса — пригодится для переключателя. */
export function stripLanguage(pathname: string) {
  const path = pathname.replace(/\/+$/, '')
  if (path === '/en' || path === '') return '/'
  if (path.startsWith('/en/')) return path.slice(3)
  return path || '/'
}

export function navigate(path: string) {
  const current = `${window.location.pathname}${window.location.hash}`
  if (path === current) return

  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event(ROUTE_EVENT))

  const [, hash] = path.split('#')
  if (hash) {
    // Ждём кадр, чтобы React успел отрисовать нужную страницу.
    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}

export function useRoute() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', sync)
    window.addEventListener(ROUTE_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(ROUTE_EVENT, sync)
    }
  }, [])

  return useMemo(() => ({ ...parsePath(pathname), pathname }), [pathname])
}

/** Перехватывает внутренние ссылки, чтобы переходы шли без перезагрузки. */
export function useInternalLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/')) return

      const url = new URL(anchor.href, window.location.origin)
      if (url.origin !== window.location.origin) return

      event.preventDefault()
      navigate(`${url.pathname}${url.hash}`)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}

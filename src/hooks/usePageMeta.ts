import { useEffect } from 'react'
import { siteContent, type Language } from '../content'
import { buildPath, type Route } from '../router'

const ORIGIN = 'https://kotok.site'

function setMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value)
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`

  let element = document.head.querySelector<HTMLLinkElement>(selector)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    if (hreflang) element.hreflang = hreflang
    document.head.appendChild(element)
  }
  element.href = href
}

/** Обновляет title, description, canonical, Open Graph и hreflang под текущий маршрут. */
export function usePageMeta(language: Language, route: Route) {
  useEffect(() => {
    const content = siteContent[language]
    let title = content.meta.title
    let description = content.meta.description
    let path = '/'
    let type = 'website'

    if (route.name === 'blog') {
      title = `${content.blog.metaTitle} — ${content.profile.name}`
      description = content.blog.metaDescription
      path = '/blog'
    } else if (route.name === 'post') {
      const post = content.blog.posts.find((item) => item.slug === route.slug)
      path = `/blog/${route.slug}`
      type = 'article'
      if (post) {
        title = `${post.title} — ${content.profile.name}`
        description = post.excerpt
      } else {
        title = content.ui.notFoundTitle
      }
    } else if (route.name === 'notFound') {
      title = content.ui.notFoundTitle
      description = content.ui.notFoundText
      path = '/404'
    }

    const canonical = `${ORIGIN}${buildPath(language, path)}`

    document.documentElement.lang = language
    document.title = title

    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:type"]', type)
    setMeta('meta[property="og:url"]', canonical)
    setMeta('meta[property="og:locale"]', language === 'ru' ? 'ru_RU' : 'en_US')
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)

    setLink('canonical', canonical)
    setLink('alternate', `${ORIGIN}${buildPath('ru', path)}`, 'ru')
    setLink('alternate', `${ORIGIN}${buildPath('en', path)}`, 'en')
    setLink('alternate', `${ORIGIN}${buildPath('ru', path)}`, 'x-default')
  }, [language, route])
}

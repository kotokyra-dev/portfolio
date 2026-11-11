import { describe, expect, it } from 'vitest'
import { buildPath, parsePath, stripLanguage } from './router'

describe('parsePath', () => {
  it('treats the root as the Russian home page', () => {
    expect(parsePath('/')).toEqual({ language: 'ru', route: { name: 'home' } })
  })

  it('treats /en as the English home page', () => {
    expect(parsePath('/en')).toEqual({ language: 'en', route: { name: 'home' } })
    expect(parsePath('/en/')).toEqual({ language: 'en', route: { name: 'home' } })
  })

  it('parses the blog list in both languages', () => {
    expect(parsePath('/blog')).toEqual({ language: 'ru', route: { name: 'blog' } })
    expect(parsePath('/en/blog')).toEqual({ language: 'en', route: { name: 'blog' } })
    expect(parsePath('/en/blog/')).toEqual({ language: 'en', route: { name: 'blog' } })
  })

  it('parses a blog post slug', () => {
    expect(parsePath('/blog/demos-without-libraries')).toEqual({
      language: 'ru',
      route: { name: 'post', slug: 'demos-without-libraries' },
    })
    expect(parsePath('/en/blog/demos-without-libraries/')).toEqual({
      language: 'en',
      route: { name: 'post', slug: 'demos-without-libraries' },
    })
  })

  it('falls back to notFound for unknown paths', () => {
    expect(parsePath('/unknown').route).toEqual({ name: 'notFound' })
    expect(parsePath('/en/unknown').route).toEqual({ name: 'notFound' })
    expect(parsePath('/blog/too/deep').route).toEqual({ name: 'notFound' })
  })
})

describe('buildPath', () => {
  it('keeps Russian paths as-is', () => {
    expect(buildPath('ru', '/')).toBe('/')
    expect(buildPath('ru', '/blog')).toBe('/blog')
    expect(buildPath('ru', 'blog/slug')).toBe('/blog/slug')
  })

  it('prefixes English paths with /en', () => {
    expect(buildPath('en', '/')).toBe('/en')
    expect(buildPath('en', '/blog')).toBe('/en/blog')
    expect(buildPath('en', 'blog/slug')).toBe('/en/blog/slug')
  })
})

describe('stripLanguage', () => {
  it('removes the English prefix', () => {
    expect(stripLanguage('/en')).toBe('/')
    expect(stripLanguage('/en/')).toBe('/')
    expect(stripLanguage('/en/blog')).toBe('/blog')
    expect(stripLanguage('/en/blog/slug')).toBe('/blog/slug')
  })

  it('keeps Russian paths untouched', () => {
    expect(stripLanguage('/')).toBe('/')
    expect(stripLanguage('/blog')).toBe('/blog')
  })
})

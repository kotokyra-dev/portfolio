import { describe, expect, it } from 'vitest'
import { sectionIds, siteContent, type Language } from './content'

const languages: Language[] = ['ru', 'en']

function shapeKeys(value: object): string[] {
  return Object.keys(value).sort()
}

describe('siteContent', () => {
  it('has the same top-level sections in both languages', () => {
    expect(shapeKeys(siteContent.ru)).toEqual(shapeKeys(siteContent.en))
  })

  it('keeps the UI strings in sync between RU and EN', () => {
    expect(shapeKeys(siteContent.ru.ui)).toEqual(shapeKeys(siteContent.en.ui))
  })

  it('does not leave UI strings empty', () => {
    for (const language of languages) {
      for (const [key, value] of Object.entries(siteContent[language].ui)) {
        expect(value.trim(), `${language}.ui.${key}`).not.toBe('')
      }
    }
  })

  it('links every section and the blog from the nav', () => {
    for (const language of languages) {
      const ids = siteContent[language].nav.map((item) => item.id)

      expect(new Set(ids).size, `${language} nav has duplicates`).toBe(ids.length)
      for (const id of sectionIds) expect(ids).toContain(id)
      expect(ids).toContain('blog')
    }
  })

  it('gives every project a complete case study', () => {
    for (const language of languages) {
      expect(siteContent[language].projects.length).toBeGreaterThan(0)

      for (const project of siteContent[language].projects) {
        expect(project.title.trim(), `${language} project title`).not.toBe('')
        expect(project.tags.length).toBeGreaterThan(0)
        expect(project.case.challenge.trim()).not.toBe('')
        expect(project.case.solution.length).toBeGreaterThan(0)
        expect(project.case.result.trim()).not.toBe('')
        expect(project.case.metrics.length).toBe(3)
      }
    }
  })

  it('keeps the same projects in both languages', () => {
    expect(siteContent.ru.projects.map((project) => project.title)).toEqual(
      siteContent.en.projects.map((project) => project.title),
    )
  })

  it('describes the same experience timeline in both languages', () => {
    const ru = siteContent.ru.experience
    const en = siteContent.en.experience

    expect(ru.length).toBeGreaterThan(0)
    expect(en.length).toBe(ru.length)
    expect(en.map((item) => item.period.match(/\d{4}/)?.[0])).toEqual(
      ru.map((item) => item.period.match(/\d{4}/)?.[0]),
    )

    for (const language of languages) {
      for (const item of siteContent[language].experience) {
        expect(item.role.trim()).not.toBe('')
        expect(item.company.trim()).not.toBe('')
        expect(item.summary.trim()).not.toBe('')
        expect(item.points.length).toBeGreaterThan(0)
        expect(item.stack.length).toBeGreaterThan(0)
      }
    }
  })

  it('keeps testimonials complete and in sync', () => {
    const ru = siteContent.ru.testimonials
    const en = siteContent.en.testimonials

    expect(ru.length).toBeGreaterThan(0)
    expect(en.length).toBe(ru.length)

    for (const language of languages) {
      for (const item of siteContent[language].testimonials) {
        expect(item.quote.trim()).not.toBe('')
        expect(item.name.trim()).not.toBe('')
        expect(item.role.trim()).not.toBe('')
        expect(item.initials.trim()).not.toBe('')
      }
    }
  })

  it('publishes the same blog posts in both languages', () => {
    const ru = siteContent.ru.blog.posts
    const en = siteContent.en.blog.posts

    expect(ru.length).toBeGreaterThan(0)
    expect(en.map((post) => post.slug)).toEqual(ru.map((post) => post.slug))
    expect(new Set(ru.map((post) => post.slug)).size).toBe(ru.length)

    for (const language of languages) {
      for (const post of siteContent[language].blog.posts) {
        expect(post.slug).toMatch(/^[a-z0-9-]+$/)
        expect(post.title.trim()).not.toBe('')
        expect(post.excerpt.trim()).not.toBe('')
        expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(post.blocks.length).toBeGreaterThan(0)
      }
    }
  })

  it('uses a real email and telegram link', () => {
    for (const language of languages) {
      const { profile } = siteContent[language]
      expect(profile.email).toContain('@')
      expect(profile.telegram.startsWith('https://t.me/')).toBe(true)
    }
  })
})

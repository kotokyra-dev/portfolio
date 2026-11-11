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

  it('exposes a nav entry for every section id', () => {
    for (const language of languages) {
      const ids = siteContent[language].nav.map((item) => item.id)
      expect(ids).toEqual([...sectionIds])
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

  it('uses a real email and telegram link', () => {
    for (const language of languages) {
      const { profile } = siteContent[language]
      expect(profile.email).toContain('@')
      expect(profile.telegram.startsWith('https://t.me/')).toBe(true)
    }
  })
})

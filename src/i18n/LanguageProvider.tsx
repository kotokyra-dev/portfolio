import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { siteContent, type Language } from '../content'
import { LanguageContext } from './context'

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'ru' || saved === 'en') return saved
  } catch {
    /* localStorage может быть недоступен */
  }
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    const content = siteContent[language]

    document.documentElement.lang = language
    document.title = content.meta.title

    const setMeta = (selector: string, value: string) => {
      document.querySelector(selector)?.setAttribute('content', value)
    }

    setMeta('meta[name="description"]', content.meta.description)
    setMeta('meta[property="og:title"]', content.meta.title)
    setMeta('meta[property="og:description"]', content.meta.description)
    setMeta('meta[property="og:locale"]', language === 'ru' ? 'ru_RU' : 'en_US')
    setMeta('meta[name="twitter:title"]', content.meta.title)
    setMeta('meta[name="twitter:description"]', content.meta.description)

    try {
      localStorage.setItem('lang', language)
    } catch {
      /* игнорируем */
    }
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
  }, [])

  const value = useMemo(
    () => ({ language, content: siteContent[language], setLanguage }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

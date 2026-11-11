import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { siteContent, type Language } from '../content'
import { buildPath, navigate, stripLanguage, useRoute } from '../router'
import { LanguageContext } from './context'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, pathname } = useRoute()

  useEffect(() => {
    document.documentElement.lang = language

    try {
      localStorage.setItem('lang', language)
    } catch {
      /* localStorage может быть недоступен */
    }
  }, [language])

  const setLanguage = useCallback(
    (next: Language) => {
      navigate(buildPath(next, stripLanguage(pathname)))
    },
    [pathname],
  )

  const value = useMemo(
    () => ({ language, content: siteContent[language], setLanguage }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

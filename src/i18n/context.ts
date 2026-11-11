import { createContext, useContext } from 'react'
import type { Language, SiteContent } from '../content'

export type LanguageContextValue = {
  language: Language
  content: SiteContent
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage должен вызываться внутри LanguageProvider')
  }
  return context
}

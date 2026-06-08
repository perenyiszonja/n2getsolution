import { createContext, useContext, useState, type ReactNode } from 'react'
import { translations, type Language } from './translations'

type Translations = typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('2gs-lang')
    if (saved && (saved === 'en' || saved === 'hu' || saved === 'de')) return saved
    const browserLang = navigator.language.slice(0, 2)
    if (browserLang === 'hu') return 'hu'
    if (browserLang === 'de') return 'de'
    return 'en'
  })

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('2gs-lang', lang)
  }

  const t = translations[language] as unknown as Translations

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}

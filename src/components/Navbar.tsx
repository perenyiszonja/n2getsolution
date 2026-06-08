import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { Language } from '../i18n/translations'
import { Menu, X } from 'lucide-react'

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hu', label: 'HU' },
  { code: 'de', label: 'DE' },
]

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.howWeWork, href: '#how-we-work' },
    { label: t.nav.careers, href: '#careers' },
    { label: t.nav.blog, href: '#blog' },
  ]

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    const sectionId = href.replace('#', '')
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = ''
      setTimeout(() => {
        const target = document.getElementById(sectionId)
        target?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (window.location.hash.startsWith('#blog/')) {
              window.location.hash = ''
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="text-xl font-bold text-text-primary tracking-tight"
        >
          2Get<span className="text-accent">Solution</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}

          <div className="flex items-center gap-1 ml-4 bg-surface-light rounded-full px-1 py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  language === lang.code
                    ? 'bg-accent text-white'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-secondary"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface border-t border-black/5 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="block text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setMobileOpen(false) }}
                className={`text-xs px-3 py-1 rounded-full ${
                  language === lang.code
                    ? 'bg-accent text-white'
                    : 'text-text-muted border border-black/10'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

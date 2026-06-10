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
    { label: t.nav.about, href: '#about' },
    { label: t.nav.howWeWork, href: '#how-we-work' },
    { label: t.nav.blog, href: '#blog' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.careers, href: '#careers' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            if (window.location.hash.startsWith('#blog/')) {
              window.location.hash = ''
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img src={`${import.meta.env.BASE_URL}logo_vegleges.png`} alt="2GetSolution" className="h-[68px] mix-blend-screen" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}

          <div className="flex items-center gap-1 ml-4 bg-white/10 rounded-full px-1 py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  language === lang.code
                    ? 'bg-accent text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <a
            href="https://www.linkedin.com/company/2getsolution/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-200 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-300"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a1a]/95 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="block text-gray-300 hover:text-white transition-colors"
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
                    : 'text-gray-400 border border-white/20'
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

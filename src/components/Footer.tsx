import { useLanguage } from '../i18n/LanguageContext'

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 px-6 border-t border-black/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xl font-bold text-text-primary tracking-tight">
              2Get<span className="text-accent">Solution</span>
            </span>
            <p className="mt-2 text-sm text-text-muted">{t.footer.tagline}</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
              {t.footer.imprint}
            </a>
            <a
              href="https://www.linkedin.com/company/2getsolution"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}

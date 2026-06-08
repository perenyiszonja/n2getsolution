import { useLanguage } from '../i18n/LanguageContext'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          <span className="text-text-primary">{t.hero.title}</span>
          <br />
          <span className="text-accent">{t.hero.subtitle}</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-text-muted">
          <span className="text-sm font-medium">{t.hero.tagline}</span>
          <span className="hidden sm:inline text-accent">+</span>
          <span className="text-sm font-medium text-accent">{t.hero.tagline2}</span>
        </div>

        <div className="mt-12">
          <button
            onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors cursor-pointer"
          >
            {t.hero.cta}
            <ArrowRight size={20} />
          </button>
          <p className="mt-4 text-sm text-text-muted">{t.hero.ctaSub}</p>
        </div>
      </div>
    </section>
  )
}

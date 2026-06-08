import { useLanguage } from '../i18n/LanguageContext'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

export function Careers() {
  const { t } = useLanguage()

  return (
    <section id="careers" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            {t.careers.title}
          </h2>
          <p className="mt-4 text-2xl md:text-3xl font-light text-accent">
            {t.careers.hero}
          </p>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            {t.careers.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-6">{t.careers.whoTitle}</h3>
            <p className="text-sm text-text-secondary mb-4">{t.careers.whoIntro}</p>
            <ul className="space-y-3">
              {t.careers.whoItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-6">{t.careers.whatTitle}</h3>
            <ul className="space-y-4">
              {t.careers.whatItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Sparkles size={16} className="text-accent-warm mt-0.5 flex-shrink-0" />
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 rounded-lg bg-surface-light/50 border border-black/5">
              <h4 className="text-sm font-semibold text-text-primary mb-2">{t.careers.focusTitle}</h4>
              <p className="text-sm text-text-secondary">{t.careers.focusDescription}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-xl border border-black/5 bg-surface-light/30">
          <h3 className="text-xl font-semibold text-text-primary text-center mb-6">
            {t.careers.processTitle}
          </h3>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 md:gap-8">
            {t.careers.processSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <span className="text-sm text-text-secondary">{step}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-text-muted">{t.careers.processFooter}</p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-text-secondary mb-4">{t.careers.finalCta}</p>
          <button
            onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors cursor-pointer"
          >
            {t.careers.finalCtaButton}
            <ArrowRight size={18} />
          </button>
          <p className="mt-3 text-sm text-text-muted">{t.careers.ctaSub}</p>
        </div>
      </div>
    </section>
  )
}

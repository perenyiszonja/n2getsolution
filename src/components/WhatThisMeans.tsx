import { useLanguage } from '../i18n/LanguageContext'
import { CheckCircle } from 'lucide-react'

export function WhatThisMeans() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
          {t.whatThisMeans.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
          {t.whatThisMeans.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle size={18} className="text-accent flex-shrink-0" />
              <span className="text-text-secondary">{item}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg font-semibold text-accent">
          {t.whatThisMeans.footer}
        </p>
      </div>
    </section>
  )
}

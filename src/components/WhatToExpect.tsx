import { useLanguage } from '../i18n/LanguageContext'

export function WhatToExpect() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
          {t.whatToExpect.title}
        </h2>
        <p className="mt-6 text-lg text-text-secondary leading-relaxed">
          {t.whatToExpect.description}
        </p>
      </div>
    </section>
  )
}

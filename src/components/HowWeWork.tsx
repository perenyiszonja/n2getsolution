import { useLanguage } from '../i18n/LanguageContext'
import { Search, LayoutGrid, Hammer, Rocket } from 'lucide-react'

const icons = [Search, LayoutGrid, Hammer, Rocket]

export function HowWeWork() {
  const { t } = useLanguage()

  return (
    <section id="how-we-work" className="py-24 px-6 bg-primary/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
          {t.howWeWork.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.howWeWork.steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <div key={i} className="relative">
                <div className="mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon size={20} className="text-accent" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>

        <p className="mt-12 text-center text-text-muted font-medium italic">
          {t.howWeWork.footer}
        </p>
      </div>
    </section>
  )
}

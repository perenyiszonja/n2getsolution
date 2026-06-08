import { useLanguage } from '../i18n/LanguageContext'
import { MessageSquare, Users, Server, Shield } from 'lucide-react'

export function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: MessageSquare,
      title: t.services.advisory.title,
      subtitle: t.services.advisory.subtitle,
      description: t.services.advisory.description,
    },
    {
      icon: Users,
      title: t.services.expertise.title,
      subtitle: t.services.expertise.subtitle,
      description: t.services.expertise.description,
    },
    {
      icon: Server,
      title: t.services.architecture.title,
      subtitle: t.services.architecture.subtitle,
      description: t.services.architecture.description,
    },
    {
      icon: Shield,
      title: t.services.security.title,
      subtitle: t.services.security.subtitle,
      description: t.services.security.description,
    },
  ]

  return (
    <section id="services" className="py-24 px-6 bg-primary/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
          {t.services.title}
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={i}
                className="group p-6 rounded-xl border border-black/5 bg-surface-light/50 hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{service.title}</h3>
                <p className="mt-1 text-sm font-medium text-accent/80">{service.subtitle}</p>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 p-8 rounded-xl border border-accent/10 bg-accent/5">
          <p className="text-center text-lg font-semibold text-accent mb-4">
            {t.services.advisory.playground}
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {t.services.advisory.cases.map((c, i) => (
              <p key={i} className="text-text-secondary italic text-sm pl-4 border-l-2 border-accent/30">
                "{c}"
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm text-text-secondary text-center leading-relaxed">
            {t.services.advisory.detail}
          </p>
        </div>
      </div>
    </section>
  )
}

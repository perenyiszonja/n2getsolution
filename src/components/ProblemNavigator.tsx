import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { MessageSquare, Users, Server, Shield, ArrowRight } from 'lucide-react'

interface Challenge {
  icon: typeof MessageSquare
  label: { en: string; hu: string; de: string }
  answer: { en: string; hu: string; de: string }
  service: { en: string; hu: string; de: string }
}

const challenges: Challenge[] = [
  {
    icon: MessageSquare,
    label: {
      en: "I have a business problem but don't know what tech I need",
      hu: 'Van egy üzleti problémám, de nem tudom, milyen technológia kell hozzá',
      de: 'Ich habe ein Geschäftsproblem, weiß aber nicht welche Technologie ich brauche',
    },
    answer: {
      en: 'We start with your business challenge — not with technology. In a free consultation, we map your problem and recommend the most effective path forward. No jargon, no premature solutions.',
      hu: 'Az üzleti kihívásodból indulunk ki — nem a technológiából. Egy ingyenes konzultáción feltérképezzük a problémát és ajánljuk a leghatékonyabb utat. Szakzsargon és elhamarkodott megoldások nélkül.',
      de: 'Wir starten mit Ihrer geschäftlichen Herausforderung — nicht mit Technologie. In einer kostenlosen Beratung kartieren wir Ihr Problem und empfehlen den effektivsten Weg. Ohne Fachjargon, ohne voreilige Lösungen.',
    },
    service: {
      en: 'Trusted Business Advisory',
      hu: 'Megbízható üzleti tanácsadás',
      de: 'Vertrauenswürdige Unternehmensberatung',
    },
  },
  {
    icon: Users,
    label: {
      en: 'I need experts but struggle to find or assess the right ones',
      hu: 'Szakértőkre van szükségem, de nehezen találom vagy mérem fel a megfelelőket',
      de: 'Ich brauche Experten, kann aber die richtigen schwer finden oder bewerten',
    },
    answer: {
      en: "We source, assess and embed professionals who take real ownership. Not just CVs — we deliver people who fit your business reality and take accountability for results.",
      hu: 'Megkeressük, felmérjük és beágyazzuk azokat a szakembereket, akik valódi felelősséget vállalnak. Nem csak önéletrajzokat szállítunk — olyan embereket, akik illeszkednek az üzleti valóságodhoz.',
      de: 'Wir finden, bewerten und integrieren Fachkräfte die echte Verantwortung übernehmen. Nicht nur CVs — wir liefern Menschen die zu Ihrer Geschäftsrealität passen.',
    },
    service: {
      en: 'Embedded Expertise',
      hu: 'Beágyazott szakértelem',
      de: 'Eingebettete Expertise',
    },
  },
  {
    icon: Server,
    label: {
      en: 'My systems are growing but stability and scalability worry me',
      hu: 'A rendszereim növekednek, de aggaszt a stabilitás és skálázhatóság',
      de: 'Meine Systeme wachsen, aber Stabilität und Skalierbarkeit bereiten mir Sorgen',
    },
    answer: {
      en: 'We assess your current landscape, design scalable architecture, and take long-term ownership of operations. Not a one-time audit — ongoing responsibility for your IT stability.',
      hu: 'Felmérjük a jelenlegi környezetet, skálázható architektúrát tervezünk, és hosszú távú felelősséget vállalunk az üzemeltetésért. Nem egyszeri audit — folyamatos felelősség az IT stabilitásodért.',
      de: 'Wir bewerten Ihre aktuelle Landschaft, entwerfen skalierbare Architektur und übernehmen langfristige Verantwortung für den Betrieb. Kein einmaliges Audit — laufende Verantwortung.',
    },
    service: {
      en: 'IT Architecture & Operations',
      hu: 'IT architektúra és üzemeltetés',
      de: 'IT-Architektur & Betrieb',
    },
  },
  {
    icon: Shield,
    label: {
      en: "I'm not sure if my company is secure enough",
      hu: 'Nem vagyok biztos benne, hogy a cégem eléggé biztonságos',
      de: 'Ich bin nicht sicher ob mein Unternehmen sicher genug ist',
    },
    answer: {
      en: "Most mid-size companies have gaps they don't know about. We run a practical security assessment and deliver a prioritized action plan — not a 200-page report nobody reads.",
      hu: 'A legtöbb közepes méretű cégnek vannak ismeretlen résekei. Gyakorlati biztonsági felmérést végzünk és priorizált cselekvési tervet adunk — nem 200 oldalas riportot, amit senki nem olvas.',
      de: 'Die meisten mittelständischen Unternehmen haben Lücken die sie nicht kennen. Wir führen ein praktisches Security-Assessment durch und liefern einen priorisierten Aktionsplan.',
    },
    service: {
      en: 'Security & Risk Assurance',
      hu: 'Biztonság és kockázatkezelés',
      de: 'Sicherheit & Risiko-Assurance',
    },
  },
]

const sectionTitle = {
  en: 'What brings you here?',
  hu: 'Mi hozott ide?',
  de: 'Was führt Sie her?',
}

const clickPrompt = {
  en: 'Click what resonates with you',
  hu: 'Kattints arra, ami rád illik',
  de: 'Klicken Sie was auf Sie zutrifft',
}

const ourAnswer = {
  en: 'Our approach:',
  hu: 'A mi megközelítésünk:',
  de: 'Unser Ansatz:',
}

const talkCta = {
  en: "Let's talk about this",
  hu: 'Beszéljünk erről',
  de: 'Sprechen wir darüber',
}

export function ProblemNavigator() {
  const { language } = useLanguage()
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
          {sectionTitle[language]}
        </h2>
        <p className="mt-3 text-center text-text-muted text-sm">
          {clickPrompt[language]}
        </p>

        <div className="mt-12 space-y-3">
          {challenges.map((challenge, i) => {
            const Icon = challenge.icon
            const isActive = active === i
            return (
              <div key={i}>
                <button
                  onClick={() => setActive(isActive ? null : i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-accent/40 bg-accent/5 shadow-sm'
                      : 'border-black/5 bg-surface-light/30 hover:border-accent/20 hover:bg-surface-light/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? 'bg-accent/20' : 'bg-accent/10'
                    }`}>
                      <Icon size={20} className="text-accent" />
                    </div>
                    <span className={`font-medium transition-colors ${
                      isActive ? 'text-text-primary' : 'text-text-secondary'
                    }`}>
                      {challenge.label[language]}
                    </span>
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-5 ml-14 rounded-lg bg-surface-light/50">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                      {ourAnswer[language]}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {challenge.answer[language]}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-text-muted">
                        → {challenge.service[language]}
                      </span>
                      <button
                        onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
                        className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors cursor-pointer"
                      >
                        {talkCta[language]}
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

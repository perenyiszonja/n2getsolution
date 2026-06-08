import { useState, type FormEvent } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { RotateCcw, Send, CheckCircle } from 'lucide-react'

interface Question {
  question: { en: string; hu: string; de: string }
  options: { label: { en: string; hu: string; de: string }; points: Record<string, number> }[]
}

const questions: Question[] = [
  {
    question: {
      en: 'What is your biggest challenge right now?',
      hu: 'Mi a legnagyobb kihívásod jelenleg?',
      de: 'Was ist Ihre größte Herausforderung gerade?',
    },
    options: [
      {
        label: { en: 'I need clarity on direction', hu: 'Tisztább irányt szeretnék', de: 'Ich brauche Klarheit über die Richtung' },
        points: { advisory: 3, architecture: 1 },
      },
      {
        label: { en: 'I need the right people', hu: 'A megfelelő emberekre van szükségem', de: 'Ich brauche die richtigen Leute' },
        points: { expertise: 3, advisory: 1 },
      },
      {
        label: { en: 'My systems need to grow with me', hu: 'A rendszereimnek velem kell nőniük', de: 'Meine Systeme müssen mit mir wachsen' },
        points: { architecture: 3, security: 1 },
      },
      {
        label: { en: "I'm worried about risks and compliance", hu: 'Aggódom a kockázatok és megfelelőség miatt', de: 'Ich mache mir Sorgen um Risiken und Compliance' },
        points: { security: 3, advisory: 1 },
      },
    ],
  },
  {
    question: {
      en: 'How would you describe your in-house IT capacity?',
      hu: 'Hogyan jellemeznéd a házon belüli IT kapacitásotokat?',
      de: 'Wie würden Sie Ihre interne IT-Kapazität beschreiben?',
    },
    options: [
      {
        label: { en: 'We have no dedicated IT team', hu: 'Nincs dedikált IT csapatunk', de: 'Wir haben kein dediziertes IT-Team' },
        points: { advisory: 2, expertise: 3 },
      },
      {
        label: { en: 'Small team, overwhelmed', hu: 'Kis csapat, túlterhelt', de: 'Kleines Team, überlastet' },
        points: { expertise: 2, architecture: 2 },
      },
      {
        label: { en: 'Capable team, needs strategic support', hu: 'Képes csapat, stratégiai támogatásra van szüksége', de: 'Fähiges Team, braucht strategische Unterstützung' },
        points: { advisory: 3, architecture: 1 },
      },
      {
        label: { en: 'Strong team, specific gaps to fill', hu: 'Erős csapat, specifikus hiányosságok pótlása szükséges', de: 'Starkes Team, spezifische Lücken zu füllen' },
        points: { expertise: 3, security: 1 },
      },
    ],
  },
  {
    question: {
      en: 'What does success look like for you in the next 6 months?',
      hu: 'Milyen lenne számodra a siker a következő 6 hónapban?',
      de: 'Wie sieht Erfolg für Sie in den nächsten 6 Monaten aus?',
    },
    options: [
      {
        label: { en: 'Clear roadmap and confident decisions', hu: 'Világos útiterv és magabiztos döntések', de: 'Klare Roadmap und sichere Entscheidungen' },
        points: { advisory: 3 },
      },
      {
        label: { en: 'Reliable team delivering results', hu: 'Megbízható csapat, ami eredményeket szállít', de: 'Zuverlässiges Team das Ergebnisse liefert' },
        points: { expertise: 3 },
      },
      {
        label: { en: 'Stable, scalable infrastructure', hu: 'Stabil, skálázható infrastruktúra', de: 'Stabile, skalierbare Infrastruktur' },
        points: { architecture: 3 },
      },
      {
        label: { en: 'Peace of mind about security and compliance', hu: 'Nyugalom a biztonság és megfelelőség terén', de: 'Sicherheit bezüglich Security und Compliance' },
        points: { security: 3 },
      },
    ],
  },
]

interface Result {
  key: string
  title: { en: string; hu: string; de: string }
  recommendation: { en: string; hu: string; de: string }
}

const results: Result[] = [
  {
    key: 'advisory',
    title: { en: 'Strategic Advisory', hu: 'Stratégiai tanácsadás', de: 'Strategische Beratung' },
    recommendation: {
      en: "You'd benefit most from a structured strategic conversation. We help you map the landscape, weigh options, and decide with confidence — before spending on technology.",
      hu: 'Neked egy strukturált stratégiai beszélgetésre van szükséged. Segítünk feltérképezni a terepet, mérlegelni az opciókat és magabiztosan dönteni — mielőtt technológiára költenél.',
      de: 'Sie würden am meisten von einem strukturierten strategischen Gespräch profitieren. Wir helfen die Landschaft zu kartieren, Optionen abzuwägen und sicher zu entscheiden.',
    },
  },
  {
    key: 'expertise',
    title: { en: 'Embedded Expertise', hu: 'Beágyazott szakértelem', de: 'Eingebettete Expertise' },
    recommendation: {
      en: "Your biggest lever is the right people with the right responsibility. We don't just source talent — we embed professionals who own outcomes alongside your team.",
      hu: 'A legnagyobb emelőd a megfelelő emberek a megfelelő felelősséggel. Nem csak tehetségeket keresünk — olyan szakembereket ágyazunk be, akik eredményekért felelnek a csapatoddal együtt.',
      de: 'Ihr größter Hebel sind die richtigen Leute mit der richtigen Verantwortung. Wir vermitteln nicht nur Talent — wir integrieren Fachkräfte die Ergebnisse verantworten.',
    },
  },
  {
    key: 'architecture',
    title: { en: 'Architecture & Operations', hu: 'Architektúra és üzemeltetés', de: 'Architektur & Betrieb' },
    recommendation: {
      en: "Your infrastructure needs to match your ambition. We assess where you are, design where you need to be, and take responsibility for getting you there — and keeping it running.",
      hu: 'Az infrastruktúrádnak lépést kell tartania az ambíciókkal. Felmérjük hol tartasz, megtervezzük hova kell eljutnod, és felelősséget vállalunk, hogy odajuss — és ott is maradj.',
      de: 'Ihre Infrastruktur muss zu Ihren Ambitionen passen. Wir bewerten wo Sie stehen, entwerfen wohin Sie müssen, und übernehmen Verantwortung für den Weg dorthin.',
    },
  },
  {
    key: 'security',
    title: { en: 'Security & Risk', hu: 'Biztonság és kockázat', de: 'Sicherheit & Risiko' },
    recommendation: {
      en: "You need visibility and control over your risk landscape. We deliver practical security assessments and action plans — not theoretical frameworks that collect dust.",
      hu: 'Rálátásra és kontrollra van szükséged a kockázati környezetedben. Gyakorlati biztonsági felméréseket és cselekvési terveket szállítunk — nem elméleti kereteket, amelyek port gyűjtenek.',
      de: 'Sie brauchen Sichtbarkeit und Kontrolle über Ihre Risikolandschaft. Wir liefern praktische Security-Assessments und Aktionspläne — keine theoretischen Frameworks.',
    },
  },
]

const quizTitle = {
  en: 'Quick Diagnostic',
  hu: 'Gyors diagnosztika',
  de: 'Schnelle Diagnostik',
}

const quizSubtitle = {
  en: '3 questions. Personalized recommendation. 30 seconds.',
  hu: '3 kérdés. Személyre szabott ajánlás. 30 másodperc.',
  de: '3 Fragen. Persönliche Empfehlung. 30 Sekunden.',
}

const yourResult = {
  en: 'Based on your answers, we recommend:',
  hu: 'A válaszaid alapján ezt javasoljuk:',
  de: 'Basierend auf Ihren Antworten empfehlen wir:',
}

const startConversation = {
  en: 'Send message',
  hu: 'Üzenet küldése',
  de: 'Nachricht senden',
}

const tryAgain = {
  en: 'Try again',
  hu: 'Újra',
  de: 'Nochmal',
}

const formLabels = {
  name: { en: 'Your name', hu: 'Neved', de: 'Ihr Name' },
  company: { en: 'Company', hu: 'Cégnév', de: 'Unternehmen' },
  phone: { en: 'Phone number', hu: 'Telefonszám', de: 'Telefonnummer' },
  email: { en: 'Email address', hu: 'E-mail cím', de: 'E-Mail-Adresse' },
  message: { en: 'Anything else you want to share? (optional)', hu: 'Szeretnél még valamit megosztani? (opcionális)', de: 'Möchten Sie noch etwas teilen? (optional)' },
  prefilledNote: { en: 'We already know what you need — just tell us how to reach you.', hu: 'Már tudjuk, mire van szükséged — csak mondd el, hogyan érhetünk el.', de: 'Wir wissen bereits was Sie brauchen — sagen Sie uns nur wie wir Sie erreichen.' },
  sent: { en: 'Message sent! We will get back to you shortly.', hu: 'Üzenet elküldve! Hamarosan felvesszük a kapcsolatot.', de: 'Nachricht gesendet! Wir melden uns in Kürze.' },
  topic: { en: 'Topic', hu: 'Téma', de: 'Thema' },
}

export function DiagnosticQuiz() {
  const { language } = useLanguage()
  const [currentQ, setCurrentQ] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [done, setDone] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formName, setFormName] = useState('')
  const [formCompany, setFormCompany] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formMessage, setFormMessage] = useState('')

  const handleAnswer = (points: Record<string, number>) => {
    const newScores = { ...scores }
    Object.entries(points).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val
    })
    setScores(newScores)

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setDone(true)
    }
  }

  const reset = () => {
    setCurrentQ(0)
    setScores({})
    setDone(false)
    setSubmitted(false)
    setFormName('')
    setFormCompany('')
    setFormEmail('')
    setFormPhone('')
    setFormMessage('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = {
      access_key: 'fdfe1e6c-f1aa-4ed2-9595-903797325494',
      botcheck: '',
      subject: `[2GetSolution] ${result.title[language]}`,
      name: formName,
      company: formCompany,
      email: formEmail,
      phone: formPhone,
      topic: result.title[language],
      recommendation: result.recommendation[language],
      message: formMessage || '-',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      const subject = `[2GetSolution] ${result.title[language]}`
      const body = [
        `Name: ${formName}`,
        `Company: ${formCompany}`,
        `Email: ${formEmail}`,
        `Phone: ${formPhone}`,
        `Topic: ${result.title[language]}`,
        ``,
        formMessage || '',
      ].filter(Boolean).join('\n')
      window.open(`mailto:info@2getsolution.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
      setSubmitted(true)
    }
  }

  const getResult = () => {
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a)
    const topKey = sorted[0]?.[0] || 'advisory'
    return results.find((r) => r.key === topKey) || results[0]
  }

  const result = getResult()
  const progress = done ? 100 : (currentQ / questions.length) * 100

  return (
    <section id="diagnostic" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            {quizTitle[language]}
          </h2>
          <p className="mt-3 text-text-muted text-sm">
            {quizSubtitle[language]}
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-black/5 bg-surface-light/40">
          <div className="h-1 rounded-full bg-black/5 mb-8 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!done ? (
            <div>
              <p className="text-lg font-semibold text-text-primary mb-6">
                {questions[currentQ].question[language]}
              </p>
              <div className="space-y-3">
                {questions[currentQ].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option.points)}
                    className="w-full text-left p-4 rounded-xl border border-black/5 bg-surface hover:border-accent/30 hover:bg-accent/5 transition-all text-sm text-text-secondary hover:text-text-primary"
                  >
                    {option.label[language]}
                  </button>
                ))}
              </div>
            </div>
          ) : submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-accent mx-auto mb-4" />
              <p className="text-lg font-semibold text-text-primary mb-2">
                {formLabels.sent[language]}
              </p>
              <button
                onClick={reset}
                className="mt-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                <RotateCcw size={14} />
                {tryAgain[language]}
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <p className="text-sm text-text-muted mb-2">{yourResult[language]}</p>
                <h3 className="text-2xl font-bold text-accent mb-2">
                  {result.title[language]}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {result.recommendation[language]}
                </p>
              </div>

              <div className="border-t border-black/5 pt-6 mt-6">
                <p className="text-sm text-text-muted text-center mb-6">
                  {formLabels.prefilledNote[language]}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">
                      {formLabels.name[language]}
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-surface text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">
                      {formLabels.company[language]}
                    </label>
                    <input
                      type="text"
                      required
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-surface text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">
                      {formLabels.email[language]}
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-surface text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">
                      {formLabels.phone[language]}
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-surface text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">
                      {formLabels.topic[language]}
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={result.title[language]}
                      className="w-full px-4 py-3 rounded-lg border border-black/5 bg-accent/5 text-accent font-medium cursor-default"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">
                      {formLabels.message[language]}
                    </label>
                    <textarea
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-surface text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Send size={16} />
                      {startConversation[language]}
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
                    >
                      <RotateCcw size={14} />
                      {tryAgain[language]}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

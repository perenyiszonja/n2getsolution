import { useLanguage } from '../i18n/LanguageContext'

const content = {
  en: {
    title: 'About Us',
    intro: 'We are not a large consultancy. We are a focused team of experienced professionals who chose responsibility over scale.',
    founderName: 'Norbert Takács',
    founderRole: 'Founder & Managing Director',
    founderBio: 'Over 15 years of experience in IT consulting, digital strategy and business transformation across logistics, retail, healthcare and manufacturing. Built 2GetSolution on a simple belief: consulting should deliver outcomes, not just advice.',
    teamTitle: 'How we show up',
    teamDescription: 'We meet our clients where they are — at conferences, in boardrooms, or over a coffee. Real conversations, real partnerships, real results.',
    values: [
      { title: 'Ownership', text: 'We take responsibility for what we recommend. If we advise it, we stand behind it.' },
      { title: 'Transparency', text: 'No hidden agendas, no unnecessary complexity. We say what we mean.' },
      { title: 'Partnership', text: 'We treat every client as a long-term relationship, not a transaction.' },
    ],
  },
  hu: {
    title: 'Rólunk',
    intro: 'Nem egy nagyvállalati tanácsadó cég vagyunk. Tapasztalt szakemberek fókuszált csapata, akik a felelősséget választották a méret helyett.',
    founderName: 'Takács Norbert',
    founderRole: 'Alapító és ügyvezető',
    founderBio: 'Több mint 15 év tapasztalat IT tanácsadásban, digitális stratégiában és üzleti transzformációban a logisztika, kiskereskedelem, egészségügy és feldolgozóipar területén. A 2GetSolution-t egy egyszerű meggyőződésre építette: a tanácsadásnak eredményeket kell szállítania, nem csak tanácsot.',
    teamTitle: 'Így vagyunk jelen',
    teamDescription: 'Ügyfeleinkkel ott találkozunk, ahol ők vannak — konferenciákon, tárgyalókban vagy egy kávé mellett. Valódi beszélgetések, valódi partnerségek, valódi eredmények.',
    values: [
      { title: 'Tulajdonosi szemlélet', text: 'Felelősséget vállalunk azért, amit ajánlunk. Ha tanácsoljuk, kiállunk mellette.' },
      { title: 'Átláthatóság', text: 'Nincsenek rejtett szándékok, nincs felesleges bonyolítás. Azt mondjuk, amit gondolunk.' },
      { title: 'Partnerség', text: 'Minden ügyfelet hosszú távú kapcsolatként kezelünk, nem tranzakcióként.' },
    ],
  },
  de: {
    title: 'Über uns',
    intro: 'Wir sind keine große Beratung. Wir sind ein fokussiertes Team erfahrener Fachleute, die Verantwortung über Größe gewählt haben.',
    founderName: 'Norbert Takács',
    founderRole: 'Gründer & Geschäftsführer',
    founderBio: 'Über 15 Jahre Erfahrung in IT-Beratung, digitaler Strategie und Geschäftstransformation in Logistik, Einzelhandel, Gesundheitswesen und Fertigung. Gründete 2GetSolution mit einer einfachen Überzeugung: Beratung sollte Ergebnisse liefern, nicht nur Ratschläge.',
    teamTitle: 'Wie wir auftreten',
    teamDescription: 'Wir treffen unsere Kunden dort wo sie sind — auf Konferenzen, in Besprechungsräumen oder bei einem Kaffee. Echte Gespräche, echte Partnerschaften, echte Ergebnisse.',
    values: [
      { title: 'Ownership', text: 'Wir übernehmen Verantwortung für das was wir empfehlen. Wenn wir es raten, stehen wir dahinter.' },
      { title: 'Transparenz', text: 'Keine versteckten Agenden, keine unnötige Komplexität. Wir sagen was wir meinen.' },
      { title: 'Partnerschaft', text: 'Wir behandeln jeden Kunden als langfristige Beziehung, nicht als Transaktion.' },
    ],
  },
}

export function About() {
  const { language } = useLanguage()
  const t = content[language]

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center">
          {t.title}
        </h2>
        <p className="mt-4 text-center text-text-secondary max-w-2xl mx-auto">
          {t.intro}
        </p>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}portrai.png`}
              alt={t.founderName}
              className="w-full rounded-2xl object-cover object-top shadow-lg aspect-[4/3]"
            />
            <h3 className="mt-6 text-xl font-semibold text-text-primary">
              {t.founderName}
            </h3>
            <p className="text-sm text-accent font-medium">
              {t.founderRole}
            </p>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              {t.founderBio}
            </p>
          </div>

          <div>
            <img
              src={`${import.meta.env.BASE_URL}team.jpg`}
              alt={t.teamTitle}
              className="w-full rounded-2xl object-cover shadow-lg aspect-[4/3]"
            />
            <h3 className="mt-6 text-xl font-semibold text-text-primary">
              {t.teamTitle}
            </h3>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              {t.teamDescription}
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.values.map((value, i) => (
            <div key={i} className="p-5 rounded-xl border border-black/5 bg-surface-light/30">
              <h4 className="text-base font-semibold text-text-primary">{value.title}</h4>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

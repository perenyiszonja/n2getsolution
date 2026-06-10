import { useLanguage } from '../i18n/LanguageContext'
import { ArrowRight } from 'lucide-react'
import { HeroParticles } from './HeroParticles'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[#0a0a1a]">
      <HeroParticles />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div className="absolute inset-0 w-[340px] h-[340px] md:w-[480px] md:h-[480px] -translate-x-[20px] -translate-y-[20px] md:-translate-x-[30px] md:-translate-y-[30px] rounded-full bg-gradient-to-b from-[#a855f7]/40 via-[#e879a8]/30 to-[#ff6b35]/20 blur-[40px] animate-pulse" />
          <div className="absolute inset-0 w-[320px] h-[320px] md:w-[450px] md:h-[450px] -translate-x-[10px] -translate-y-[10px] md:-translate-x-[15px] md:-translate-y-[15px] rounded-full bg-gradient-to-tr from-[#ff6b35]/25 via-[#e879a8]/20 to-[#a855f7]/30 blur-[25px]" />
          <div className="w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full bg-white/95 shadow-[0_0_60px_20px_rgba(255,107,53,0.3),0_0_120px_60px_rgba(168,85,247,0.25),0_0_200px_100px_rgba(232,121,168,0.15)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
          <span className="text-white">{t.hero.title}</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#06b6d4]">{t.hero.subtitle}</span>
        </h1>

        <p className="mt-6 text-base md:text-lg font-bold max-w-2xl mx-auto leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#06b6d4]">
          {t.hero.description}
        </p>


        <div className="mt-8">
          <button
            onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#a855f7] to-[#06b6d4] hover:opacity-90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-opacity cursor-pointer shadow-lg shadow-purple-500/30"
          >
            {t.hero.cta}
            <ArrowRight size={20} />
          </button>
          <p className="text-sm font-bold text-white mt-5" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>{t.hero.ctaSub}</p>
        </div>
      </div>
    </section>
  )
}

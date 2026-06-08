import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import { LanguageProvider } from './i18n/LanguageContext'
import { Index } from './pages/Index'

const particlesInit = (engine: Engine) => loadSlim(engine)

function App() {
  return (
    <ParticlesProvider init={particlesInit}>
      <LanguageProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ParticlesProvider>
  )
}

export default App

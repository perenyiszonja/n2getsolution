import { useMemo } from 'react'
import Particles from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

export function NetworkBackground() {
  const options: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    background: { color: { value: 'transparent' } },
    particles: {
      number: {
        value: 60,
        density: { enable: true, width: 1200, height: 800 },
      },
      color: { value: ['#a855f7', '#e879a8', '#06b6d4'] },
      links: {
        enable: true,
        distance: 200,
        color: '#a855f7',
        opacity: 0.25,
        width: 1.2,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none' as const,
        outModes: { default: 'bounce' as const },
      },
      opacity: {
        value: { min: 0.4, max: 0.8 },
      },
      size: {
        value: { min: 2, max: 4 },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.4 } },
      },
    },
    detectRetina: true,
  }), [])

  return <Particles id="network-bg" options={options} />
}

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
}

interface Edge {
  from: number
  to: number
  age: number
  maxAge: number
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []
    const edges: Edge[] = []
    const mouse = { x: -1000, y: -1000 }
    let lastConnected = -1

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      generateStars()
    }

    const generateStars = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h / 2
      const sunRadius = Math.min(w, h) * 0.22

      const count = Math.floor((w * h) / 8000)
      stars = []
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const dx = x - cx
        const dy = y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < sunRadius) continue
        stars.push({
          x,
          y,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
        })
      }
      lastConnected = -1
    }

    const findClosestStar = (x: number, y: number, maxDist: number): number => {
      let closest = -1
      let minDist = maxDist
      for (let i = 0; i < stars.length; i++) {
        const dx = stars[i].x - x
        const dy = stars[i].y - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < minDist) {
          minDist = dist
          closest = i
        }
      }
      return closest
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top

      const nearest = findClosestStar(mouse.x, mouse.y, 100)
      if (nearest !== -1 && nearest !== lastConnected && lastConnected !== -1) {
        const exists = edges.some(
          (edge) => (edge.from === lastConnected && edge.to === nearest) ||
                    (edge.from === nearest && edge.to === lastConnected)
        )
        if (!exists) {
          edges.push({ from: lastConnected, to: nearest, age: 0, maxAge: 180 })
        }
      }
      if (nearest !== -1) {
        lastConnected = nearest
      }
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
      lastConnected = -1
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Draw stars
      for (const star of stars) {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = star.opacity
        ctx.fill()
      }

      // Highlight nearest star to cursor
      const nearest = findClosestStar(mouse.x, mouse.y, 100)
      if (nearest !== -1) {
        const star = stars[nearest]
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 8)
        glow.addColorStop(0, 'rgba(168, 85, 247, 0.6)')
        glow.addColorStop(1, 'rgba(168, 85, 247, 0)')
        ctx.globalAlpha = 1
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, 8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw line from cursor to nearest star
      if (nearest !== -1) {
        const star = stars[nearest]
        const dx = star.x - mouse.x
        const dy = star.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        ctx.beginPath()
        ctx.moveTo(mouse.x, mouse.y)
        ctx.lineTo(star.x, star.y)
        ctx.strokeStyle = '#a855f7'
        ctx.globalAlpha = (1 - dist / 100) * 0.4
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Update and draw edges (the network)
      for (let i = edges.length - 1; i >= 0; i--) {
        const edge = edges[i]
        edge.age++
        if (edge.age > edge.maxAge) {
          edges.splice(i, 1)
          continue
        }

        const from = stars[edge.from]
        const to = stars[edge.to]
        const progress = 1 - edge.age / edge.maxAge

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = '#a855f7'
        ctx.globalAlpha = progress * 0.5
        ctx.lineWidth = progress * 1.2
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    animationId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
}

'use client'

import { useEffect, useRef } from 'react'

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacityDir: number
  hue: number
}

export default function FireflyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireflyRef = useRef<Firefly[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(35, Math.floor(window.innerWidth / 30))
    fireflyRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 1.5 + Math.random() * 2,
      opacity: Math.random() * 0.6,
      opacityDir: (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.005),
      hue: 40 + Math.random() * 20,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const f of fireflyRef.current) {
        f.x += f.vx
        f.y += f.vy
        f.opacity += f.opacityDir

        if (f.opacity >= 0.7 || f.opacity <= 0.05) {
          f.opacityDir *= -1
        }

        if (f.x < -10) f.x = canvas.width + 10
        if (f.x > canvas.width + 10) f.x = -10
        if (f.y < -10) f.y = canvas.height + 10
        if (f.y > canvas.height + 10) f.y = -10

        // Glow
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 8)
        gradient.addColorStop(0, `hsla(${f.hue}, 80%, 70%, ${f.opacity * 0.4})`)
        gradient.addColorStop(1, `hsla(${f.hue}, 80%, 70%, 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius * 8, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `hsla(${f.hue}, 90%, 85%, ${f.opacity})`
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden
    />
  )
}

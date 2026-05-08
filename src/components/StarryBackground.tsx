'use client'

import { useState, useEffect } from 'react'

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Array<{
    id: number
    left: string
    top: string
    size: string
    delay: string
    duration: string
  }>>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => {
        const r1 = seededRandom(i + 1)
        const r2 = seededRandom(i + 100)
        const r3 = seededRandom(i + 200)
        const r4 = seededRandom(i + 300)
        const r5 = seededRandom(i + 400)
        return {
          id: i,
          left: `${r1 * 100}%`,
          top: `${r2 * 100}%`,
          size: r3 < 0.15 ? 'star-large' : r3 < 0.5 ? 'star-small' : '',
          delay: `${r4 * 5}s`,
          duration: `${2 + r5 * 4}s`,
        }
      })
    )
  }, [])

  if (stars.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.size} animate-twinkle`}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}

'use client'

import { useMemo } from 'react'

export default function StarryBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() < 0.15 ? 'star-large' : Math.random() < 0.5 ? 'star-small' : '',
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 4}s`,
    }))
  }, [])

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

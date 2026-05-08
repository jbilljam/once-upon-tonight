'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadingMessages } from '@/lib/story-config'

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % loadingMessages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-8 relative z-20">
      {/* Pulsing glow ring behind moon */}
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-amber-400 blur-3xl -m-8"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="text-7xl mb-0 relative"
        >
          🌙
        </motion.div>
      </div>

      {/* Orbiting sparkles */}
      <div className="relative w-32 h-8 mt-4 mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
              x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-300"
            style={{ marginLeft: `${(i - 2) * 14}px`, marginTop: '-3px' }}
          />
        ))}
      </div>

      {/* Loading message */}
      <div className="h-12 relative w-full max-w-sm text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.4 }}
            className="text-white/50 text-sm font-sans tracking-wide absolute inset-0 flex items-center justify-center"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

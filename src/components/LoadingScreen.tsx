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
    <div className="min-h-dvh flex flex-col items-center justify-center px-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="text-7xl mb-8"
      >
        🌙
      </motion.div>

      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-amber-400"
            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="h-8 relative w-full max-w-xs text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-white/60 text-sm absolute inset-0 flex items-center justify-center"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

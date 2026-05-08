'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StarryBackground from '@/components/StarryBackground'
import SelectScreen from '@/components/SelectScreen'
import LoadingScreen from '@/components/LoadingScreen'
import StoryViewer from '@/components/StoryViewer'
import { Story } from '@/lib/story-config'

type Screen = 'select' | 'loading' | 'reading'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('select')
  const [story, setStory] = useState<Story | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (characterId: string, theme: string, todayContext: string) => {
    setScreen('loading')
    setError(null)

    try {
      const res = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId, theme, todayContext }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStory(data)
      setScreen('reading')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create story')
      setScreen('select')
    }
  }

  const handleNewStory = () => {
    setStory(null)
    setScreen('select')
  }

  return (
    <main className="relative min-h-dvh">
      {screen !== 'reading' && <StarryBackground />}

      <AnimatePresence mode="wait">
        {screen === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SelectScreen onGenerate={handleGenerate} isLoading={false} />
            {error && (
              <div className="fixed bottom-24 left-4 right-4 z-50">
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center backdrop-blur-sm">
                  <p className="text-red-200 text-sm">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-300/60 text-xs mt-2 underline"
                  >
                    dismiss
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {screen === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {screen === 'reading' && story && (
          <motion.div
            key="reading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StoryViewer story={story} onNewStory={handleNewStory} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

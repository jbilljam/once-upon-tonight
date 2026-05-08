'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Story, sceneVisuals, moodOverlays } from '@/lib/story-config'

interface StoryViewerProps {
  story: Story
  onNewStory: () => void
}

export default function StoryViewer({ story, onNewStory }: StoryViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const page = story.pages[currentPage]
  const isLastPage = currentPage === story.pages.length - 1
  const isFirstPage = currentPage === 0
  const scene = sceneVisuals[page.sceneType] || sceneVisuals.home
  const overlay = moodOverlays[page.mood] || ''

  const goNext = useCallback(() => {
    if (!isLastPage) {
      setDirection(1)
      setCurrentPage((p) => p + 1)
    }
  }, [isLastPage])

  const goPrev = useCallback(() => {
    if (!isFirstPage) {
      setDirection(-1)
      setCurrentPage((p) => p - 1)
    }
  }, [isFirstPage])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  useEffect(() => {
    let startX = 0
    const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext()
        else goPrev()
      }
    }
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div className={`min-h-dvh flex flex-col bg-gradient-to-b ${scene.gradient} transition-all duration-1000`}>
      <div className={`absolute inset-0 ${overlay} transition-all duration-1000 pointer-events-none`} />

      <div className="relative z-10 flex flex-col min-h-dvh">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 safe-top">
          <button
            onClick={onNewStory}
            className="text-white/40 text-sm hover:text-white/60 transition-colors"
          >
            ← New Story
          </button>
          <span className="text-white/30 text-xs">
            {currentPage + 1} of {story.pages.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="px-5 mt-2">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/30 rounded-full"
              animate={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Title (first page only) */}
        <AnimatePresence>
          {isFirstPage && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-2xl sm:text-3xl font-bold text-shadow-story px-5 mt-6 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent"
            >
              {story.title}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Scene emojis */}
        <div className="flex justify-center gap-3 mt-6 mb-2">
          {scene.emojis.slice(0, 3).map((emoji, i) => (
            <motion.span
              key={`${currentPage}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-4xl sm:text-5xl scene-emoji"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Story text */}
        <div className="flex-1 flex items-center px-6 sm:px-10 py-4">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8">
                <p className="page-text font-story text-white/90 text-shadow-soft leading-relaxed">
                  {page.text}
                </p>
                {page.discussionPrompt && (
                  <p className="discussion-prompt text-amber-200/70 text-sm sm:text-base mt-4">
                    💬 {page.discussionPrompt}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-5 pb-6 safe-bottom">
          <button
            onClick={goPrev}
            disabled={isFirstPage}
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              isFirstPage
                ? 'text-white/10 cursor-default'
                : 'text-white/50 bg-white/5 hover:bg-white/10 active:scale-95'
            }`}
          >
            ← Back
          </button>

          {isLastPage ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onNewStory}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg active:scale-95 transition-transform"
            >
              🌟 The End — New Story?
            </motion.button>
          ) : (
            <button
              onClick={goNext}
              className="px-5 py-3 rounded-xl text-sm font-medium text-white/70 bg-white/10 hover:bg-white/15 active:scale-95 transition-all"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

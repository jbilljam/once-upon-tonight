'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Story, sceneVisuals, moodOverlays } from '@/lib/story-config'

interface StoryViewerProps {
  story: Story
  onNewStory: () => void
}

function TextReveal({ text, pageKey }: { text: string; pageKey: number }) {
  const sentences = text.split(/(?<=[.!?])\s+/)

  return (
    <>
      {sentences.map((sentence, i) => (
        <motion.span
          key={`${pageKey}-${i}`}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
          className="inline"
        >
          {sentence}{i < sentences.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </>
  )
}

export default function StoryViewer({ story, onNewStory }: StoryViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const page = story.pages[currentPage]
  const isLastPage = currentPage === story.pages.length - 1
  const isFirstPage = currentPage === 0
  const scene = sceneVisuals[page.sceneType] || sceneVisuals.home
  const overlay = moodOverlays[page.mood] || ''

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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
    scrollToTop()
  }, [currentPage, scrollToTop])

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
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0, scale: 0.97 }),
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-dvh flex flex-col bg-gradient-to-b ${scene.gradient} animated-gradient transition-all duration-1000`}
    >
      {/* Mood overlay */}
      <div className={`absolute inset-0 ${overlay} transition-all duration-1000 pointer-events-none`} />

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
      }} />

      <div className="relative z-10 flex flex-col min-h-dvh">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 safe-top">
          <button
            onClick={onNewStory}
            className="text-white/30 text-sm hover:text-white/50 transition-colors font-sans tracking-wide"
          >
            ← New Story
          </button>
          <span className="text-white/20 text-xs font-sans tracking-wider">
            {currentPage + 1} of {story.pages.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="px-5 mt-2">
          <div className="h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-400/50 to-white/30"
              animate={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Title (first page only) */}
        <AnimatePresence>
          {isFirstPage && (
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-3xl sm:text-4xl font-display text-shadow-glow px-5 mt-6 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent"
            >
              {story.title}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Scene emojis */}
        <div className="flex justify-center gap-4 mt-6 mb-2">
          {scene.emojis.slice(0, 3).map((emoji, i) => (
            <motion.span
              key={`${currentPage}-${i}`}
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.5, type: 'spring', bounce: 0.3 }}
              className="text-4xl sm:text-5xl scene-emoji"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        {/* Story text */}
        <div className="flex-1 flex items-start px-5 sm:px-10 py-6">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <p className="page-text font-story text-white/90 text-shadow-soft leading-relaxed">
                  <TextReveal text={page.text} pageKey={currentPage} />
                </p>
                {page.discussionPrompt && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="discussion-prompt text-amber-200/60 text-sm sm:text-base mt-4 font-story"
                  >
                    💬 {page.discussionPrompt}
                  </motion.p>
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
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all font-sans ${
              isFirstPage
                ? 'text-white/10 cursor-default'
                : 'text-white/40 bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 backdrop-blur-sm'
            }`}
          >
            ← Back
          </button>

          {isLastPage ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onNewStory}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-slate-900 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform font-sans shimmer-btn"
            >
              🌟 The End — New Story?
            </motion.button>
          ) : (
            <button
              onClick={goNext}
              className="px-5 py-3 rounded-xl text-sm font-medium text-white/50 bg-white/[0.06] hover:bg-white/[0.1] active:scale-95 transition-all font-sans backdrop-blur-sm"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

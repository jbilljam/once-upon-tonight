'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { characters, Character } from '@/lib/characters'
import { themes } from '@/lib/story-config'

interface SelectScreenProps {
  onGenerate: (characterId: string, theme: string, todayContext: string) => void
  isLoading: boolean
}

function CharacterCard({
  character,
  isSelected,
  onSelect,
}: {
  character: Character
  isSelected: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      onClick={onSelect}
      className={`relative w-full rounded-2xl p-5 text-left transition-all duration-300 card-glow ${
        isSelected
          ? `bg-gradient-to-br ${character.colorFrom} ${character.colorTo} ring-2 ring-white/40 shadow-lg shadow-white/10`
          : 'glass-card hover:bg-white/[0.08]'
      }`}
    >
      {isSelected && (
        <motion.div
          layoutId="card-glow-bg"
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="relative flex items-center gap-4">
        <motion.span
          animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="text-4xl scene-emoji"
        >
          {character.emoji}
        </motion.span>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-white font-sans tracking-tight">{character.name}</h3>
          {character.id === 'both' && (
            <p className="text-sm text-white/50 mt-0.5">A story for both of them together</p>
          )}
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
          >
            <span className="text-sm">✓</span>
          </motion.div>
        )}
      </div>
    </motion.button>
  )
}

export default function SelectScreen({ onGenerate, isLoading }: SelectScreenProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState('surprise')
  const [todayContext, setTodayContext] = useState('')
  const [showThemes, setShowThemes] = useState(false)

  const handleGenerate = () => {
    if (!selectedCharacter) return
    onGenerate(selectedCharacter, selectedTheme, todayContext)
  }

  return (
    <div className="min-h-dvh flex flex-col px-5 py-8 safe-top safe-bottom relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-4"
        >
          🌙
        </motion.div>
        <h1 className="text-5xl sm:text-6xl font-display text-shadow-glow bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
          Once Upon Tonight
        </h1>
        <p className="text-white/40 text-sm mt-3 font-sans tracking-wide">A brand new story, every night</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-6 flex-1"
      >
        <div>
          <h2 className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] mb-3 font-sans">
            Who&apos;s tonight&apos;s hero?
          </h2>
          <div className="space-y-3">
            {Object.values(characters).map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isSelected={selectedCharacter === character.id}
                onSelect={() => setSelectedCharacter(character.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => setShowThemes(!showThemes)}
            className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] flex items-center gap-2 font-sans"
          >
            Story theme
            <motion.span
              animate={{ rotate: showThemes ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[10px]"
            >
              ▼
            </motion.span>
          </button>
          {showThemes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap gap-2 mt-3"
            >
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm transition-all font-sans ${
                    selectedTheme === theme.id
                      ? 'bg-white/15 ring-1 ring-white/25 text-white shadow-sm shadow-white/5'
                      : 'bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60'
                  }`}
                >
                  {theme.emoji} {theme.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div>
          <label
            htmlFor="context"
            className="text-xs font-medium text-white/30 uppercase tracking-[0.2em] block mb-2 font-sans"
          >
            What did we do today? <span className="normal-case text-white/20">(optional)</span>
          </label>
          <textarea
            id="context"
            value={todayContext}
            onChange={(e) => setTodayContext(e.target.value)}
            placeholder="e.g., went to the park, saw a rainbow, had pizza for dinner..."
            rows={2}
            className="w-full glass-card rounded-xl px-4 py-3 text-white placeholder-white/15 text-sm focus:ring-1 focus:ring-white/20 focus:outline-none resize-none font-sans"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 pb-2"
      >
        <button
          onClick={handleGenerate}
          disabled={!selectedCharacter || isLoading}
          className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300 font-sans ${
            selectedCharacter && !isLoading
              ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-slate-900 shadow-lg shadow-amber-500/20 active:scale-[0.98] shimmer-btn animate-glow-pulse'
              : 'bg-white/[0.06] text-white/25 cursor-not-allowed border border-white/[0.04]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">✨</span> Creating your story...
            </span>
          ) : (
            '✨ Create Tonight\'s Story'
          )}
        </button>
      </motion.div>
    </div>
  )
}

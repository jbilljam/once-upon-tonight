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
      onClick={onSelect}
      className={`relative w-full rounded-2xl p-5 text-left transition-all duration-300 ${
        isSelected
          ? `bg-gradient-to-br ${character.colorFrom} ${character.colorTo} ring-2 ring-white/40 shadow-lg shadow-white/10`
          : 'bg-white/5 hover:bg-white/10 ring-1 ring-white/10'
      }`}
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl scene-emoji" style={{ animationDelay: `${Math.random() * 2}s` }}>
          {character.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-white">{character.name}</h3>
          {character.id === 'both' && (
            <p className="text-sm text-white/50 mt-0.5">A story for both of them together</p>
          )}
        </div>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
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
    <div className="min-h-dvh flex flex-col px-5 py-8 safe-top safe-bottom">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-5xl mb-3">🌙</div>
        <h1 className="text-3xl font-bold text-shadow-story bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
          Once Upon Tonight
        </h1>
        <p className="text-white/50 text-sm mt-2">A brand new story, every night</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-6 flex-1"
      >
        <div>
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">
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
            className="text-sm font-medium text-white/40 uppercase tracking-wider flex items-center gap-2"
          >
            Story theme
            <span className="text-xs transition-transform" style={{ transform: showThemes ? 'rotate(180deg)' : '' }}>
              ▼
            </span>
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
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedTheme === theme.id
                      ? 'bg-white/20 ring-1 ring-white/30 text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10'
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
            className="text-sm font-medium text-white/40 uppercase tracking-wider block mb-2"
          >
            What did we do today? <span className="normal-case text-white/25">(optional)</span>
          </label>
          <textarea
            id="context"
            value={todayContext}
            onChange={(e) => setTodayContext(e.target.value)}
            placeholder="e.g., went to the park, saw a rainbow, had pizza for dinner..."
            rows={2}
            className="w-full bg-white/5 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm border border-white/10 focus:border-white/25 focus:outline-none resize-none"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 pb-2"
      >
        <button
          onClick={handleGenerate}
          disabled={!selectedCharacter || isLoading}
          className={`w-full py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
            selectedCharacter && !isLoading
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg shadow-amber-500/25 active:scale-[0.98]'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
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

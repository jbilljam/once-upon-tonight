export interface StoryPage {
  text: string
  sceneType: SceneType
  mood: Mood
  discussionPrompt?: string
}

export interface Story {
  title: string
  pages: StoryPage[]
}

export type SceneType =
  | 'forest'
  | 'ocean'
  | 'space'
  | 'castle'
  | 'garden'
  | 'home'
  | 'mountain'
  | 'cloud'
  | 'cave'
  | 'meadow'

export type Mood =
  | 'exciting'
  | 'calm'
  | 'mysterious'
  | 'cozy'
  | 'playful'
  | 'brave'
  | 'magical'
  | 'sleepy'

export const sceneVisuals: Record<SceneType, { emojis: string[]; gradient: string }> = {
  forest: {
    emojis: ['🌲', '🦊', '🍄', '🌿', '🦉'],
    gradient: 'from-emerald-900 via-green-800 to-emerald-950',
  },
  ocean: {
    emojis: ['🌊', '🐠', '🐚', '🦀', '🐙'],
    gradient: 'from-blue-900 via-cyan-800 to-blue-950',
  },
  space: {
    emojis: ['🚀', '⭐', '🪐', '🌙', '👽'],
    gradient: 'from-indigo-950 via-purple-900 to-slate-950',
  },
  castle: {
    emojis: ['🏰', '👑', '🦄', '⚔️', '🐉'],
    gradient: 'from-purple-900 via-violet-800 to-indigo-950',
  },
  garden: {
    emojis: ['🌸', '🦋', '🌺', '🐝', '🌻'],
    gradient: 'from-pink-900 via-rose-800 to-fuchsia-950',
  },
  home: {
    emojis: ['🏠', '🧸', '🍪', '🛋️', '💛'],
    gradient: 'from-amber-900 via-orange-800 to-amber-950',
  },
  mountain: {
    emojis: ['⛰️', '🦅', '❄️', '🌄', '🐺'],
    gradient: 'from-slate-800 via-gray-700 to-slate-900',
  },
  cloud: {
    emojis: ['☁️', '🌈', '💫', '🦜', '🎈'],
    gradient: 'from-sky-800 via-blue-700 to-indigo-900',
  },
  cave: {
    emojis: ['💎', '🔮', '🦇', '🕯️', '✨'],
    gradient: 'from-stone-900 via-slate-800 to-stone-950',
  },
  meadow: {
    emojis: ['🌻', '🐰', '🌾', '🦋', '🌼'],
    gradient: 'from-lime-900 via-green-800 to-emerald-900',
  },
}

export const moodOverlays: Record<Mood, string> = {
  exciting: 'bg-orange-500/10',
  calm: 'bg-blue-500/10',
  mysterious: 'bg-purple-500/15',
  cozy: 'bg-amber-500/10',
  playful: 'bg-yellow-500/10',
  brave: 'bg-red-500/10',
  magical: 'bg-fuchsia-500/15',
  sleepy: 'bg-indigo-900/30',
}

export const themes = [
  { id: 'surprise', label: 'Surprise Me!', emoji: '🎲' },
  { id: 'adventure', label: 'Grand Adventure', emoji: '🗺️' },
  { id: 'fantasy', label: 'Magical Fantasy', emoji: '🧙' },
  { id: 'space', label: 'Space Expedition', emoji: '🚀' },
  { id: 'underwater', label: 'Ocean Deep', emoji: '🐋' },
  { id: 'animals', label: 'Animal Friends', emoji: '🦁' },
  { id: 'dinosaurs', label: 'Dino Time', emoji: '🦕' },
  { id: 'superhero', label: 'Super Powers', emoji: '🦸' },
]

export const loadingMessages = [
  'Gathering stardust for your story...',
  'Asking the story fairies for tonight\'s tale...',
  'Mixing up a magical adventure...',
  'Sprinkling imagination dust...',
  'Waking up the characters...',
  'Painting the dream world...',
  'Whispering to the moon for ideas...',
  'Opening the book of tonight\'s adventures...',
]

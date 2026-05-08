export interface Character {
  id: string
  name: string
  age: number
  emoji: string
  color: string
  colorFrom: string
  colorTo: string
  interests: string[]
  description: string
  pronoun: string
  possessive: string
}

export const characters: Record<string, Character> = {
  audrey: {
    id: 'audrey',
    name: 'Audrey',
    age: 9,
    emoji: '🌙',
    color: 'purple',
    colorFrom: 'from-purple-500',
    colorTo: 'to-indigo-600',
    interests: ['reading', 'animals', 'art', 'nature', 'swimming', 'being creative'],
    description: 'A curious and creative 9-year-old who loves exploring and discovering new things',
    pronoun: 'she',
    possessive: 'her',
  },
  benjamin: {
    id: 'benjamin',
    name: 'Benjamin',
    age: 5,
    emoji: '🚀',
    color: 'blue',
    colorFrom: 'from-blue-500',
    colorTo: 'to-cyan-500',
    interests: ['dinosaurs', 'trucks', 'building things', 'superheroes', 'animals', 'playing outside'],
    description: 'An adventurous and energetic 5-year-old who loves big ideas and bigger adventures',
    pronoun: 'he',
    possessive: 'his',
  },
  both: {
    id: 'both',
    name: 'Audrey & Benjamin',
    age: 0,
    emoji: '✨',
    color: 'amber',
    colorFrom: 'from-amber-400',
    colorTo: 'to-rose-500',
    interests: ['playing together', 'adventures', 'animals', 'being silly', 'exploring'],
    description: 'A brother-sister duo — Audrey (9) leads the way while Benjamin (5) brings the wild energy',
    pronoun: 'they',
    possessive: 'their',
  },
}

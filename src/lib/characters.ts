export interface Character {
  id: string
  name: string
  age: number
  emoji: string
  color: string
  colorFrom: string
  colorTo: string
  interests: string[]
  personality: string
  friends: string[]
  family: string[]
  school: string
  favorites: Record<string, string>
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
    interests: [
      'competition dance (hip-hop, jazz, lyrical)',
      'singing and performing',
      'pop music and current trends',
      'TikTok dances',
      'Roblox',
      'Disney princesses',
      'theater (was recently in Annie)',
      'soft plushies',
      'shih tzu dogs',
      'beach vacations',
      'Paris',
      'playing sports',
      'travel',
    ],
    personality: 'A confident, creative performer who loves being on stage and learning the latest trends. She has a big social circle and a warm heart. She lights up around music and dance.',
    friends: ['Sadie', 'MJ', 'Carly', 'Morgan', 'Isabel', 'Maya', 'Ryan Q', 'Gabby', 'Madelyn'],
    family: ['Mommy', 'Daddy', 'Benjamin (little brother)', 'Poppa', 'Grandma', 'Nana', 'Grandpa', 'cousins Ava, Violet, and Ellis'],
    school: '3rd grade at Winthrop School with Mrs. McCardell',
    favorites: {
      treats: 'macarons and chocolate sweets',
      animals: 'shih tzu dogs',
      games: 'Roblox',
      style: 'Disney princess, pop culture trends',
      vacations: 'beach trips, Paris',
    },
    description: 'A 9-year-old dancer, singer, and performer who knows all the latest trends',
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
    interests: [
      'monster trucks',
      'dinosaurs',
      'spooky/Halloween things (age-appropriate)',
      'sports (baseball, basketball, soccer, wrestling)',
      'swimming',
      'beach vacations',
      'video games',
      'singing and dancing with Audrey',
      'rock music',
      'playground climbing',
      'running, biking, scootering',
      'fast cars',
      'being wild and crazy',
    ],
    personality: 'A high-energy, fearless little dude who loves anything loud, fast, or slightly spooky. He is always moving — climbing, running, wrestling. He has a silly wild side and a sweet bond with his big sister.',
    friends: ['Brody', 'Bryce', 'Cooper', 'Brady', 'Aiden', 'Adam', 'Noah'],
    family: ['Mommy', 'Daddy', 'Audrey (big sister)', 'Poppa', 'Grandma', 'Nana', 'Grandpa', 'cousins Ava, Violet, and Ellis'],
    school: 'Reinhardt School with Ms. Comins',
    favorites: {
      drink: 'chocolate milk',
      vehicles: 'monster trucks and fast cars',
      creatures: 'dinosaurs',
      holiday: 'Halloween',
      music: 'rock music',
    },
    description: 'A 5-year-old wild child who loves monster trucks, dinosaurs, and anything fast or spooky',
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
    interests: [
      'singing and dancing together',
      'beach vacations',
      'playing with cousins Ava, Violet, and Ellis',
      'being silly and wild',
      'video games',
      'swimming',
      'family time with Mommy, Daddy, Poppa, Grandma, Nana, Grandpa',
    ],
    personality: 'Audrey is the confident big sister who leads the way; Benjamin is the wild little brother who brings chaos and laughs. Together they are a force — performing, adventuring, and cracking each other up.',
    friends: [],
    family: ['Mommy', 'Daddy', 'Poppa', 'Grandma', 'Nana', 'Grandpa', 'cousins Ava, Violet, and Ellis'],
    school: '',
    favorites: {},
    description: 'A sister-brother duo — Audrey (9) the performer and Benjamin (5) the wild child',
    pronoun: 'they',
    possessive: 'their',
  },
}

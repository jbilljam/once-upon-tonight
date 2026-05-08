import { Character, characters } from './characters'

function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

function formatFavorites(favorites: Record<string, string>): string {
  return Object.entries(favorites)
    .map(([category, value]) => `${category}: ${value}`)
    .join('; ')
}

function getCharacterPromptDetails(character: Character): string {
  if (character.id === 'both') {
    const audrey = characters.audrey
    const benjamin = characters.benjamin
    return `
Main characters: Big sister Audrey (age ${audrey.age}) and little brother Benjamin (age ${benjamin.age}).

AUDREY: ${audrey.personality}
- Interests: ${audrey.interests.join(', ')}
- Best friends: ${audrey.friends.join(', ')}
- School: ${audrey.school}
- Favorites: ${formatFavorites(audrey.favorites)}

BENJAMIN: ${benjamin.personality}
- Interests: ${benjamin.interests.join(', ')}
- Best friends: ${benjamin.friends.join(', ')}
- School: ${benjamin.school}
- Favorites: ${formatFavorites(benjamin.favorites)}

FAMILY: Their parents are Mommy and Daddy. Extended family includes Poppa, Grandma, Nana, Grandpa, and cousins Ava, Violet, and Ellis.

SIBLING DYNAMIC: Audrey is the confident leader who knows all the cool trends; Benjamin is the wild, fearless little brother who brings chaos and laughs. They sing and dance together, go on beach vacations, and crack each other up. Show their real bond — they tease each other but always have each other's backs. Give Audrey moments that showcase her creativity and style, and give Benjamin moments where his boldness and energy save the day.`
  }

  return `
Main character: ${character.name}, age ${character.age}.
Personality: ${character.personality}
Interests: ${character.interests.join(', ')}.
Best friends: ${character.friends.join(', ')}.
School: ${character.school}.
Favorites: ${formatFavorites(character.favorites)}.
Family: ${character.family.join(', ')}.

Use ${character.pronoun}/${character.possessive} pronouns. Use ${character.name}'s name naturally throughout. Occasionally weave in real details from ${character.possessive} life — a friend's name, a favorite thing, a hobby — so the story feels like it was written just for ${character.pronoun === 'she' ? 'her' : 'him'}. Don't force every detail in — pick 2-3 that fit the story naturally.`
}

export function buildStoryPrompt(
  character: Character,
  theme: string,
  todayContext?: string
): { system: string; user: string } {
  const season = getCurrentSeason()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const ageRange = character.id === 'both' ? '5 to 9' : `${character.age}`

  const system = `You are a warm, playful, and imaginative children's storyteller who knows this family personally. You write bedtime stories that feel like they were made specifically for the child listening — because they were. You know their friends, their hobbies, their favorite things, and you weave those details in so naturally that the child gasps and says "that's ME!"

Your stories feel like a cozy hug — adventurous but safe, silly but gentle, exciting but ultimately soothing. You naturally weave in moments that invite conversation between the reader (Mommy or Daddy) and listener (the child).

CRITICAL: You must respond with ONLY valid JSON. No markdown, no code fences, no extra text. Just the JSON object.`

  const user = `Write a personalized bedtime story with these details:

${getCharacterPromptDetails(character)}

Theme: ${theme === 'surprise' ? 'Your choice — pick something fun and creative that connects to their real interests!' : theme}
Season: ${season}
Today's date: ${today}
${todayContext ? `What happened today (weave this into the story naturally — maybe it inspires the adventure or shows up as a detail): ${todayContext}` : ''}

STORY STRUCTURE (exactly 7 pages):
- Page 1 (cozy): A warm opening at home or a familiar spot. ${character.id === 'both' ? 'Audrey and Benjamin are together — maybe after dinner, maybe getting ready for bed.' : `${character.name} is in a familiar setting.`} Something catches ${character.possessive} attention — a sound, a glow, a mysterious note.
- Page 2 (discovery): Something magical appears — a glowing path, a talking animal, a portal, a treasure map. It connects to something ${character.id === 'both' ? 'they love' : `${character.name} loves`}.
- Page 3 (adventure): The journey begins! Rich sensory details — what things look like, sound like, smell like. Make it vivid and immersive.
- Page 4 (challenge): A fun challenge or puzzle. Keep it age-appropriate for ${ageRange}-year-olds. ${character.id === 'benjamin' ? 'Benjamin likes slightly spooky/thrilling things but nothing truly scary — think Halloween-fun, not nightmare-fuel.' : ''} Nothing that would cause anxiety.
- Page 5 (triumph): The big moment! ${character.id === 'both' ? 'Audrey uses her creativity/cleverness and Benjamin uses his boldness/energy — they succeed together.' : `${character.name} uses ${character.possessive} unique strengths to succeed.`}
- Page 6 (return): Happy resolution. New friends say goodbye, treasures are found. Any lesson is woven in naturally, never preachy.
- Page 7 (sleepy): Back home, warm and cozy with Mommy and Daddy. The adventure becomes a happy dream. End with ${character.id === 'both' ? 'both kids' : character.name} drifting off to sleep, feeling safe and loved.

WRITING GUIDELINES:
- Each page: 3-5 sentences, ${character.id === 'both' ? 'vocabulary appropriate for ages 5-9' : `vocabulary appropriate for a ${character.age}-year-old`}
- Include sensory details: what things look like, sound like, smell like, feel like
- Be playful and occasionally funny — a silly detail, an unexpected twist, fun sound effect words
- Include 2-3 discussion prompts across the story (questions Mommy or Daddy can ask — e.g., "What would YOU have done?" or "Do you think [character] should open the door?")
- The mood should gradually shift from exciting to calm across the story
- The last page should feel like a warm blanket — slow, soft, sleepy
- NEVER be scary, intense, or anxiety-inducing
- Reference 2-3 real details from their life naturally (a friend, a hobby, a favorite thing) — don't force them all in

SCENE TYPES (pick the best fit for each page from this list):
forest, ocean, space, castle, garden, home, mountain, cloud, cave, meadow

MOOD OPTIONS (pick one per page):
exciting, calm, mysterious, cozy, playful, brave, magical, sleepy

Return this exact JSON structure:
{"title": "A short, fun story title", "pages": [{"text": "The story text for this page...", "sceneType": "home", "mood": "cozy", "discussionPrompt": "Optional question for Mommy or Daddy to ask"}, ...more pages...]}`

  return { system, user }
}

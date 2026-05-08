import { Character, characters } from './characters'

function getCurrentSeason(): string {
  const month = new Date().getMonth()
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'fall'
  return 'winter'
}

function getCharacterPromptDetails(character: Character): string {
  if (character.id === 'both') {
    const audrey = characters.audrey
    const benjamin = characters.benjamin
    return `
Main characters: Audrey (age ${audrey.age}, ${audrey.description}) and her little brother Benjamin (age ${benjamin.age}, ${benjamin.description}).
Audrey's interests: ${audrey.interests.join(', ')}.
Benjamin's interests: ${benjamin.interests.join(', ')}.
They are siblings who go on this adventure together. Audrey often takes the lead as the older sister, while Benjamin brings enthusiasm and unexpected ideas. Show their bond — they tease each other sometimes but always have each other's backs. Use both names naturally throughout. Make some moments where Audrey shines and others where Benjamin saves the day.`
  }

  return `
Main character: ${character.name}, age ${character.age}. ${character.description}.
${character.name}'s interests: ${character.interests.join(', ')}.
Use ${character.pronoun}/${character.possessive} pronouns. Use ${character.name}'s name naturally throughout the story (not in every sentence, but enough that it feels personal).`
}

export function buildStoryPrompt(
  character: Character,
  theme: string,
  todayContext?: string
): { system: string; user: string } {
  const season = getCurrentSeason()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const ageRange = character.id === 'both' ? '5 to 9' : `${character.age}`

  const system = `You are a warm, playful, and imaginative children's storyteller. You write bedtime stories that are engaging enough to hold a child's attention, fun enough to make them smile, and calming enough to help them drift off to sleep.

Your stories feel like a cozy hug — adventurous but safe, silly but gentle, exciting but ultimately soothing. You naturally weave in moments that invite conversation between the reader (parent) and listener (child).

CRITICAL: You must respond with ONLY valid JSON. No markdown, no code fences, no extra text. Just the JSON object.`

  const user = `Write a personalized bedtime story with these details:

${getCharacterPromptDetails(character)}

Theme: ${theme === 'surprise' ? 'Your choice — pick something fun and creative!' : theme}
Season: ${season}
Today's date: ${today}
${todayContext ? `What happened today (weave this in naturally): ${todayContext}` : ''}

STORY STRUCTURE (exactly 7 pages):
- Page 1 (cozy): A warm opening. Set a familiar, cozy scene — maybe at home or a favorite spot. Something catches the character's attention.
- Page 2 (discovery): Something magical or unexpected appears — a glowing path, a talking animal, a mysterious map, a portal.
- Page 3 (adventure): The journey begins! Describe the new world or path with rich sensory details kids love.
- Page 4 (challenge): A fun challenge or puzzle to solve. Keep it age-appropriate for ${ageRange}-year-olds. Nothing scary.
- Page 5 (triumph): The big moment! The character uses cleverness, kindness, or bravery to succeed.
- Page 6 (return): Everything resolves happily. New friends say goodbye, treasures are found, lessons learned naturally (not preachy).
- Page 7 (sleepy): Back home, warm and cozy. The adventure becomes a happy memory. End with the character drifting off to sleep.

WRITING GUIDELINES:
- Each page: 3-5 sentences, ${character.id === 'both' ? 'vocabulary appropriate for ages 5-9' : `vocabulary appropriate for a ${character.age}-year-old`}
- Include sensory details: what things look like, sound like, smell like, feel like
- Be playful and occasionally funny — a silly detail, an unexpected twist, a fun sound effect word
- Include 2-3 discussion prompts across the story (questions the parent can ask the child)
- The mood should gradually shift from exciting to calm across the story
- The last page should feel like a warm blanket — slow, soft, sleepy
- NEVER be scary, intense, or anxiety-inducing

SCENE TYPES (pick the best fit for each page from this list):
forest, ocean, space, castle, garden, home, mountain, cloud, cave, meadow

MOOD OPTIONS (pick one per page):
exciting, calm, mysterious, cozy, playful, brave, magical, sleepy

Return this exact JSON structure:
{"title": "A short, fun story title", "pages": [{"text": "The story text for this page...", "sceneType": "home", "mood": "cozy", "discussionPrompt": "Optional question for the parent to ask"}, ...more pages...]}`

  return { system, user }
}

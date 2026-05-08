import Anthropic from '@anthropic-ai/sdk'
import { characters } from '@/lib/characters'
import { buildStoryPrompt } from '@/lib/prompts'
import { Story } from '@/lib/story-config'

const client = new Anthropic()

export async function POST(request: Request) {
  try {
    const { characterId, theme, todayContext } = await request.json()

    const character = characters[characterId]
    if (!character) {
      return Response.json({ error: 'Pick a character first!' }, { status: 400 })
    }

    const { system, user } = buildStoryPrompt(character, theme || 'surprise', todayContext)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: user }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    let story: Story
    try {
      story = JSON.parse(text)
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        return Response.json({ error: 'The story fairies got confused. Try again!' }, { status: 500 })
      }
      story = JSON.parse(jsonMatch[0])
    }

    if (!story.pages || !Array.isArray(story.pages) || story.pages.length === 0) {
      return Response.json({ error: 'The story came out blank. One more try!' }, { status: 500 })
    }

    return Response.json(story)
  } catch (error) {
    console.error('Story generation failed:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    if (message.includes('API key') || message.includes('authentication')) {
      return Response.json(
        { error: 'Missing API key. Add ANTHROPIC_API_KEY to your .env.local file.' },
        { status: 401 }
      )
    }
    return Response.json(
      { error: 'Something went wrong in storyland. Try again!' },
      { status: 500 }
    )
  }
}

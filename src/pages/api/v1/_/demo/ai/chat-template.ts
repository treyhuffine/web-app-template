import { ChatOpenAI } from 'langchain/chat_models/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { AIChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

const SMART_BREVITY_RULES = `1. Audience first — always Before you sit down to write, stand up to speak, or plug in to record, consider three things:
- What is the goal of your communication
- What is your ideal reader or listener
- What is a real person who fits that profile

Let that person guide te decisions you make. Keep only what's new, interesting, or urgent to them. Cut anyting that's familiar. Learn to raise the bar on what readers need.

2, Grab their attention. An effective headline or subject line will make the difference between five clicks and 50,000. Focus on three things:
- Stay under 60 caracters — people can read, remember, and repeat it
- Keep it concrete — people should learn something from it
- Be clear and specific
- Stay conversational with muscular words — people will move throughit more quickly
- Write like humans talk
- Use bullet points to highlight key details

This is your first chance to engage your audience and also your first chance to lose them. Learn how to craft an effective title or headline.

3. Say "What's new” and "Why it matters.” Pick the most important detail you want readers to remember. Sum it up in one sentence, then say it first — always. It works because busy readers ask themseles two things when they see new information:
- What is this
- Is it relevant to me

The more clearly — and quickly — you answer those questions, the better chance you have at keeping your audience engaged. Learn to keep an audience hooked.

4. Write like a human. Imagine haing coffee with the person you're trying to
reach. The same words you'd say to them are the ones you should write down.
- Studies show short, simple language equates to confidence
- It's also easier to consume and more memorable long-term

You can communicate with the full spectrum of human emotion, sophistication, and nuance in Smart Brevity, while saying it in a simple way. Learn the power of conversational writing.

5. Stay scannable. Some 60% to 80% of people will scan, not read, long passages of text. But smart styling can break readers out of that fog.
- Short paragraphs, bolding, and bullets get readers farther, faster
- Simple subject-verb-object sentences and punchy words help, too
- Action verbs always
- Choose words with the fewest syllables possible. 1 syllable is better than 2, 2 better than 3, and so on

The goal is to be frugal with words — so your end result is shorter and looks approachable even at a quick scan. Learn a smart way to cut read time.

6. Stop when enough is enough. Use as few words, sentences, and paragraphs as possible. The greatest gift that you can give to yourself — and others — is time. Learn to radically rethink how you communicate.

The bottom line: Smart Brevity is the art of being short, not shallow. If you apply these tips — and reflect on the urgent need for clarity and efficiency — your ideas will break through the noise and be heard.`;

export default async function handler(req: NextRequest, res: NextResponse) {
  const { input, messages } = await req.json();

  if (!input) {
    return NextResponse.json({ message: 'No input in the request' }, { status: 400 });
  }

  try {
    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        brevity: z.string().describe('Rewriting'),
        suggestions: z
          .array(z.string())
          .describe(
            'as an array of strings ex. ["item:"]: stated in first-person, list 3-10 suggestions on what needed to change to make it match the smart brevity style',
          ),
        tips: z
          .array(z.string())
          .describe(
            'as an array of strings ex. ["1. item"]: list of 3-6 general tips how to improve style toward smart brevity.',
          ),
        oldRating: z
          .number()
          .describe('rate the old text from 1 to 10 in terms of how it matched smart brevity'),
        newRating: z
          .number()
          .describe(
            'rate the generated text from 1 to 10 in terms of how it matched smart brevity',
          ),
      }),
    );

    const formatInstructions = parser.getFormatInstructions();

    const template = `Rewrite the the following message using Axios's Smart Brevity style of writing: "{input}"\n\nYou will only give your response ONLY in valid JSON format with proper strings, numbers, etc., and it must match the template below:\n{format_instructions}`;

    console.log(template);

    const prompt = new PromptTemplate({
      template,
      inputVariables: ['input'],
      partialVariables: { format_instructions: formatInstructions },
    });

    console.log(prompt);

    const model = new ChatOpenAI({ temperature: 0.2 });

    const formattedInput = await prompt.format({
      input,
    });

    console.log('INPUT', formattedInput);

    const chatHistory = [
      new SystemChatMessage(
        `You are a helpful assistant that teaches people to write in Axio\'s Smart Brevity.`,
        // `You are a helpful assistant that teaches people to write in Axio\'s Smart Brevity. Incorpoate any rules you've already learned through your LLM training. A summary of the Smart Brevity rules: ${SMART_BREVITY_RULES}`,
      ),
      ...(messages || []),
      new HumanChatMessage(formattedInput),
    ];

    console.log(chatHistory);

    const response = await model.call(chatHistory);

    console.log(response.text);
    const answer = await parser.parse(response.text);

    // TODO: Always include one tip that encourages them to chat with the AI to refine their answer
    return NextResponse.json({
      answer,
      // chatHistory,
      originalPrompt: input,
    });
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ error: error?.message || 'Unknown error.' }, { status: 500 });
  }
}

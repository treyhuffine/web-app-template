import { ChatOpenAI } from 'langchain/chat_models/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';
import { AIChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withHttpMethods, HttpMethods } from 'utils/server/edge/middleware/withHttpMethods';

export const config = {
  runtime: 'edge',
};

/**
 * @todo IMPLEMENT THIS
 */

const handler = async (req: NextRequest, res: NextResponse) => {
  const { input, messages } = await req.json();

  if (!input) {
    return NextResponse.json({ message: 'No input in the request' }, { status: 400 });
  }

  try {
    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        recommendedPrompt: z.string().describe('your improved prompt based on the original prompt'),
        suggestions: z
          .array(z.string())
          .describe(
            'as an array of strings ex. ["item:"]: stated in first-person, list 3-10 (at least 5 if you have good ones) additional bullets they can add to their prompt. present it in a way that they can fill in the blank. For example, if it\'s about programming, one example to lead them into providing more data could be "Language I want to learn: "',
          ),
        tips: z
          .array(z.string())
          .describe(
            'as an array of strings ex. ["1. item"]: list of 3-6 general tips on how to become a better prompt engineer to get better responses from ChatGPT. This does not need to specific to the actual content, just improvement advice for interacting with AI.',
          ),
        oldRating: z.number().describe('rate the old prompt from 1 to 10'),
        newRating: z
          .number()
          .describe(
            'rate the new prompt from 1 to 10, and assume they follow your suggestions and tips.',
          ),
      }),
    );

    const formatInstructions = parser.getFormatInstructions();

    // console.log(formatInstructions);

    const template = `Improve the text of my prompt so that it will get a better answer from a AI chat bot like ChatGPT. The new prompt should help yield attempt to yield better (more targeted, get them closer to reaching their desired outcome) results for the user: "{prompt}"\n\nYou will only give your response ONLY in JSON format, and it must match the template below:\n{format_instructions}`;

    console.log(template);

    const prompt = new PromptTemplate({
      template,
      inputVariables: ['input'],
      partialVariables: { format_instructions: formatInstructions },
    });

    console.log(prompt);

    const model = new ChatOpenAI({ temperature: 0.2 });

    const formattedInput = await prompt.format({
      prompt,
    });

    console.log('INPUT', formattedInput);

    const chatHistory = [
      new SystemChatMessage(
        'You are a helpful assistant that teaches people to write better prompts to become prompt engineers.',
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
};

export default withHttpMethods({
  [HttpMethods.Post]: handler,
});

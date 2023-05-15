import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { NextRequest, NextResponse } from 'next/server';
import { LangchainMessageRoles } from 'constants/ai';
import {
  RequestPayload,
  ResponsePayload,
  parser,
} from 'constants/payloads/demo/chatFormattedOutput';
import { deserializeLangchainToChat, serializeChatToLangchain } from 'utils/ai/langchain';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest, res: NextResponse) {
  const payload: RequestPayload = await req.json();
  const { input, messages, isStreaming, temperature, systemMessage } = payload;

  console.log(payload);

  if (!input) {
    return NextResponse.json({ message: 'No input in the request' }, { status: 400 });
  }

  try {
    const formatInstructions = parser.getFormatInstructions();

    const template = `Answer the following question: "{input}"\n\nYou will only give your response ONLY in valid JSON format with proper strings, numbers, etc., and it must match the template below:\n{format_instructions}`;

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

    const chatLog = [
      new SystemChatMessage(
        `You are a helpful assistant. You only speak JSON. Do not write any text that isn't valid JSON.`,
      ),
      ...serializeChatToLangchain(messages || []),
      new HumanChatMessage(formattedInput),
    ];

    console.log(chatLog);

    const response = await model.call(chatLog);

    console.log(response.text);
    const structuredOutput = await parser.parse(response.text);

    const responsePayload: ResponsePayload = {
      structuredOutput: structuredOutput,
      answer: { ...response, role: LangchainMessageRoles.Ai },
      messages: deserializeLangchainToChat([...chatLog, response]),
      input: input,
      systemMessage,
    };

    return NextResponse.json(responsePayload);
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ error: error?.message || 'Unknown error.' }, { status: 500 });
  }
}

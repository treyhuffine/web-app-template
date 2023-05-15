import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { NextRequest, NextResponse } from 'next/server';
import { LangchainMessageRoles } from 'constants/ai';
import { RequestPayload, ResponsePayload } from 'constants/payloads/demo/chatTemplate';
import { deserializeLangchainToChat, serializeChatToLangchain } from 'utils/ai/langchain';

export const config = {
  runtime: 'edge',
};

const DEFAULT_TEMPERATURE = 0.2;
const DEFAULT_SYSTEM_MESSAGE = 'You are a helpful assistant.';
const CHATGPT_MODEL_TURBO = 'gpt-3.5-turbo';
const CHATGPT_MODEL_4 = 'gpt-4';

export default async function handler(req: NextRequest, res: NextResponse) {
  const payload: RequestPayload = await req.json();
  const { input, messages, isStreaming, temperature, systemMessage } = payload;

  console.log(payload);

  if (!input) {
    return NextResponse.json({ message: 'No input in the request' }, { status: 400 });
  }

  try {
    const template = `Tell me the captial of: "{input}"`;

    console.log(template);

    const prompt = new PromptTemplate({
      template,
      inputVariables: ['input'],
    });

    console.log(prompt);

    const llm = new ChatOpenAI({ modelName: CHATGPT_MODEL_TURBO, temperature: 0.2 });

    const formattedInput = await prompt.format({
      input,
    });

    console.log('INPUT', formattedInput);

    const chatLog = [
      new SystemChatMessage(
        `You are a helpful assistant that only finds captials of the input. You speak in short answers that exactly answer the question.`,
      ),
      ...serializeChatToLangchain(messages || []),
      new HumanChatMessage(formattedInput),
    ];

    console.log(chatLog);

    const response = await llm.call(chatLog);

    console.log(response.text);

    const responsePayload: ResponsePayload = {
      answer: { ...response, role: LangchainMessageRoles.Ai },
      messages: deserializeLangchainToChat([...chatLog, response]),
      input: input,
      systemMessage,
    };

    // TODO: Always include one tip that encourages them to chat with the AI to refine their answer
    return NextResponse.json(responsePayload);
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ error: error?.message || 'Unknown error.' }, { status: 500 });
  }
}

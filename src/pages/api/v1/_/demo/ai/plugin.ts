import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIPluginTool, DadJokeAPI, RequestsGetTool, RequestsPostTool } from 'langchain/tools';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { TestTool } from 'utils/ai/TestTool';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest, res: NextResponse) {
  // const { query } = req.body;
  const { query } = await req.json();

  if (!query) {
    return NextResponse.json({ message: 'No query in the request' }, { status: 400 });
  }

  try {
    // https://js.langchain.com/docs/modules/agents/
    const tools = [
      new RequestsGetTool(),
      new RequestsPostTool(),
      await AIPluginTool.fromPluginUrl('https://www.klarna.com/.well-known/ai-plugin.json'), // NOTE: Example of chatgpt plugin
      new DadJokeAPI(),
      new TestTool(),
    ];
    const agent = await initializeAgentExecutorWithOptions(
      tools,
      new ChatOpenAI({ temperature: 0 }),
      { agentType: 'chat-zero-shot-react-description', verbose: true },
    );

    const result = await agent.call({
      input: query,
    });

    console.log(result);

    const response = { test: true };

    return NextResponse.json(result);
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ error: error?.message || 'Unknown error.' }, { status: 500 });
  }
}

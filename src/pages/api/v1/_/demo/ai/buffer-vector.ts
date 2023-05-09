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
    const result = {};

    return NextResponse.json(result);
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ error: error?.message || 'Unknown error.' }, { status: 500 });
  }
}

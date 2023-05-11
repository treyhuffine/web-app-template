import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BaseChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { NextRequest, NextResponse } from 'next/server';
import { MessageTypes } from 'constants/ai';
import { HttpMethods } from 'constants/http';
import { RequestPayload, ResponsePayload } from 'constants/payloads/demo/chat';
import { deserializeLangchainToChat, serializeChatToLangchain } from 'utils/ai/langchain';
import {
  response400BadRequestError,
  response500ServerError,
  responseJson200Success,
} from 'utils/server/edge/http';
import { withHttpMethods } from 'utils/server/edge/middleware/withHttpMethods';

export const config = {
  runtime: 'edge',
};

const DEFAULT_TEMPERATURE = 0.2;
const DEFAULT_SYSTEM_MESSAGE = 'You are a helpful assistant.';
const CHATGPT_MODEL_TURBO = 'gpt-3.5-turbo';
const CHATGPT_MODEL_4 = 'gpt-4';

const handler = async (req: NextRequest) => {
  const payload: RequestPayload = await req.json();
  const { input, messages, isStreaming, temperature, systemMessage } = payload;

  console.log(payload);

  if (!input) {
    return response400BadRequestError(req, 'No input in the request');
  }

  try {
    let chatLog: BaseChatMessage[] = [];

    if (!messages?.length) {
      chatLog = [...chatLog, new SystemChatMessage(systemMessage || DEFAULT_SYSTEM_MESSAGE)];
    }

    chatLog = [
      ...chatLog,
      ...serializeChatToLangchain(messages || []),
      new HumanChatMessage(input),
    ];

    console.log(chatLog);

    if (isStreaming) {
      let chatStreamResponse = '';

      const encoder = new TextEncoder();
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();
      const llm = new ChatOpenAI({
        modelName: CHATGPT_MODEL_TURBO,
        streaming: true,
        callbackManager: CallbackManager.fromHandlers({
          handleLLMNewToken: async (token) => {
            chatStreamResponse += token;
            // TODO: React all of these and insert them in the database once they finish
            await writer.ready;
            await writer.write(encoder.encode(token));
          },
          handleLLMEnd: async () => {
            console.log('----- COMPLETE +++++', chatStreamResponse);
            await writer.ready;
            await writer.close();
          },
          handleLLMError: async (e) => {
            console.log(e);
            await writer.ready;
            await writer.abort(e);
          },
        }),
      });

      llm.call(chatLog);

      return new NextResponse(stream.readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
        },
      });
    } else {
      const llm = new ChatOpenAI({
        modelName: CHATGPT_MODEL_TURBO,
        temperature: temperature || DEFAULT_TEMPERATURE,
        streaming: isStreaming,
      });
      const response = await llm.call(chatLog);

      console.log(response);

      const responsePayload: ResponsePayload = {
        answer: { ...response, role: MessageTypes.AI },
        messages: deserializeLangchainToChat([...chatLog, response]),
        input: input,
        systemMessage,
      };

      return responseJson200Success(req, responsePayload);
    }
  } catch (error: any) {
    console.log('error', error);
    return response500ServerError(req, error?.message || 'Unknown error.');
  }
};

export default withHttpMethods({
  [HttpMethods.Post]: handler,
});

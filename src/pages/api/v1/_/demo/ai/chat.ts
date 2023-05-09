import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { NextRequest } from 'next/server';
import { HttpMethods } from 'constants/http';
import { RequestPayload, ResponsePayload } from 'constants/payloads/demo/chat';
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

const handler = async (req: NextRequest) => {
  const payload: RequestPayload = await req.json();

  const { input, messages, streaming, temperature, systemMessage } = payload;

  console.log(payload);

  if (!input) {
    return response400BadRequestError(req, 'No input in the request');
  }

  try {
    const model = new ChatOpenAI({ temperature: temperature || DEFAULT_TEMPERATURE, streaming });

    let chatHistory: typeof messages = [];

    if (!messages?.length) {
      chatHistory = [
        ...chatHistory,
        new SystemChatMessage(systemMessage || DEFAULT_SYSTEM_MESSAGE),
      ];
    }

    chatHistory = [...chatHistory, ...(messages || []), new HumanChatMessage(input)];

    console.log(chatHistory);

    const response = await model.call(chatHistory);

    const responsePayload: ResponsePayload = {
      answer: response.text,
      chatHistory,
      originalPrompt: input,
    };

    /**
     * @todo Check for stream vs. JSON response. Throw errors or automatic?
     */

    return responseJson200Success(req, responsePayload);
  } catch (error: any) {
    console.log('error', error);
    return response500ServerError(req, error?.message || 'Unknown error.');
  }
};

export default withHttpMethods({
  [HttpMethods.Post]: handler,
});

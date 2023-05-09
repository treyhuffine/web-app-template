import { BaseChatMessage } from 'langchain/schema';

export interface RequestPayload {
  input: string;
  messages: BaseChatMessage[];
  streaming?: boolean;
  temperature?: number;
  systemMessage?: string;
}

export interface ResponsePayload {
  answer: string;
  chatHistory: BaseChatMessage[];
  originalPrompt: string;
}

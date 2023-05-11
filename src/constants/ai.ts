import { AIChatMessage, HumanChatMessage, MessageType, SystemChatMessage } from 'langchain/schema';

export type LangchainMessage = HumanChatMessage | AIChatMessage | SystemChatMessage;

export interface Message {
  text: string;
  role: MessageType;
}

export const MessageTypes = {
  HUMAN: 'human' as MessageType,
  AI: 'ai' as MessageType,
  GENERIC: 'generic' as MessageType,
  SYSTEM: 'system' as MessageType,
};

export interface BaseRequesttPayload {
  input: string;
  messages: Message[];
  isStreaming?: boolean;
  temperature?: number;
  systemMessage?: string;
}

export interface BaseResponsePayload {
  messages: Message[];
  answer: Message;
  input: string;
  systemMessage?: string;
}

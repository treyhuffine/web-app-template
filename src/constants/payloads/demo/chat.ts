import { Message } from 'constants/ai';

export interface RequestPayload {
  input: string;
  messages: Message[];
  isStreaming?: boolean;
  temperature?: number;
  systemMessage?: string;
}

export interface ResponsePayload {
  messages: Message[];
  answer: Message;
  input: string;
  systemMessage?: string;
}

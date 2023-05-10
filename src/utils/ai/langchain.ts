import { AIChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { LangchainMessage, Message, MessageTypes } from 'constants/ai';

export const serializeChatToLangchain = (chatHistory: Message[] = []) => {
  return chatHistory.map((message) => {
    if (message.role === MessageTypes.HUMAN) {
      return new HumanChatMessage(message.text);
    }

    if (message.role === MessageTypes.SYSTEM) {
      return new SystemChatMessage(message.text);
    }

    return new AIChatMessage(message.text);
  });
};

export const deserializeLangchainToChat = (chatHistory: LangchainMessage[] = []) => {
  return chatHistory
    .map((message) => {
      if (message._getType() === MessageTypes.HUMAN) {
        return { text: message.text, role: MessageTypes.HUMAN };
      }

      if (message._getType() === MessageTypes.SYSTEM) {
        return { text: message.text, role: MessageTypes.SYSTEM };
      }

      return { text: message.text, role: MessageTypes.AI };
    })
    .filter((message) => message.role !== MessageTypes.SYSTEM);
};

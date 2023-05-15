import { AIChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { LangchainMessage, LangchainMessageRoles, Message } from 'constants/ai';

export const serializeChatToLangchain = (chatHistory: Message[] = []) => {
  return chatHistory.map((message) => {
    if (message.role === LangchainMessageRoles.Human) {
      return new HumanChatMessage(message.text);
    }

    if (message.role === LangchainMessageRoles.System) {
      return new SystemChatMessage(message.text);
    }

    return new AIChatMessage(message.text);
  });
};

export const deserializeLangchainToChat = (chatHistory: LangchainMessage[] = []) => {
  return chatHistory
    .map((message) => {
      if (message._getType() === LangchainMessageRoles.Human) {
        return { text: message.text, role: LangchainMessageRoles.Human };
      }

      if (message._getType() === LangchainMessageRoles.System) {
        return { text: message.text, role: LangchainMessageRoles.System };
      }

      return { text: message.text, role: LangchainMessageRoles.Ai };
    })
    .filter((message) => message.role !== LangchainMessageRoles.System);
};

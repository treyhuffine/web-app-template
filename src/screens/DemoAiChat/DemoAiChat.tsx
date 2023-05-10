import React, { KeyboardEvent, KeyboardEventHandler, useState } from 'react';
import { Message, MessageTypes } from 'constants/ai';
import {
  RequestPayload as ChatRequestPayload,
  ResponsePayload as ChatResponsePayload,
} from 'constants/payloads/demo/chat';
import { KeyCodes } from 'utils/client/dom';
import { useApiGateway } from 'hooks/useApi';
import { useAutosizeTextArea } from 'hooks/useAutosizeTextArea';
import SendIcon from 'svg/SendIcon';
import Button from 'atoms/Button';
import AiMessage from './AiMessage';
import UserMessage from './UserMessage';

const API_ROOT = 'v1/_/demo/ai';
const CHAT_OPTIONS = [
  {
    name: 'Normal chat',
    api: 'chat',
  },
  {
    name: 'Chat template',
    api: 'chat-template',
  },
  {
    name: 'Chat formatted output',
    api: 'chat-formatted-output',
  },
  {
    name: 'Buffer vector',
    api: 'buffer-vector',
  },
  {
    name: 'Plugins',
    api: 'plugin',
  },
  {
    name: 'Sequential chain',
    api: 'sequential-chain',
  },
  {
    name: 'Pinecone (todo)',
    api: 'pinecone',
  },
];

const DemoAiChat = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatApi, setChatApi] = useState(CHAT_OPTIONS[0].api);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [chatText, setChatText] = useState('');
  const { textAreaRef } = useAutosizeTextArea();
  const formRef = React.useRef<HTMLFormElement>(null);
  const { data, stream, error, post, status, isLoading } = useApiGateway('');

  return (
    <div>
      <div className="fixed left-0 top-0 h-14 w-screen bg-bg-primary-lightmode">
        <div className="mx-auto flex h-full w-full max-w-chat-container items-center justify-between">
          <h1 className="font-bold">Demo chat</h1>
          <div className="flex items-center">
            <div className="mr-6 flex items-center">
              <div className="mr-2">Stream</div>
              <input
                type="checkbox"
                checked={isStreaming}
                onChange={(e) => setIsStreaming(!isStreaming)}
              />
            </div>
            <select
              value={chatApi}
              onChange={(e) => {
                setChatApi(e.target.value);
                setChatLog([]);
              }}
            >
              {CHAT_OPTIONS.map((option) => (
                <option key={option.api} value={option.api}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-chat-container space-y-4 py-20">
        {chatLog.map((chat: Message, index: number) => {
          if (chat.role === MessageTypes.HUMAN) {
            return <UserMessage key={index} text={chat.text} />;
          } else if (chat.role === MessageTypes.AI) {
            return <AiMessage key={index} text={chat.text} />;
          } else {
            return null;
          }
        })}
        {isLoading && isStreaming && <AiMessage text={stream} />}
        {isLoading && <div>Loading...</div>}
      </div>
      <div className="fixed bottom-0 left-0 w-screen bg-bg-primary-lightmode pb-4">
        <form
          ref={formRef}
          className="mx-auto flex h-full w-full max-w-chat-container"
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            setChatText((t) => t.trim());

            if (isLoading) {
              return;
            }

            setChatLog((log) => [...log, { text: chatText.trim(), role: MessageTypes.HUMAN }]);
            setChatText('');
            const response = await post(`${API_ROOT}/${chatApi}`, {
              payload: { input: chatText.trim(), messages: chatLog, isStreaming },
            });

            if (response.isStream) {
              setChatLog((messages) => [
                ...messages,
                { text: response.data, role: MessageTypes.AI },
              ]);
            } else {
              setChatLog(response.data.messages);
            }
          }}
        >
          <textarea
            ref={textAreaRef}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            disabled={isLoading}
            aria-multiline
            rows={0} // For auto-resizing
            onKeyDown={(
              event: KeyboardEvent<HTMLTextAreaElement>,
            ): KeyboardEventHandler<HTMLInputElement> => {
              const { key, shiftKey } = event;

              if (key === KeyCodes.Enter && !shiftKey) {
                setChatText((t) => t.trim());
                formRef.current?.requestSubmit();
              }
              return () => {};
            }}
            className="mr-2 max-h-40 min-h-[2.5rem] w-full resize-none rounded-xl border border-gray-800 px-4 py-2 text-sm outline-none transition-shadow duration-200 ease-in-out focus:shadow-chat-box focus:outline-none disabled:opacity-60"
          />
          <Button type="submit">
            <SendIcon />
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white transition-all hover:shadow-md disabled:opacity-60"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DemoAiChat;

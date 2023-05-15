import React, { KeyboardEvent, KeyboardEventHandler, useState } from 'react';
import { LangchainMessageRoles, Message } from 'constants/ai';
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
    initialMessage: '',
    isStreamingAvailable: true,
  },
  {
    name: 'Chat template',
    api: 'chat-template',
    initialMessage:
      'I only answer messages about finding capitals of locations. Only write a city, state, or country name in the input.',
    isStreamingAvailable: false,
  },
  {
    name: 'Chat formatted output',
    api: 'chat-formatted-output',
    initialMessage: '',
    isStreamingAvailable: false,
  },
  {
    name: 'Buffer vector',
    api: 'buffer-vector',
    initialMessage: '',
    isStreamingAvailable: false,
  },
  {
    name: 'Plugins',
    api: 'plugin',
    initialMessage: '',
    isStreamingAvailable: false,
  },
  {
    name: 'Sequential chain',
    api: 'sequential-chain',
    initialMessage: '',
    isStreamingAvailable: false,
  },
  {
    name: 'Pinecone (todo)',
    api: 'pinecone',
    initialMessage: '',
    isStreamingAvailable: false,
  },
];

const DemoAiChat = () => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [chatApi, setChatApi] = useState(CHAT_OPTIONS[0].api);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [chatText, setChatText] = useState('');
  const { textAreaRef } = useAutosizeTextArea();
  const formRef = React.useRef<HTMLFormElement>(null);
  const { data, stream, error, post, status, isLoading, resetInitialState } = useApiGateway();
  const acitveItem = CHAT_OPTIONS.find((option) => option.api === chatApi);
  const isStreamingAvailable = acitveItem?.isStreamingAvailable ?? false;

  return (
    <div>
      <div className="fixed left-0 top-0 h-14 w-screen bg-bg-primary-lightmode">
        <div className="mx-auto flex h-full w-full max-w-chat-container items-center justify-between">
          <h1 className="font-bold">Demo chat</h1>
          <div className="flex items-center">
            {isStreamingAvailable && (
              <div className="mr-6 flex items-center">
                <div className="mr-2">Stream</div>
                <input
                  type="checkbox"
                  checked={isStreaming}
                  onChange={(e) => setIsStreaming(!isStreaming)}
                />
              </div>
            )}
            <select
              value={chatApi}
              onChange={(e) => {
                setChatApi(e.target.value);
                setChatLog([]);
                resetInitialState();
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
        {!!acitveItem.initialMessage && <AiMessage text={acitveItem.initialMessage} />}
        {chatLog.map((chat: Message, index: number) => {
          if (chat.role === LangchainMessageRoles.Human) {
            return <UserMessage key={index} text={chat.text} />;
          } else if (chat.role === LangchainMessageRoles.Ai) {
            return <AiMessage key={index} text={chat.text} />;
          } else {
            return null;
          }
        })}
        {isStreamingAvailable && isLoading && isStreaming && <AiMessage text={stream} />}
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

            setChatLog((log) => [
              ...log,
              { text: chatText.trim(), role: LangchainMessageRoles.Human },
            ]);
            setChatText('');
            const response = await post({
              endpoint: `${API_ROOT}/${chatApi}`,
              payload: { input: chatText.trim(), messages: chatLog, isStreaming },
            });

            if (response.isStream) {
              setChatLog((messages) => [
                ...messages,
                { text: response.data, role: LangchainMessageRoles.Ai },
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

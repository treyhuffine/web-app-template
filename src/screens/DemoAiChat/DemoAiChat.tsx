import React, { KeyboardEvent, KeyboardEventHandler, useState } from 'react';
import {
  RequestPayload as ChatRequestPayload,
  ResponsePayload as ChatResponsePayload,
} from 'constants/payloads/demo/chat';
import api from 'services/client/api';
import { KeyCodes } from 'utils/client/dom';
import { useApiGateway } from 'hooks/useApi';
import { useAutosizeTextArea } from 'hooks/useAutosizeTextArea';
import SendIcon from 'svg/SendIcon';
import Button from 'atoms/Button';

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
  const [chatApi, setChatApi] = useState(CHAT_OPTIONS[0].api);
  const [chatLog, setChatLog] = useState([]);
  const [chatText, setChatText] = useState('');
  const { textAreaRef } = useAutosizeTextArea();
  const formRef = React.useRef<HTMLFormElement>(null);
  const { data, error, post, status, isLoading } = useApiGateway('');

  console.log(chatApi, data, error, status, isLoading);

  return (
    <div>
      <div className="bg-bg-primary-lightmode fixed left-0 top-0 h-14 w-screen">
        <div className="mx-auto flex h-full w-full max-w-chat-container items-center justify-between">
          <h1 className="font-bold">Demo chat</h1>
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
      <div className="mx-auto w-full max-w-chat-container py-14">
        {JSON.stringify(chatLog, null, 2)}
      </div>
      <div className="bg-bg-primary-lightmode fixed bottom-0 left-0 w-screen pb-4">
        <form
          ref={formRef}
          className="mx-auto flex h-full w-full max-w-chat-container"
          onSubmit={(e) => {
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%% SUBMITTING %%%%%%%%%%%%%%%%%%%%%%%%%%');
            e.preventDefault();
            e.stopPropagation();

            setChatText((t) => t.trim());

            if (isLoading) {
              return;
            }

            setChatApi((t) => t.trim());
            post(`${API_ROOT}/${chatApi}`, { payload: { input: chatText.trim() } }).then((res) => {
              console.log(res);
            });
          }}
        >
          <textarea
            ref={textAreaRef}
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
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
            className="mr-2 max-h-40 min-h-[2.5rem] w-full resize-none rounded-xl border border-gray-800 px-4 py-2 text-sm outline-none transition-shadow duration-200 ease-in-out focus:shadow-chat-box focus:outline-none"
            style={{ outline: 'none' }}
          />
          <Button type="submit">
            <SendIcon />
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white transition-all hover:shadow-md"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DemoAiChat;

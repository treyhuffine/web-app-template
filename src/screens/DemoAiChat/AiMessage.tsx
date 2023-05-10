import React, { FC } from 'react';
import Markdown from 'react-markdown';

interface Props {
  text: string;
}

const AiMessage: FC<Props> = ({ text }) => {
  return (
    <div>
      <div className="text-sm font-bold">AI</div>
      <Markdown className="prose prose-sm max-w-none dark:prose-invert">{text}</Markdown>
    </div>
  );
};

export default AiMessage;

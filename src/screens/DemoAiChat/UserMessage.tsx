import React, { FC } from 'react';

interface Props {
  text: string;
}

const UserMessage: FC<Props> = ({ text }) => {
  return (
    <div>
      <div className="text-sm font-bold">You</div>
      <div className="inline-flex rounded-lg bg-brand-blue-700 px-4 py-2 text-sm text-white">
        {text}
      </div>
    </div>
  );
};

export default UserMessage;

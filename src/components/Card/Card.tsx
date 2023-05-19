import React from 'react';
import classNames from 'styles/utils/classNames';

interface Props {
  backgroundColor?: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = ({ backgroundColor = 'bg-color-bg-lightmode-primary', children }) => {
  return (
    <div
      className={classNames(
        'rounded-md bg-color-bg-lightmode-primary shadow-lightmode-primary',
        backgroundColor,
      )}
    >
      {children}
    </div>
  );
};

export default Card;

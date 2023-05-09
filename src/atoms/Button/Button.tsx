import React, { FC } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<Props> = ({ type = 'button', children, ...rest }) => {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;

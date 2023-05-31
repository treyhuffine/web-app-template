import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ type = 'button', children, ...rest }: Props) => {
  return (
    <button type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;

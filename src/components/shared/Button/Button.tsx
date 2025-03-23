import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  rounded?: string;
  height?: string;
  width?: string;
  color?: 'blue' | 'red';
}

export const Button: FC<ButtonProps> = ({
  children,
  rounded = '8px',
  height = '40px',
  width = 'auto',
  color = 'blue',
}) => {
  const backgroundColor = color === 'blue' ? '#0164EB' : '#D11D04';

  return (
    <button
      className={clsx(
        'text-white font-semibold flex items-center justify-center focus:outline-none',
      )}
      style={{
        borderRadius: rounded,
        height,
        width,
        backgroundColor,
      }}
    >
      {children}
    </button>
  );
};

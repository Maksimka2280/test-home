import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  rounded?: string;
  height?: string;
  width?: string;
  onClick?: () => void;
  className?: string;
}

export const ButtonBlackWhite: FC<ButtonProps> = ({
  children,
  rounded = '8px',
  height = '40px',
  width = 'auto',
  onClick,
  className,
}) => {
  return (
    <button
      className={clsx(
        'text-black font-semibold flex items-center justify-center focus:outline-none border-2 border-black ',
        className,
      )}
      style={{
        borderRadius: rounded,
        height,
        width,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
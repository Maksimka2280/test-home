import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  rounded?: string;
  height?: string;
  width?: string;
  color?: 'blue' | 'red';

  onClick?: () => void;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  rounded = '8px',
  height = '40px',
  width = 'auto',
  color = 'blue',

  onClick,
  className,
}) => {
  const backgroundColor = color === 'blue' ? '#0164EB' : '#D11D04';

  return (
    <button
      className={clsx(
        'text-white font-semibold flex items-center justify-center focus:outline-none',

        className, // Добавляем переданный className
      )}
      style={{
        borderRadius: rounded,
        height,
        width,
        backgroundColor,
      }}
      onClick={onClick} // Добавляем обработчик клика
    >
      {children}
    </button>
  );
};

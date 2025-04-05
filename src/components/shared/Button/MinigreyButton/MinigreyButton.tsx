import { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
  width?: string;
  height?: string;
}

export const MiniGreyButton: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  ref,
  width = '40px',
  height = '30px',
}) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'bg-white flex items-center justify-center rounded-[8px] focus:outline-none',
        className,
      )}
      style={{ width, height }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

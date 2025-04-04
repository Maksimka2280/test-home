import { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
}

export const MiniGreyButton: FC<ButtonProps> = ({ children, onClick, className, ref }) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'w-[40px] h-[30px] bg-white flex items-center justify-center rounded-[8px] focus:outline-none',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

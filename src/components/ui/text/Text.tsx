import clsx from 'clsx';
import { FC, ReactNode } from 'react';

const colorStyles = {
  default: 'text-black',
  primary: 'text-blue-600',
  secondary: 'text-gray-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
};

type TextProps = {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
  weight?: 'light' | 'normal' | 'bold' | 'semibold';
  color?: keyof typeof colorStyles;
};

export const Text: FC<TextProps> = ({
  children,
  className,
  size = 'md',
  weight = 'normal',
  color = 'default',
}) => {
  const baseStyles = 'leading-relaxed';

  const sizeStyles = {
    xs: 'text-[13px]',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <p
      className={clsx(
        baseStyles,
        sizeStyles[size],
        weightStyles[weight],
        colorStyles[color],
        className,
      )}
    >
      {children}
    </p>
  );
};

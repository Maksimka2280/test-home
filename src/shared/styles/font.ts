import { Lato, Onest } from 'next/font/google';
import clsx from 'clsx';

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
  weight: ['400', '500', '600', '700'],
});

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

export const fonts = clsx(onest.variable, lato.variable, onest.className, 'font-sans');

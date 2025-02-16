import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-onest)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
      },
    },
  },
  plugins: [heroui()],
};

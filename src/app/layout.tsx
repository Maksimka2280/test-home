import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { fonts } from '@shared/styles/font';
import { Providers } from '@components';
import '@shared/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Penguin Dev - Home', // TODO: replace with your own title
  description: 'Penguin Dev - description', // TODO: replace with your own description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts}>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

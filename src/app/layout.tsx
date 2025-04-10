import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { fonts } from '@shared/styles/font';
import { Providers } from '@components';
import '@shared/styles/globals.scss';
import MainHeader from '../components/shared/Header/MainHeader';
import { CurrencyProvider } from '../components/Context/Contextcurrency/Contextcurrency';
import MainFooter from '@/components/shared/Footer/MainFooter';

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
        <main className="bg-[#F3F3F3] h-auto">
          <MainHeader />
          <CurrencyProvider>
            <Providers>{children}</Providers>
          </CurrencyProvider>
          <MainFooter />
        </main>
      </body>
    </html>
  );
}

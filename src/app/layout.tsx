import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { fonts } from '@shared/styles/font';
import { Providers } from '@components';
import '@shared/styles/globals.scss';
import MainHeader from '../components/shared/Header/MainHeader';
import { CurrencyProvider } from '../components/Context/Contextcurrency/Contextcurrency';
import MainFooter from '@/components/shared/Footer/MainFooter';
import { PriceFilterProvider } from '@/components/Context/ContextPrice/ContextPrice';
import { FilterProvider } from '@/components/Context/FromandToYersContext/FromandToYersContext';
import { PublicationDateProvider } from '@/components/Context/PublicationDateContext/PublicationDateContext';
import { FloorsProvider } from '@/components/Context/FloorsContext/FloorsContext';
import { LogoutProvider } from '@/components/Context/QuitContext/QuitContext';
import { NotificationsProvider } from '@/components/Context/NotContext/NotContext';
import { KitchenAreaFilterProvider } from '@/components/Context/ChickenContext/ChickenContext';
import { TotalAreaFilterProvider } from '@/components/Context/TotakContext/TotakContext';
import { LivingAreaProvider } from '@/components/Context/LiveAreaContext/LiveAreaContext';

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
      <body className={`${fonts} flex flex-col min-h-screen`}>
        <main className="bg-[#F3F3F3] flex-grow">
          <NotificationsProvider>
            <LogoutProvider>
              <MainHeader />
              <LivingAreaProvider>
                <KitchenAreaFilterProvider>
                  <TotalAreaFilterProvider>
                    <FloorsProvider>
                      <PublicationDateProvider>
                        <FilterProvider>
                          <PriceFilterProvider>
                            <CurrencyProvider>
                              <Providers>{children}</Providers>
                            </CurrencyProvider>
                          </PriceFilterProvider>
                        </FilterProvider>
                      </PublicationDateProvider>
                    </FloorsProvider>
                  </TotalAreaFilterProvider>
                </KitchenAreaFilterProvider>
              </LivingAreaProvider>
            </LogoutProvider>
          </NotificationsProvider>
        </main>
        <MainFooter />
      </body>
    </html>
  );
}

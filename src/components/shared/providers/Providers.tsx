'use client';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" themes={['dark', 'light']} defaultTheme="dark">
        {/*<Provider store={store}>*/}
        {/*  <PersistGate loading={<Loading />} persistor={persistor}>*/}
        {children}
        {/*</PersistGate>*/}
        {/*</Provider>*/}
        <ToastContainer />
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

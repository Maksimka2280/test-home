'use client';
import Loading from '@/app/loading';
import { HeroUIProvider } from '@heroui/react';
import { persistor, store } from '@store';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" themes={['light', 'dark']} defaultTheme="light">
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
        <ToastContainer />
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

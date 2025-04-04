'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

// Валютные символы
const currencySymbols: Record<number, string> = {
  1: '₽',
  2: '$',
  3: '₣',
  4: '₴',
  5: '₺',
};

// Типы для контекста
interface CurrencyContextType {
  selectedCurrency: number;
  setSelectedCurrency: (currencyId: number) => void;
  currencySymbol: string;
}

// Создаём контекст
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Провайдер контекста
export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1); // По умолчанию рубль

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        currencySymbol: currencySymbols[selectedCurrency],
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Хук для использования валюты в компонентах
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

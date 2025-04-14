'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const currencySymbols: Record<number, string> = {
  1: '₽',
  2: '$',
  3: '₣',
  4: '₴',
  5: '₺',
};

interface CurrencyContextType {
  selectedCurrency: number;
  setSelectedCurrency: (currencyId: number) => void;
  currencySymbol: string;
  convertPrice: (priceInRubles: number) => number;
  isLoading: boolean;
  error: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1);
  const [currencyRates, setCurrencyRates] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencyRates = async () => {
      try {
        const response = await axios.get<{
          rates: Record<string, number>;
        }>('https://api.exchangerate-api.com/v4/latest/RUB');

        const rates = response.data.rates;

        setCurrencyRates({
          1: 1,
          2: rates.USD,
          3: rates.CHF,
          4: rates.UAH,
          5: rates.TRY,
        });
      } catch {
        setError('Не удалось получить курсы валют');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCurrencyRates();
  }, []);

  const convertPrice = (priceInRubles: number) => {
    if (currencyRates[selectedCurrency]) {
      return priceInRubles * currencyRates[selectedCurrency];
    }
    return priceInRubles;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        currencySymbol: currencySymbols[selectedCurrency],
        convertPrice,
        isLoading,
        error,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

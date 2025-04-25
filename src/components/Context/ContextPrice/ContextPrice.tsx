'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface PriceFilterContextType {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  selectedFilterCurrency: number;
  setSelectedFilterCurrency: (currencyId: number) => void;
}

const PriceFilterContext = createContext<PriceFilterContextType | undefined>(undefined);

export const PriceFilterProvider = ({ children }: { children: ReactNode }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedFilterCurrency, setSelectedFilterCurrency] = useState(1);

  return (
    <PriceFilterContext.Provider
      value={{
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        selectedFilterCurrency,
        setSelectedFilterCurrency,
      }}
    >
      {children}
    </PriceFilterContext.Provider>
  );
};

export const usePriceFilter = () => {
  const context = useContext(PriceFilterContext);
  if (!context) {
    throw new Error('usePriceFilter must be used within a PriceFilterProvider');
  }
  return context;
};

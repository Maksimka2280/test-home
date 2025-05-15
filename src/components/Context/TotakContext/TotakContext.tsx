'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

interface TotalAreaFilterContextType {
  minTotalArea: string;
  maxTotalArea: string;
  setMinTotalArea: (area: string) => void;
  setMaxTotalArea: (area: string) => void;
}

const TotalAreaFilterContext = createContext<TotalAreaFilterContextType | undefined>(undefined);

export const TotalAreaFilterProvider = ({ children }: { children: ReactNode }) => {
  const [minTotalArea, setMinTotalArea] = useState<string>('');
  const [maxTotalArea, setMaxTotalArea] = useState<string>('');

  return (
    <TotalAreaFilterContext.Provider
      value={{
        minTotalArea,
        maxTotalArea,
        setMinTotalArea,
        setMaxTotalArea,
      }}
    >
      {children}
    </TotalAreaFilterContext.Provider>
  );
};

export const useTotalAreaFilter = () => {
  const context = useContext(TotalAreaFilterContext);
  if (!context) {
    throw new Error('useTotalAreaFilter must be used within a TotalAreaFilterProvider');
  }
  return context;
};

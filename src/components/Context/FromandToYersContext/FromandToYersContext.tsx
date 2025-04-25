'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface FilterContextType {
  yearFrom: string;
  yearTo: string;
  updateYearFrom: (value: string) => void;
  updateYearTo: (value: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [yearFrom, setYearFrom] = useState<string>('');
  const [yearTo, setYearTo] = useState<string>('');

  const updateYearFrom = (value: string) => setYearFrom(value);
  const updateYearTo = (value: string) => setYearTo(value);

  return (
    <FilterContext.Provider value={{ yearFrom, yearTo, updateYearFrom, updateYearTo }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface FilterContextType {
  floorFrom: string;
  floorTo: string;
  updateFloorFrom: (value: string) => void;
  updateFloorTo: (value: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FloorsProviderProps {
  children: ReactNode;
}

export const FloorsProvider: React.FC<FloorsProviderProps> = ({ children }) => {
  const [floorFrom, setFloorFrom] = useState<string>('');
  const [floorTo, setFloorTo] = useState<string>('');

  const updateFloorFrom = (value: string) => setFloorFrom(value);
  const updateFloorTo = (value: string) => setFloorTo(value);

  return (
    <FilterContext.Provider value={{ floorFrom, floorTo, updateFloorFrom, updateFloorTo }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFloor = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FloorsProvider');
  }
  return context;
};

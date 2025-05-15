'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface LivingAreaContextProps {
  minLivingArea: number | null;
  maxLivingArea: number | null;
  setMinLivingArea: (value: number | null) => void;
  setMaxLivingArea: (value: number | null) => void;
}

const LivingAreaContext = createContext<LivingAreaContextProps | undefined>(undefined);

export const LivingAreaProvider = ({ children }: { children: ReactNode }) => {
  const [minLivingArea, setMinLivingArea] = useState<number | null>(null);
  const [maxLivingArea, setMaxLivingArea] = useState<number | null>(null);

  return (
    <LivingAreaContext.Provider
      value={{ minLivingArea, maxLivingArea, setMinLivingArea, setMaxLivingArea }}
    >
      {children}
    </LivingAreaContext.Provider>
  );
};

export const useLivingArea = (): LivingAreaContextProps => {
  const context = useContext(LivingAreaContext);
  if (context === undefined) {
    throw new Error('useLivingArea must be used within a LivingAreaProvider');
  }
  return context;
};

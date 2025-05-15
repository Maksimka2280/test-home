'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface KitchenAreaFilterContextType {
  minKitchenArea: string;
  maxKitchenArea: string;
  setMinKitchenArea: (area: string) => void;
  setMaxKitchenArea: (area: string) => void;
}

const KitchenAreaFilterContext = createContext<KitchenAreaFilterContextType | undefined>(undefined);

export const KitchenAreaFilterProvider = ({ children }: { children: ReactNode }) => {
  const [minKitchenArea, setMinKitchenArea] = useState('');
  const [maxKitchenArea, setMaxKitchenArea] = useState('');

  return (
    <KitchenAreaFilterContext.Provider
      value={{
        minKitchenArea,
        maxKitchenArea,
        setMinKitchenArea,
        setMaxKitchenArea,
      }}
    >
      {children}
    </KitchenAreaFilterContext.Provider>
  );
};

export const useKitchenAreaFilter = () => {
  const context = useContext(KitchenAreaFilterContext);
  if (!context) {
    throw new Error('useKitchenAreaFilter must be used within a KitchenAreaFilterProvider');
  }
  return context;
};

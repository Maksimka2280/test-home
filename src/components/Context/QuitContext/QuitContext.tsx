'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

interface LogoutContextType {
  isLoggingOut: boolean;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
  isLoggedOut: boolean;
  setIsLoggedOut: (isLoggedOut: boolean) => void;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

export const LogoutProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  return (
    <LogoutContext.Provider value={{ isLoggingOut, setIsLoggingOut, isLoggedOut, setIsLoggedOut }}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = () => {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error('useLogout must be used within a LogoutProvider');
  }
  return context;
};

'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

const PublicationDateContext = createContext<{
  publicationDate: string;
  setPublicationDate: (date: string) => void;
}>({
  publicationDate: '',
  setPublicationDate: () => {},
});

export const PublicationDateProvider = ({ children }: { children: ReactNode }) => {
  const [publicationDate, setPublicationDate] = useState('');

  return (
    <PublicationDateContext.Provider value={{ publicationDate, setPublicationDate }}>
      {children}
    </PublicationDateContext.Provider>
  );
};

export const usePublicationDate = () => useContext(PublicationDateContext);

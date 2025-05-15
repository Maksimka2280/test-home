'use client';

import { createContext, useContext, useState } from 'react';

type Notification = {
  id: number;
  date: string;
  time: string;
  text: string;
  read: boolean;
  favorite: boolean;
};

interface NotificationsContextProps {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  toggleFavorite: (id: number) => void;
  addNotification: (notifData: Notification) => void; // Функция для добавления уведомлений
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const toggleFavorite = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id
          ? {
              ...notif,
              favorite: !notif.favorite,
              read: true,
            }
          : notif,
      ),
    );
  };

  const addNotification = (notifData: Notification) => {
    setNotifications(prev => [...prev, notifData]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        markAsRead,
        markAllAsRead,
        toggleFavorite,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

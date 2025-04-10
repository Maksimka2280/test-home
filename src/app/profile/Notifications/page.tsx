'use client';

import { useState } from 'react';
import { Check, Heart } from 'lucide-react';

type Notification = {
  id: number;
  date: string;
  time: string;
  text: string;
  read: boolean;
  favorite: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    date: '26.12.24',
    time: '22:46',
    text: 'Текст уведомления Текст уведомления Текст уведомления',
    read: false,
    favorite: false,
  },
  {
    id: 2,
    date: '26.12.24',
    time: '22:46',
    text: 'Текст уведомления Текст уведомления Текст уведомления',
    read: false,
    favorite: false,
  },
  {
    id: 3,
    date: '26.12.24',
    time: '22:46',
    text: 'Текст уведомления Текст уведомления Текст уведомления',
    read: true,
    favorite: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleToggleFavorite = (id: number) => {
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

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearArray = () => {
    setNotifications([]);
  };

  const toggleShowFavorites = () => {
    setShowFavorites(prev => !prev);
  };
  const getNotificationWord = (count: number) => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod10 === 1 && mod100 !== 11) return 'уведомление';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'уведомления';
    return 'уведомлений';
  };

  const displayedNotifications = showFavorites
    ? notifications.filter(notif => notif.favorite)
    : notifications;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-[28px] sm:text-[33px] font-bold">Уведомления</h1>
        <div className="flex flex-wrap items-center mt-[20px] md:mt-0 gap-4 sm:gap-[45px] text-xs sm:text-sm">
          <p>
            {displayedNotifications.length} {getNotificationWord(displayedNotifications.length)}
          </p>

          <button onClick={markAllAsRead} className="text-[#0468FF]">
            Прочитать все
          </button>
          <button className="text-[#0468FF]" onClick={toggleShowFavorites}>
            *Отмеченные
          </button>
          <button className="text-[#0468FF]" onClick={clearArray}>
            Удалить все
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 text-xs sm:text-sm">
        {displayedNotifications.length === 0 && (
          <div className="flex justify-center mt-[20%]">
            <p className="text-[14px] sm:text-[20px]">
              {showFavorites ? 'У вас нет отмечённых уведомлений' : 'У вас нет уведомлений'}
            </p>
          </div>
        )}
        {displayedNotifications.map(notif => (
          <div
            key={notif.id}
            className={`flex flex-wrap items-center py-2 cursor-pointer ${
              notif.read ? 'text-gray-400' : 'font-semibold text-[#0D1F3A]'
            }`}
            onClick={() => handleMarkAsRead(notif.id)}
          >
            <div className="flex flex-col w-20 sm:hidden text-xs">
              <span>{notif.date}</span>
              <span className="text-gray-400">{notif.time}</span>
            </div>
            <div className="hidden sm:block w-24">{notif.date}</div>
            <div className="hidden sm:block w-16">{notif.time}</div>
            <div className="w-6 flex justify-center items-center mr-[5px] md:hidden">
              {notif.read && <Check size={18} className="text-[#0468FF]" />}
            </div>
            <div className="flex-1 text-[10px] sm:text-sm">{notif.text}</div>
            <div className="w-10 flex justify-center">
              <Heart
                className={notif.favorite ? 'text-[#0468FF] fill-[#0468FF]' : 'text-gray-400'}
                size={18}
                onClick={e => {
                  e.stopPropagation();
                  handleToggleFavorite(notif.id);
                }}
              />
            </div>
            <div className="hidden md:block w-24 text-right">
              {notif.read ? 'Прочитано' : <span className="text-[#0468FF]">Не прочитано</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

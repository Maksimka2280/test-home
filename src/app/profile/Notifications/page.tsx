'use client';

import { useEffect, useState } from 'react';
import { Check, Heart } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

type Notification = {
  id: number;
  user_id: number;
  text: string;
  marked: boolean;
  read: boolean;
  created_at: string;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notifications/get_all`, {
          withCredentials: true,
        });
        if (response.status === 200 && Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          console.error('Некорректный формат данных уведомлений');
        }
      } catch (error) {
        console.error('Ошибка при получении уведомлений:', error);
      }
    };

    void fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/notifications/mark_as_read/${id}`, null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setNotifications(prev =>
          prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif)),
        );
      }
    } catch (error) {
      console.error('Ошибка при пометке уведомления как прочитанного:', error);
    }
  };

  const handleToggleFavorite = async (id: number, currentMarked: boolean) => {
    try {
      if (!currentMarked) {
        const response = await axios.post(
          `${API_BASE_URL}/notifications/mark_as_liked/${id}`,
          { marked: true },
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          setNotifications(prev =>
            prev.map(notif => (notif.id === id ? { ...notif, marked: true, read: true } : notif)),
          );
        }
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/notifications/unlike_notification/${id}`,
          {},
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (response.status === 200) {
          setNotifications(prev =>
            prev.map(notif => (notif.id === id ? { ...notif, marked: false } : notif)),
          );
        }
      }
    } catch (error) {
      console.error('Ошибка при переключении избранного:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/notifications/read_all_notifications`,
        {},
        { withCredentials: true },
      );
      setNotifications(prev =>
        prev.map(notif => ({
          ...notif,
          read: true,
        })),
      );
    } catch (error) {
      console.error('Ошибка при пометке всех уведомлений как прочитанных:', error);
    }
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
    ? notifications.filter(notif => notif.marked)
    : notifications;

  const addNotification = async (newNotif: {
    user_id: number;
    text: string;
    marked: boolean;
    read: boolean;
  }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/notifications/add_notification`,
        newNotif,
        { withCredentials: true },
      );

      if (response.status === 200) {
        setNotifications(prev => [...prev, response.data]);
      } else {
        console.error('Не удалось добавить уведомление на сервер');
      }
    } catch (error) {
      console.error('Ошибка при добавлении уведомления на сервер:', error);
    }
  };

  const addSampleNotification = async () => {
    const newNotif = {
      user_id: 1,
      text: 'Треп хата готова',
      marked: false,
      read: false,
    };

    await addNotification(newNotif);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap items-center justify-between">
        <button onClick={addSampleNotification} className="text-[#0468FF]">
          ➕ Добавить вручную
        </button>

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
        {displayedNotifications.map(notif => {
          const createdAt = new Date(notif.created_at);
          const date = createdAt.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });

          const time = createdAt.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          });
          return (
            <div
              key={notif.id}
              className={`flex flex-wrap items-center py-2 cursor-pointer ${notif.read ? 'text-gray-400' : 'font-semibold text-[#0D1F3A]'}
                }`}
              onClick={() => handleMarkAsRead(notif.id)}
            >
              <div className="flex flex-col w-20 sm:hidden text-xs">
                <span>{date}</span>
                <span className="text-gray-400">{time}</span>
              </div>

              <div className="hidden sm:block w-24">{date}</div>
              <div className="hidden sm:block w-16">{time}</div>

              <div className="w-6 flex justify-center items-center mr-[5px] md:hidden">
                {notif.read && <Check size={18} className="text-[#0468FF]" />}
              </div>

              <div className="flex-1 text-[10px] sm:text-sm">{notif.text}</div>

              <div className="ml-auto w-10 flex justify-center">
                <Heart
                  className={notif.marked ? 'text-[#0468FF] fill-[#0468FF]' : 'text-gray-400'}
                  size={18}
                  onClick={e => {
                    e.stopPropagation();
                    void handleToggleFavorite(notif.id, notif.marked);
                  }}
                />
              </div>

              <div className="hidden md:block w-24 text-right">
                {notif.read ? 'Прочитано' : <span className="text-[#0468FF]">Не прочитано</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

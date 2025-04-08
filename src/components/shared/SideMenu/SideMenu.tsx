'use client';
import {
  Bell,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Heart,
  Home,
  MessageSquare,
  Star,
  User,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { key: 'important', label: 'Важное', icon: <Star size={18} />, disabled: false },
  { key: 'profile', label: 'Профиль', icon: <User size={18} />, disabled: false },
  { key: 'subscription', label: 'Подписка', icon: <CreditCard size={18} />, disabled: false },
  { key: 'favorites', label: 'Избранное', icon: <Heart size={18} />, disabled: false },
  { key: 'notifications', label: 'Уведомления', icon: <Bell size={18} />, disabled: false },
  {
    key: 'savedSearches',
    label: 'Сохраненные поиски',
    icon: <Bookmark size={18} />,
    disabled: false,
  },
  { key: 'myAds', label: 'Мои объявления', icon: <Home size={18} />, disabled: true },
  {
    key: 'myComments',
    label: 'Мои комментарии',
    icon: <MessageSquare size={18} />,
    disabled: false,
  },
];

interface SideMenuProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SideMenu({ activeTab, setActiveTab }: SideMenuProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative transition-[width] duration-300 ease-in-out mr-[30px] ${isCollapsed ? 'w-[76px]' : 'w-[260px]'} 
        p-4 border-[#DDDDDD] border-r-[2px] flex flex-col justify-between h-screen`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 right-[-38px] -translate-y-1/2 z-10"
      >
        {isCollapsed ? (
          <ChevronRight size={40} className="text-gray-400" />
        ) : (
          <ChevronLeft size={40} className="text-gray-400" />
        )}
      </button>

      <ul className="space-y-2">
        {menuItems.map(item => (
          <li
            key={item.key}
            onClick={() => !item.disabled && setActiveTab(item.key)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
              ${item.disabled ? 'text-gray-400 cursor-not-allowed' : ''}
              ${
                activeTab === item.key
                  ? 'bg-blue-600 text-white font-semibold'
                  : !item.disabled
                    ? 'text-gray-800 hover:bg-gray-100'
                    : ''
              }
            `}
          >
            <span className="w-4">{item.icon}</span>
            {!isCollapsed && item.label}
          </li>
        ))}

        <div className={`${isCollapsed ? 'ml-0' : 'ml-11'} pt-[30px]`}>
          <button className="font-semibold text-sm text-black mb-4">Выйти</button>
          <div
            className={`text-blue-600 cursor-pointer hover:underline transition-all duration-300 ${
              isCollapsed ? 'text-[12px]' : 'text-sm'
            }`}
          >
            Нужна помощь
          </div>
        </div>
      </ul>
    </aside>
  );
}

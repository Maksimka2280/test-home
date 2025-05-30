'use client';
import { useEffect, useState } from 'react';
import ChoiceLanguage from '@/components/ui/Modal/ModalChoiceLanguage';
import Link from 'next/link';
import '../../../shared/styles/globals.scss';
import { MiniGreyLine } from '../Filters/mini-grey-line';
import { Bell, Heart, Menu, X } from 'lucide-react';
import LoginModal from '@/components/ui/Modal/LoginandReg/Login';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { useLogout } from '@/components/Context/QuitContext/QuitContext';
import { useNotifications } from '@/components/Context/NotContext/NotContext';
import { useRouter } from 'next/navigation';
interface UserProfile {
  first_name: string;
  last_name: string;
  username: string;
  birthdate: string;
  city: string;
}

interface UserResponse {
  email: string;
  phone_number: string;
  profile: UserProfile;
  favorite_groups: any[];
  quick_favorites: any[];
  comments: any[];
  comparisons: any[];
  notifications: any[];
  saved_searches: any[];
}
interface Notification {
  user_id: number;
  text: string;
  marked: boolean;
  read: boolean;
}

export default function MainHeader() {
  const [isOpen2, setIsOpen2] = useState(false);
  const { isLoggingOut } = useLogout();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const { setNotifications } = useNotifications();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isShaking, setIsShaking] = useState(false);
  const router = useRouter();
  const handleMouseLeave = () => {
    setIsOpen2(false);
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get<UserResponse>(`${API_BASE_URL}/me/`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUserEmail(response.data.email);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsAuthenticated(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get<Notification>(`${API_BASE_URL}/notifications/get_all`, {
        withCredentials: true,
      });
      if (response.status === 200 && Array.isArray(response.data)) {
        setNotifications(response.data);
        const unread = response.data.filter((notif: { read: boolean }) => !notif.read).length;
        setUnreadCount(unread);
      } else {
        console.error('Некорректный формат данных уведомлений');
      }
    } catch (error) {
      console.error('Ошибка при получении уведомлений:', error);
    }
  };

  useEffect(() => {
    void checkAuth();
    void fetchNotifications(); // вызываем fetchNotifications для получения уведомлений
  }, [setNotifications]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    void checkAuth();
  };

  const getFirstLetter = (email: string) => {
    return email ? email[0].toUpperCase() : 'U';
  };

  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  };

  const userBackgroundColor = userEmail ? stringToColor(userEmail) : '#FFA500';
  useEffect(() => {
    if (isLoggingOut) {
      setIsAuthenticated(false);
      setUserEmail('');
    }
  }, [isLoggingOut]);
  const handleClick = () => {
    router.push('/profile?tab=notifications');
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };
  const handleClickProfile = () => {
    router.push('/profile?tab=profile');
  };

  return (
    <>
      <header className="w-full flex justify-center relative">
        <div className="max-w-[1440px] 2xl:max-w-[1810px] w-full flex justify-between items-center px-6 py-4">
          <Link href={'/'}>
            <img src="/img/penguin-home.svg" alt="" className="w-20 h-20 rounded-[40px]" />
          </Link>
          <ul className="hidden xl:flex gap-[50px]">
            <li>
              <Link href={'#'} className="text-[14px]">
                Подробнее о проекте
              </Link>
            </li>
            <li>
              <Link href={'#'} className="text-[14px]">
                Тарифы
              </Link>
            </li>
            <li>
              <Link href={'#'} className="text-[14px]">
                Справочный центр
              </Link>
            </li>
            <li>
              <Link href={'#'} className="text-[#c2c2c2] text-[14px]">
                Подписки на e-mail оповещения
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-6">
            <ChoiceLanguage />
            <MiniGreyLine height="30px" />
            <Link href={'/favorites'}>
              <Heart
                size={20}
                className="text-gray-300 hover:text-red-500 transition-colors duration-200"
              />
            </Link>
            <div className="relative">
              <button onClick={handleClick} className="mt-[8px]">
                <Bell
                  size={20}
                  className={`text-gray-300 transition ${isShaking ? 'shake' : ''}`}
                />
              </button>

              {isAuthenticated && unreadCount > 0 && (
                <div className="absolute -top-[1px] -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </div>
              )}
            </div>

            <div className="hidden xl:block">
              {isAuthenticated === null ? (
                <div>Загрузка...</div>
              ) : isAuthenticated && !isLoggingOut ? (
                <button onClick={handleClickProfile}>
                  <div
                    className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
                    style={{ backgroundColor: userBackgroundColor }}
                  >
                    <span className="text-white">{getFirstLetter(userEmail)}</span>
                  </div>
                </button>
              ) : (
                <LoginModal onLoginSuccess={handleLoginSuccess} />
              )}
            </div>

            <button
              className={`xl:hidden transition-transform duration-300 ${isOpen2 ? 'rotate-90' : 'rotate-0'}`}
              onClick={() => setIsOpen2(!isOpen2)}
            >
              {isOpen2 ? (
                <X size={24} className="transition-transform duration-300 rotate-180" />
              ) : (
                <Menu size={24} className="transition-transform duration-300 rotate-0" />
              )}
            </button>
          </div>
        </div>

        <div
          onMouseLeave={handleMouseLeave}
          className={`absolute top-28 right-0 w-full bg-[#F3F3F3] shadow-md p-4 flex flex-col gap-4 xl:hidden transition-[max-height,opacity] duration-700 ease-in-out z-[3] ${
            isOpen2 ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="block xl:hidden">
            {isAuthenticated === null ? (
              <div>Загрузка...</div>
            ) : isAuthenticated ? (
              <Link href={'/profile/Highlight'}>
                <div
                  className="w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
                  style={{ backgroundColor: userBackgroundColor }}
                >
                  <span className="text-white">{getFirstLetter(userEmail)}</span>
                </div>
              </Link>
            ) : (
              <LoginModal onLoginSuccess={handleLoginSuccess} />
            )}
          </div>

          <Link href={'#'} className="text-[14px]">
            Подробнее о проекте
          </Link>
          <Link href={'#'} className="text-[14px]">
            Тарифы
          </Link>
          <Link href={'#'} className="text-[14px]">
            Справочный центр
          </Link>
          <Link href={'#'} className="text-[#c2c2c2] text-[14px]">
            Подписки на e-mail оповещения
          </Link>
        </div>
      </header>
      <div className="bg-[#BCBCBC] h-[1px] w-full max-w-[1400px] 2xl:max-w-[1755px] mx-auto"></div>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomOrder from '@/components/ui/Modal/ModalCustomOrder';
import ModalMoreFilter from '@/components/ui/Modal/ModalMoreFilters';
import NewGroup from '@/components/ui/Modal/ModalNewGroup';
import { API_BASE_URL } from '@/config';
import { FilteredFavCards } from '@/components/shared/Filters/FilterFavoritesConditions';
import { List, Plus } from 'lucide-react';

export default function Favorites() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [advertData, setAdvertData] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Состояние для проверки авторизации
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const response = await axios.get(`${API_BASE_URL}/me/`, { withCredentials: true });
        console.log(response.data);

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      }
    };

    void checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      window.location.replace('/');
    } else if (isAuthenticated === true) {
      const likedIds = Object.keys(localStorage)
        .filter(key => key.includes('-liked') && localStorage.getItem(key) === 'true')
        .map(key => parseInt(key.split('-')[0]));

      if (likedIds.length > 0) {
        const fetchAdvertData = async (): Promise<void> => {
          try {
            const responses = await Promise.all(
              likedIds.map(id => axios.get(`${API_BASE_URL}/adverts/advert/${id}`)),
            );
            const data = responses.map(response => response.data);
            if (Array.isArray(data)) {
              setAdvertData(data);
              console.log(data);
            } else {
              console.error('Ошибка: данные не в формате массива');
            }
          } catch (error) {
            console.error('Ошибка загрузки данных:', error);
          }
        };

        void fetchAdvertData();
      }
    }
  }, [isAuthenticated]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const clearAllLikedCards = () => {
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.endsWith('-liked')) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));

    console.log('Удалено:', keysToRemove);
  };
  useEffect(() => {
    if (isAuthenticated === null) return;
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="mt-[50px]">
      <div className="max-w-[1440px] 2xl:max-w-[1750px] w-full mx-auto">
        <div className="flex justify-center xl:justify-start gap-12">
          {['Объявления', 'Жилые комплексы', 'Агентства'].map((btn, index) => (
            <button
              key={index}
              className={`text-[#152242] text-[12px] sm:text-[18px] ${selected === btn ? 'font-bold' : ''}`}
              onClick={() => setSelected(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center xl:justify-between mt-[35px]">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10 lg:gap-[50px]">
            <div className="w-[225px] sm:w-[245px] h-[80px] rounded-[10px] bg-[#fff] flex gap-4 md:gap-[20px] justify-center items-center shadow-md">
              <div className="w-[45px] md:w-[55px] h-[45px] md:h-[55px] bg-[#F3F3F3] rounded-[10px] flex justify-center items-center">
                <List size={20} />
              </div>
              <div>
                <p className="font-bold text-[14px] md:text-[16px]">Все объявления</p>
                <p className="text-[12px] md:text-[14px]">{advertData.length} объявлений</p>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-[24px] md:text-[30px] lg:text-[33px] font-bold mb-[10px]">
                Все объявления
              </h1>
              <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-[40px] justify-center lg:justify-start">
                <p>По дате добавления</p>
                <ModalMoreFilter trigger={<button>Фильтры</button>} />

                <button onClick={() => setIsCustomOrderOpen(true)}>
                  Кастомизировать объявление
                </button>
                <CustomOrder
                  isOpen={isCustomOrderOpen}
                  onClose={() => setIsCustomOrderOpen(false)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 md:gap-6 lg:gap-[25px] mt-[20px] xl:mt-[0]">
            <input
              type="checkbox"
              id="price-checkbox"
              className="hidden"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="price-checkbox"
              className="w-[15px] md:w-[17px] h-[15px] md:h-[17px] flex items-center justify-center rounded-[5px] bg-[#ffffff] cursor-pointer transition-all duration-300"
            >
              {isChecked && (
                <div className="w-[8px] md:w-[10px] h-[8px] md:h-[10px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
              )}
            </label>
            <p className="text-[14px] md:text-[16px]">{advertData.length} объявлений</p>
            <button
              className="border-none text-[#0468FF] lg:ml-[20px] md:ml-[40px] text-[14px] md:text-[16px]"
              onClick={clearAllLikedCards}
            >
              Удалить все
            </button>
          </div>
        </div>

        <div className="flex justify-center xl:justify-start flex-wrap gap-[45px]">
          <div>
            <p className="py-[15px] pt-[40px] xl:pt-[15px] text-center xl:text-left">Мои группы</p>
            <ul>
              <li>
                <div className="w-[245px] h-[80px] pr-[20px] rounded-[10px] bg-[#0468FF] flex gap-[20px] justify-center items-center">
                  <div
                    className="w-[55px] h-[55px] bg-[#F3F3F3] rounded-[10px] flex justify-center items-center cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus color="#0468FF" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="font-bold text-[16px] text-white">Новая группа</p>
                  </div>
                </div>
              </li>

              <NewGroup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </ul>
          </div>
          <div className="flex flex-col gap-[50px]">
            <FilteredFavCards cards={advertData} />
          </div>
        </div>
      </div>
    </div>
  );
}

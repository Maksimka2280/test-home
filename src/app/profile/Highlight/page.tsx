'use client';
import MiniCardProfile from '@/components/shared/Card/MiniCardPeofile';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
interface UserAccount {
  subscription_until: string;
  promocode: string;
  email: string;
}
export default function Highlight() {
  const [infoAcc, setIngoAcc] = useState<UserAccount | null>(null);
  useEffect(() => {
    const fetchCurrentUser = async (): Promise<void> => {
      console.log('Запрашиваем /me/ с withCredentials...');

      try {
        const response = await axios.get<UserAccount>(`${API_BASE_URL}/get_profile/`, {
          withCredentials: true,
        });

        setIngoAcc(response.data);
        console.log('Ответ /что/:', response.data);
      } catch (error) {
        console.error('Ошибка запроса /что/:', error);
      }
    };

    void fetchCurrentUser();
  }, []);
  return (
    <>
      <div className="flex flex-wrap md:flex-col lg:flex-row gap-[20px]">
        <div className="flex flex-col gap-[20px] w-full md:w-[510px]">
          <div className="w-full h-[100px] rounded-[20px] bg-[#0468FF] text-white flex justify-center items-center gap-[60px] px-[10px]">
            <div>
              <p className="font-extralight text-[10px] md:text-[15px]">Подписка активна:</p>
              <p className="font-bold md:text-[20px]">до {infoAcc?.subscription_until}</p>
            </div>
            <button className="w-[230px] h-[70px] rounded-[20px] bg-white text-black font-bold">
              Оплатить
            </button>
          </div>
          <div className="w-full h-[100px] rounded-[20px] bg-[#ffffff] flex justify-center items-center gap-[40px] px-[10px]">
            <div>
              <p className="font-extralight text-[10px] md:text-[15px]">Активируйте промокод:</p>
              <p className="font-bold text-[14px] md:text-[20px]">{infoAcc?.promocode}</p>
            </div>
            <button className="max-w-[230px] w-full h-[70px] rounded-[20px] bg-[#F3F3F3] text-black font-bold">
              Промокод
            </button>
          </div>
        </div>
        <div className="w-full md:w-[510px] h-auto pb-[15px] rounded-[20px] bg-white px-[28px]">
          <div className="flex flex-wrap justify-between items-center pt-4">
            <p className="font-bold text-[18px]">Сохраненные поиски</p>
            <p className="text-[#BCBCBC]">32 сохраненных поиска</p>
          </div>
          <div>
            <p className="font-bold mt-2">Поиск в Берн</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-1 text-[#0E1A3E] text-base font-medium">
              <div>
                <div className="flex justify-between">
                  <span>Стоимость</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>До метро</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>Площадь, м2</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>Этаж</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>Парковка</span>
                  <span>***</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span>Этажей в доме</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>Ремонт</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>Балкон/Лоджия</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>Лифт</span>
                  <span>***</span>
                </div>
                <div className="flex justify-between">
                  <span>Санузел</span>
                  <span>***</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[20px] mt-[20px]">
        <div className="w-full md:w-[510px] h-[410px] bg-white rounded-[20px] px-[28px] py-[20px]">
          <p className="font-bold text-[18px]">Избранные объявления</p>
          <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[330px] pr-2">
            <MiniCardProfile />
            <MiniCardProfile />
            <MiniCardProfile />
          </div>
        </div>
        <div className="w-full md:w-[510px] h-[410px] bg-white rounded-[20px] px-[28px] py-[20px] relative overflow-hidden">
          <p className="font-bold text-[18px]">Мои объявления</p>

          <div className="flex flex-col gap-[12px] overflow-y-auto max-h-[330px] pr-2 relative z-10">
            <MiniCardProfile />
            <MiniCardProfile />
            <MiniCardProfile />
          </div>

          {/* Полупрозрачный туман по всему блоку */}
          <div className="absolute inset-0 z-20 pointer-events-none bg-white/70 rounded-[20px]" />
        </div>
      </div>
    </>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import ChangeNumber from '@/components/ui/Modal/ChangeNumber/ChangeNumber';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
interface UserAccount {
  user_id: number;
  phone_number: string;
  email: string;
}
export default function SettingsProfile() {
  const [infoAcc, setIngoAcc] = useState<UserAccount | null>(null);
  useEffect(() => {
    const fetchCurrentUser = async (): Promise<void> => {
      console.log('Запрашиваем /me/ с withCredentials...');

      try {
        const response = await axios.get<UserAccount>(`${API_BASE_URL}/get_profile/`, {
          withCredentials: true,
        });

        setIngoAcc(response.data);
        console.log('Ответ /me/:', response.data);
      } catch (error) {
        console.error('Ошибка запроса /me/:', error);
      }
    };

    void fetchCurrentUser();
  }, []);
  return (
    <div className="flex flex-col lg:flex-row gap-[20px] w-full">
      <div className="w-full lg:max-w-[510px] rounded-[20px] bg-white px-[20px] py-[23px]">
        <div className="flex gap-[10px] items-center mb-[20px]">
          <div className="w-[63px] h-[63px] rounded-full bg-orange-400"></div>
          <div className="font-bold">
            <p>Фамилия Имя</p>
            <p>ID: {infoAcc?.user_id}</p>
          </div>
        </div>

        <form className="flex flex-col gap-[13px] w-full max-w-[463px]">
          <Input placeholder="Имя пользователя" height="50px" type="text" />
          <Input placeholder="Фамилия" height="50px" type="text" />
          <Input placeholder="Дата рождения" height="50px" type="date" />
        </form>

        <div className="flex flex-col sm:flex-row gap-[15px] mt-[20px]">
          <Button width="100%" height="65px" rounded="15px" color="blue">
            Сохранить изменения
          </Button>
          <Button width="100%" height="65px" rounded="15px" color="red">
            Сбросить
          </Button>
        </div>
      </div>

      <div className="w-full lg:max-w-[480px] rounded-[20px] bg-white px-[20px] py-[23px] ">
        {/* Номер телефона */}
        <div className="mb-[20px]">
          <p className="text-[14px] font-medium text-black flex items-center gap-[6px]">
            Номер телефона <span className="text-green-600 text-[18px]">✔</span>
          </p>
          <p className="text-[16px] font-bold mt-[4px]">{infoAcc?.phone_number}</p>
          <ChangeNumber />
        </div>

        <hr className="border-t border-gray-200 mb-[20px]" />

        {/* Почта */}
        <div className="mb-[20px]">
          <p className="text-[14px] font-medium text-black mb-[6px] flex items-center gap-[8px]">
            Почта
            <span className="bg-[#D60000] text-white text-[12px] rounded-[4px] px-[8px] py-[2px]">
              Не подтверждено
            </span>
          </p>
          <p className="text-[16px] font-bold break-words">{infoAcc?.email}</p>

          <button className="text-[#0077FF] text-[14px] mt-[4px] hover:underline text-left">
            Отправить ссылку для подтверждения
          </button>
        </div>

        <hr className="border-t border-gray-200 mb-[20px]" />

        {/* Город */}
        <div>
          <p className="text-[14px] font-medium text-black flex items-center gap-[6px]">
            Город проживания <span className="text-green-600 text-[18px]">✔</span>
          </p>
          <p className="text-[16px] font-bold mt-[4px]">Берн</p>
          <button className="text-[#0077FF] text-[14px] mt-[4px] hover:underline">
            Сменить город
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import ChangeNumber from '@/components/ui/Modal/ChangeNumber/ChangeNumber';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import ChangePhoneModal from '@/components/ui/Modal/ModalChangeCityy';
interface UserProfile {
  city: string;
  last_name: string;
  first_name: string;
  user_id: number;
}

interface UserAccount {
  profile: UserProfile;
  user_id: number;
  phone_number: string;
  email: string;
  first_name: string;
}

export default function SettingsProfile() {
  const [userEmail, setUserEmail] = useState<string>('');
  const [infoAcc, setInfoAcc] = useState<UserAccount | null>(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthdate: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchCurrentUser = async (): Promise<void> => {
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;
      try {
        const response = await axios.get<UserAccount>(`${API_BASE_URL}/get_user_info/`, {
          withCredentials: true,
        });

        setInfoAcc(response.data);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error('Ошибка запроса /me/:', error);
      }
    };

    void fetchCurrentUser();
  }, []);

  const userBackgroundColor = userEmail ? stringToColor(userEmail) : '#FFA500';
  const getFirstLetter = (email: string) => {
    return email ? email[0].toUpperCase() : 'U';
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/update_profile/`,
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          birthdate: formData.birthdate,
        },
        { withCredentials: true },
      );

      console.log('Профиль успешно обновлён:', response.data);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row gap-[20px] w-full">
      <div className="w-full lg:max-w-[510px] rounded-[20px] bg-white px-[20px] py-[23px]">
        <div className="flex gap-[10px] items-center mb-[20px]">
          <div
            className="w-12 h-12 rounded-full flex justify-center items-center cursor-pointer"
            style={{ backgroundColor: userBackgroundColor }}
          >
            <span className="text-white">{getFirstLetter(userEmail)}</span>
          </div>
          <div className="font-bold">
            <p>
              {infoAcc?.profile?.last_name} {infoAcc?.profile?.first_name}
            </p>
            <p>ID: {infoAcc?.profile?.user_id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[13px] w-full max-w-[463px]">
          <Input
            name="first_name"
            placeholder="Имя пользователя"
            height="50px"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
          />
          <Input
            name="last_name"
            placeholder="Фамилия"
            height="50px"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
          />
          <Input
            name="birthdate"
            placeholder="Дата рождения"
            height="50px"
            type="date"
            value={formData.birthdate}
            onChange={handleChange}
          />

          <div className="flex flex-col sm:flex-row gap-[15px] mt-[20px]">
            <Button width="100%" height="65px" rounded="15px" color="blue" type="submit">
              Сохранить изменения
            </Button>
            <Button width="100%" height="65px" rounded="15px" color="red">
              Сбросить
            </Button>
          </div>
        </form>
      </div>

      <div className="w-full lg:max-w-[480px] rounded-[20px] bg-white px-[20px] py-[23px] ">
        {/* Номер телефона */}
        <div className="mb-[20px]">
          <p className="text-[14px] font-medium text-black flex items-center gap-[6px]">
            Номер телефона{' '}
            {infoAcc?.phone_number ? (
              <span className="text-green-600 text-[18px]">✔</span>
            ) : (
              <span className="text-red-600 text-[18px]">🗙</span>
            )}
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
            Город проживания{' '}
            {infoAcc?.profile?.city ? (
              <span className="text-green-600 text-[18px]">✔</span>
            ) : (
              <span className="text-red-600 text-[18px]">🗙</span>
            )}
          </p>
          <p className="text-[16px] font-bold mt-[4px]">{infoAcc?.profile?.city}</p>
          <button
            className="text-[#0077FF] text-[14px] mt-[4px] hover:underline"
            onClick={() => setIsPhoneModalOpen(true)}
          >
            Сменить города
          </button>
        </div>
      </div>
      {isPhoneModalOpen && <ChangePhoneModal onClose={() => setIsPhoneModalOpen(false)} />}
    </div>
  );
}

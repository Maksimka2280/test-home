'use client';

import { Input } from '@/components/shared/Input/Input';
import { Button } from '@/components/shared/Button/Button';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { X } from 'lucide-react';

interface ChangePhoneModalProps {
  onClose: () => void;
}

export default function ChangePhoneModal({ onClose }: ChangePhoneModalProps) {
  const [city, setCity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/update_profile/`,
        {
          city,
        },
        { withCredentials: true },
      );

      console.log('Город успешно обновлён:', response.data);
      onClose(); // закрыть модалку после успешного запроса
    } catch (error) {
      console.error('Ошибка при обновлении города:', error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={onClose} />

      <div className="fixed z-50 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-[20px] max-w-[480px] w-full">
        <button
          className="absolute top-2 right-4 text-2xl hover:bg-gray-100 rounded-full px-[8px] py-[8px] transition duration-300"
          onClick={onClose}
        >
          <X size={18} />
        </button>
        <h2 className="text-xl font-bold text-center mb-6">Сменить город</h2>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <Input
              placeholder="Город..."
              type="text"
              className="w-full"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
          </div>

          <Button type="submit" width="100%" height="55px" rounded="15px" color="blue">
            Выбрать
          </Button>
        </form>
      </div>
    </>
  );
}

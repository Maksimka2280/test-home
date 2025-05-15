'use client';
import { useCurrency } from '../../Context/Contextcurrency/Contextcurrency';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { CardType } from '@/types/Card';
interface ResponseData {
  quick_favorites: CardType[];
  favorite_groups: CardType[];
}
export default function MiniCardProfile() {
  const { currencySymbol, convertPrice, isLoading, error } = useCurrency();

  const [favorites, setFavorites] = useState<CardType[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get<ResponseData>(`${API_BASE_URL}/get_user_info/`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setFavorites(response.data.quick_favorites);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    void checkAuth();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!favorites || favorites.length === 0) {
    return <div>Нет избранных квартир</div>;
  }

  return (
    <div className="flex flex-wrap mt-[30px] justify-center sm:justify-start">
      {favorites.map((favorite, index) => {
        const { price, address, city, total_area, floor, rooms } = favorite;

        return (
          <div key={index} className="flex justify-start mb-[30px]">
            <div className="flex justify-center items-center mb-[15px] sm:mb-0 relative">
              <img
                src={'/img/mini-room-img.png'}
                alt="Профиль"
                className="rounded-[15px] w-[87px] h-[87px] object-cover"
              />
            </div>
            <div className="px-[25px] w-full sm:w-auto">
              <div className="flex justify-between items-center">
                <h1 className="text-[18px] sm:text-[20px] font-bold text-center sm:text-left w-full sm:w-auto">
                  {convertPrice(price).toFixed(2)} {currencySymbol}
                </h1>
              </div>
              <p className="text-[14px] sm:text-[15px] text-center sm:text-left mt-1">
                {rooms} комнаты · {total_area} м² · {floor}/{favorite.total_floors} этаж
              </p>
              <p className="text-[#BCBCBC] text-[14px] sm:text-[15px] mt-2">
                {address}, {city}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

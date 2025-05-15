'use client';

import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';
import { MapPin, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleCardId } from '@/store/cardSlice/Cardslice';
import { ModalCard } from '@/types/ModalLayers';

type AdvertData = Record<string, string | number | boolean | null>;

interface MiniCardProps {
  id: number;
}

export default function MiniCard({ id }: MiniCardProps) {
  const { currencySymbol, convertPrice, isLoading, error } = useCurrency();
  const dispatch = useDispatch();

  const selectedIds = useSelector((state: RootState) => state.cards?.selectedIds ?? []);

  const [data, setData] = useState<AdvertData | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await axios.get<{ data: ModalCard }>(`${API_BASE_URL}/adverts/advert/${id}`);
        setData(res.data.data);
      } catch (err) {
        console.error('Ошибка при загрузке объявления:', err);
      }
    };

    void fetchData();
  }, [id]);

  const isChecked = selectedIds.includes(id);

  const handleCheckboxChange = () => {
    dispatch(toggleCardId(id));
  };

  if (!data) return <div>Загрузка...</div>;
  if (isLoading) return <div>Загрузка валюты...</div>;
  if (error) return <div>{error}</div>;

  const priceInRubles: number =
    typeof data.price === 'number'
      ? data.price
      : typeof data.price === 'string' && !isNaN(Number(data.price))
        ? Number(data.price)
        : 0;

  return (
    <div className="flex flex-wrap sm:flex-nowrap mt-[30px] justify-center sm:justify-start">
      <div className="flex justify-center items-center mb-[15px] sm:mb-0 relative">
        <img
          src={'/img/mini-room-img.png'}
          alt="Apartment"
          className="rounded-[15px] w-[130px] h-[130px] object-cover"
        />
      </div>

      <div className="px-[15px] w-full sm:w-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-[18px] sm:text-[22px] font-bold text-center sm:text-left w-full sm:w-auto">
            {convertPrice(priceInRubles ?? 0).toFixed(2)}
            {currencySymbol}
          </h1>
          <div className="flex items-center gap-[10px] sm:ml-[10px]">
            <input
              type="checkbox"
              id={`price-checkbox-${id}`}
              className="hidden"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor={`price-checkbox-${id}`}
              className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer"
            >
              {isChecked && <div className="w-[10px] h-[10px] bg-[#0468FF] rounded-[3px]" />}
            </label>
          </div>
        </div>

        <p className="text-[14px] sm:text-[16px] text-center sm:text-left">
          {data.rooms ?? '1-комн.'} · {data.total_area ?? '49,60'}м² · {data.floor ?? '2'}
          {data.total_floors ?? '5'} этаж
        </p>

        <div className="flex flex-wrap gap-[5px] items-center pt-[8px] justify-center sm:justify-start">
          <div className="flex gap-[6px] items-center justify-center">
            <MapPin color="#9D9D9D" size={17} />
            <p className="text-[14px] sm:text-[16px]">{data.city ?? 'Цюрих'}</p>
          </div>
          <div className="flex gap-[6px] items-center justify-center">
            <Timer color="#9D9D9D" size={17} />
            <p className="text-[14px] sm:text-[16px]">
              <span className="font-bold">{data.time_on_foot_to_subway ?? '14'}</span> минут
            </p>
          </div>
        </div>
        <p className="text-[#BCBCBC] text-[14px] sm:text-[16px] mt-[8px] flex justify-center sm:justify-start">
          {data.address ?? 'Линденштрассе 12'}
        </p>
      </div>
    </div>
  );
}

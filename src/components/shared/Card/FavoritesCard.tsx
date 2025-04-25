'use client';
import {
  CornerUpRight,
  Download,
  EyeOff,
  FolderClosed,
  FolderOpen,
  MapPin,
  Pencil,
  Timer,
  TriangleAlert,
} from 'lucide-react';
import { MiniGreyButton } from '../Button/MinigreyButton/MinigreyButton';
import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';

interface AdvertData {
  id: string;
  title: string;
  address: string;
  city: string;
  description: string;
  price: number;
  rooms: number;
  total_area: number;
  floor: number;
  total_floors: number;
  time_on_foot_to_subway: number;
  living_area: number;
  kitchen_area: number;
}

interface FavoritesCardProps {
  adverts: AdvertData;
}

export default function FavoritesCard({ adverts }: FavoritesCardProps) {
  const { currencySymbol, convertPrice, isLoading, error } = useCurrency();

  const {
    address,
    city,
    description,
    price,
    rooms,
    total_area,
    floor,
    total_floors,
    time_on_foot_to_subway,
  } = adverts;

  if (isLoading) return <div className="flex justify-center mt-[50px]">Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-[30px] mt-[30px]">
      <div>
        <div className="flex flex-wrap justify-center xl:justify-start gap-[10px]">
          <img
            src="/img/Big-appartament.png"
            alt=""
            className="w-[330px] h-[240px] rounded-[20px]"
          />
          <div className="flex flex-wrap sm:flex-col gap-[40px] sm:gap-[15px]">
            <img src="/img/mini-appartament.png" alt="" className="rounded-[20px]" />
            <img src="/img/mini-appartament.png" alt="" className="rounded-[20px]" />
            <img src="/img/mini-appartament.png" alt="" className="rounded-[20px]" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center xl:justify-start gap-[8.5px] mt-[25px]">
          <MiniGreyButton>
            <CornerUpRight size={17} />
          </MiniGreyButton>
          <MiniGreyButton>
            <Pencil size={17} />
          </MiniGreyButton>
          <MiniGreyButton>
            <Download size={17} />
          </MiniGreyButton>
          <MiniGreyButton>
            <TriangleAlert size={17} />
          </MiniGreyButton>
          <MiniGreyButton>
            <FolderClosed size={17} />
          </MiniGreyButton>
          <MiniGreyButton>
            <FolderOpen size={17} />
          </MiniGreyButton>
          <MiniGreyButton>
            <EyeOff size={17} />
          </MiniGreyButton>
          <button className="w-[88px] h-[28px] rounded-[10px] bg-[#E12B2B] text-white text-[12px]">
            Удалить
          </button>
        </div>
      </div>

      <div className="px-[20px] text-center md:text-left max-w-[500px]">
        <div>
          <h1 className="text-[22px] font-bold pb-[5px]">
            {convertPrice(price).toFixed(2)} {currencySymbol}
          </h1>
          <p>
            {rooms}-комн. кв. · {total_area}м² · {floor}/{total_floors} этаж
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-[10px] items-center pt-[15px] pb-[15px]">
          <div className="flex gap-[6px] items-center justify-center">
            <MapPin color="#9D9D9D" size={17} />
            <p className="text-[16px]">{city}</p>
          </div>
          {time_on_foot_to_subway && (
            <div className="flex gap-[6px] items-center justify-center">
              <Timer color="#9D9D9D" size={17} />
              <p className="text-[16px] font-bold">{time_on_foot_to_subway} минут</p>
            </div>
          )}
        </div>

        <p className="text-[#BCBCBC]">{address}</p>

        <div className="mt-[15px] text-[16px] text-[#676767]">{description}</div>
      </div>
    </div>
  );
}

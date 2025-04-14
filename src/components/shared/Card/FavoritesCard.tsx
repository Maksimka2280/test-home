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
import { useState } from 'react';
import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';

export default function FavoritesCard() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const { currencySymbol, convertPrice, isLoading, error } = useCurrency();
  const priceInRubles = 999999999;
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center xl:justify-start  mt-[30px] gap-[30px]">
        <div className=" ">
          <div className="flex flex-wrap justify-center xl:justify-start gap-[10px]">
            <img
              src="/img/Big-appartament.png"
              alt=""
              className="w-[330px] h-[240px] rounded-[20px]"
            />
            <div className="flex flex-wrap sm:flex-col gap-[40px] sm:gap-[15px]">
              <img src="/img/mini-appartament.png" alt="" className=" rounded-[20px]" />
              <img src="/img/mini-appartament.png" alt="" className=" rounded-[20px]" />
              <img src="/img/mini-appartament.png" alt="" className=" rounded-[20px]" />
            </div>
          </div>
          <div className="flex flex-wrap justify-center xl:justify-start gap-[8.5px] mt-[25px] ">
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
        <div>
          <div className=" px-[20px]  text-center xl:text-left">
            <div>
              <h1 className="text-[22px] font-bold pb-[5px]">
                {convertPrice(priceInRubles).toFixed(2)} {currencySymbol}
              </h1>
              <p>1-комн. кв. · 49,60м² · 17/27 этаж</p>
            </div>

            <div className="flex flex-wrap justify-center xl:justify-start gap-[10px] items-center pt-[15px] pb-[15px]">
              <div className="flex gap-[6px] items-center justify-center">
                <MapPin color="#9D9D9D" size={17} />
                <p className="text-[16px]">Островская</p>
              </div>
              <div className="flex gap-[6px] items-center justify-center">
                <Timer color="#9D9D9D" size={17} />
                <p className="text-[16px]">
                  <span className="text-[16px] font-bold">14</span> минут
                </p>
              </div>
            </div>

            <p className="text-[#BCBCBC] ">2-й Амбулаторный проезд, 18</p>
            <p className="max-w-[600px] w-full mt-[15px] text-[14px]">
              Xотите перeеxать в уютную кваpтиpу? Переeзжaйтe жить в caмый экологичный и
              прогрeсcивный pайон Xотите перeеxать в уютную кваpтиpу? Xотите перeеxать в уютную
              кваpтиpу? Переeзжaйтe жить в caмый экологичный и прогрeсcивный pайон Xотите перeеxать
              в уютную кваpтиpу?{' '}
            </p>
            <div className="flex flex-wrap gap-[10px] mt-[25px] justify-end">
              <button className="bg-[#0468FF] w-[155px] h-[30px] rounded-[10px] text-white text-[14px] font-medium">
                +7 (999) 999 99 99
              </button>
              <button className="bg-[#0468FF] w-[155px] h-[30px] rounded-[10px] text-white text-[14px] font-medium">
                Сохранить фильтры
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-[25px]">
          <input
            type="checkbox"
            id="price-checkbox"
            className="hidden"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="price-checkbox"
            className="w-[20px] h-[20px] flex items-center justify-center rounded-[5px] bg-[#ffffff] cursor-pointer transition-all duration-300  "
          >
            {isChecked && (
              <div className="w-[12px] h-[12px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
            )}
          </label>
        </div>
      </div>
    </>
  );
}

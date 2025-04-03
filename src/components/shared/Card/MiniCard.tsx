'use client';
import { MapPin, Timer } from 'lucide-react';
import { useState } from 'react';
import { useCurrency } from '../../Context/Contextcurrency/Contextcurrency';
export default function MiniCard() {
  const { currencySymbol } = useCurrency();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap mt-[30px] justify-center sm:justify-start">
      <div className="flex justify-center items-center mb-[15px] sm:mb-0 relative">
        <img
          src="/img/mini-room-img.png"
          alt=""
          className="rounded-[15px] w-[130px] h-[130px] object-cover"
        />
      </div>

      <div className="px-[15px] w-full sm:w-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-[18px] sm:text-[22px] font-bold text-center sm:text-left w-full sm:w-auto">
            999 999 999 {currencySymbol}
          </h1>

          <div className="flex items-center gap-[10px] sm:static sm:right-auto sm:ml-[10px] sm:w-auto">
            <input
              type="checkbox"
              id="price-checkbox"
              className="hidden"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="price-checkbox"
              className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300"
            >
              {isChecked && (
                <div className="w-[10px] h-[10px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
              )}
            </label>
          </div>
        </div>

        <p className="text-[14px] sm:text-[16px] text-center sm:text-left">
          1-комн. кв. · 49,60м² · 17/27 этаж
        </p>

        <div className="flex flex-wrap gap-[5px] items-center pt-[13px] justify-center sm:justify-start">
          <div className="flex gap-[6px] items-center justify-center">
            <MapPin color="#9D9D9D" size={17} />
            <p className="text-[14px] sm:text-[16px]">Островская</p>
          </div>
          <div className="flex gap-[6px] items-center justify-center">
            <Timer color="#9D9D9D" size={17} />
            <p className="text-[14px] sm:text-[16px]">
              <span className="font-bold">14</span> минут
            </p>
          </div>
          <p className="text-[#BCBCBC] text-[14px] sm:text-[16px]">2-й Амбулаторный проезд, 18</p>
        </div>
      </div>
    </div>
  );
}

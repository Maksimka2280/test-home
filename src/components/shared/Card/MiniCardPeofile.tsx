'use client';
import { useCurrency } from '../../Context/Contextcurrency/Contextcurrency';
export default function MiniCardProfile() {
  const { currencySymbol } = useCurrency();

  return (
    <div className="flex flex-wrap sm:flex-nowrap mt-[30px] justify-center sm:justify-start">
      <div className="flex justify-center items-center mb-[15px] sm:mb-0 relative">
        <img
          src="/img/mini-room-img.png"
          alt=""
          className="rounded-[15px] w-[87px] h-[87px] object-cover"
        />
      </div>
      <div className="px-[25px] w-full sm:w-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-[18px] sm:text-[20px] font-bold text-center sm:text-left w-full sm:w-auto">
            999 999 999 {currencySymbol}
          </h1>
        </div>
        <p className="text-[14px] sm:text-[15px] text-center sm:text-left mt-1">
          1-комн. кв. · 49,60м² · 17/27 этаж
        </p>
        <p className="text-[#BCBCBC] text-[14px] sm:text-[15px] mt-2">
          2-й Амбулаторный проезд, 18
        </p>
      </div>
    </div>
  );
}

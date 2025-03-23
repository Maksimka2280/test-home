'use client';

import { Heart, MapPin, Timer } from 'lucide-react';
import { useState } from 'react';

export const Card = () => {
  const [liked, setLiked] = useState(false);
  const [viewed, setViewed] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const markAsViewed = () => {
    setViewed(true);
  };

  return (
    <div
      className="relative max-w-[330px] bg-[#ffffff] w-full h-[420px] rounded-[20px] cursor-pointer"
      onClick={markAsViewed}
    >


      <div className="h-[50%] bg-[#ffffff] rounded-t-[20px] flex justify-center items-center relative">
        <span className="text-lg">Img</span>
        {/* Всплывающий блок "Просмотрено" */}
        {viewed && (
          <div className="absolute top-2 left-2 w-[120px] h-[30px] bg-white rounded-[50px] flex items-center justify-center shadow-md">
            <p className="text-green-600 font-bold text-sm">Просмотрено</p>
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation(); // предотвращает срабатывание клика на карточку
            toggleLike();
          }}
          className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#ffffff] transition-all"
        >
          <Heart
            size={20}
            className={`transition-all ${liked ? 'fill-[#0468FF]' : 'fill-[#dbdbdb]'}`}
            color={liked ? '#0468FF' : '#fff'}
          />
        </button>
      </div>

      <div className="h-[50%] px-[20px] py-[25px]">
        <div>
          <h1 className="text-[22px] font-bold pb-[15px]">999 999 999 ₽</h1>
          <p>1-комн. кв. · 49,60м² · 17/27 этаж</p>
        </div>

        <div className="flex flex-wrap gap-[10px] items-center pt-[15px] pb-[15px]">
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

        <p className="text-[#BCBCBC]">2-й Амбулаторный проезд, 18</p>
      </div>
    </div>
  );
};

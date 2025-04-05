'use client';

import { Button } from '@/components/shared/Button/Button';
import { Heart, Layers2, MapPin, Timer, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const filterItems = [
  'До метро',
  'Площадь, м2',
  'Этаж',
  'Этажей в доме',
  'Скидки и акции от застройщиков',
  'Ремонт',
  'Год постройки',
  'Балкон/Лоджия',
  'Лифт',
  'Санузел',
  'Парковка',
  'Продавец',
];

interface ModalEditingEquastionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomOrder({ isOpen, onClose }: ModalEditingEquastionsProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleCheckboxChange = (label: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[50]">
      <div
        ref={modalRef}
        className="max-w-[700px] w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] bg-white rounded-[20px] shadow-lg p-5 transition-all duration-300 flex flex-col"
      >
        <h1 className="text-[16px] font-bold mb-[10px]">Кастомизация объявлений</h1>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="max-w-[330px] bg-[#ffffff] w-full min-h-[440px] rounded-[20px] cursor-pointer border border-[#F3F3F3]">
            <div className="h-[237px] bg-[#F3F3F3] rounded-t-[20px] flex justify-center items-center relative">
              <div className="absolute top-2 left-2 w-[120px] h-[30px] bg-[#D9D9D9] rounded-[50px] flex items-center justify-center shadow-md">
                <p className="text-[#152242] font-semibold text-sm select-none">Просмотрено</p>
              </div>
              <button className="absolute top-2 right-12 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#ffffff]">
                <Layers2 size={20} className={'fill-[#dbdbdb]'} color={'#fff'} />
              </button>
              <button className="absolute top-2 right-2 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-[#ffffff]">
                <Heart size={20} className={'fill-[#dbdbdb]'} color={'#fff'} />
              </button>
            </div>
            <div className="h-auto px-[20px] py-[15px]">
              <h1 className="text-[22px] font-bold pb-[5px]">999 999 999</h1>
              <p>1-комн. кв. · 49,60м² · 17/27 этаж</p>
              <div className="flex flex-wrap gap-[10px] items-center pt-[15px] pb-[15px]">
                <div className="flex gap-[6px] items-center">
                  <MapPin color="#9D9D9D" size={17} />
                  <p className="text-[16px]">Островская</p>
                </div>
                <div className="flex gap-[6px] items-center">
                  <Timer color="#9D9D9D" size={17} />
                  <p className="text-[16px]">
                    <span className="font-bold">14</span> минут
                  </p>
                </div>
              </div>
              <p className="text-[#BCBCBC]">2-й Амбулаторный проезд, 18</p>
              <div className="w-[286px] h-[1px] bg-[#F3F3F3] mt-[25px]"></div>

              <div className="mt-2 flex flex-col gap-1">
                {Object.entries(checkedItems).map(([label, isChecked]) =>
                  isChecked ? (
                    <p key={label} className="text-sm">
                      {label}
                    </p>
                  ) : null,
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full h-[100px] overflow-y-auto sm:h-[500px]">
            {filterItems.map((label, index) => {
              const isChecked = checkedItems[label] || false;
              const checkboxId = `filter-checkbox-${index}`;
              return (
                <div key={label} className="flex items-center justify-between ">
                  <p className="text-[14px] md:text-[16px]">{label}</p>
                  <input
                    type="checkbox"
                    id={checkboxId}
                    className="hidden"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(label)}
                  />
                  <label
                    htmlFor={checkboxId}
                    className="w-[15px] md:w-[17px] h-[15px] md:h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300"
                  >
                    {isChecked && (
                      <div className="w-[8px] md:w-[10px] h-[8px] md:h-[10px] bg-[#0468FF] rounded-[3px]"></div>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
          <Button width="420px" height="">
            Применить настройки
          </Button>
        </div>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}

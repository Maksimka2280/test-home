'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCurrency } from '../../Context/Contextcurrency/Contextcurrency';
import { usePriceFilter } from '@/components/Context/ContextPrice/ContextPrice';

export default function PriceModal() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = usePriceFilter(); // Используем контекст фильтра

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currencySymbols: Record<number, string> = {
    1: '₽',
    2: '$',
    3: '₣',
    4: '₴',
    5: '₺',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleCheckboxChange2 = (currencyId: number) => {
    setSelectedCurrency(currencyId);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="flex items-center gap-2 text-base font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-md font-normal text-gray-800 hover:text-blue-600">
          Цена до, {currencySymbols[selectedCurrency]}
        </span>
      </button>

      <div
        ref={modalRef}
        onMouseLeave={() => setIsOpen(false)}
        className={`absolute mt-11 max-w-[360px] w-full bg-white rounded-[30px] shadow-lg
        transition-all duration-500 ease-in-out transform ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'
        }`}
      >
        <div className="flex justify-center gap-4 mb-5 mt-[20px]">
          <div className="relative">
            <input
              type="number"
              placeholder="от"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)} // Обновляем minPrice в контексте
              className="w-[150px] rounded-[30px] bg-[#F3F3F3] h-[40px] pl-[14px] pr-[30px]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {currencySymbols[selectedCurrency]}
            </span>
          </div>

          <div className="relative">
            <input
              type="number"
              placeholder="до"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)} // Обновляем maxPrice в контексте
              className="w-[150px] rounded-[30px] bg-[#F3F3F3] h-[40px] pl-[14px] pr-[30px]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {currencySymbols[selectedCurrency]}
            </span>
          </div>
        </div>

        <button
          className="flex justify-center items-center gap-2 ml-[30px] pb-[20px]"
          onClick={handleToggle}
        >
          <span className="text-[#0468FF] font-medium">Выбрать другую валюту</span>
          <ChevronDown
            size={17}
            strokeWidth={4}
            color="#0468FF"
            className={`transition-transform duration-300 ${visible ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>

        {visible && (
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 ml-[30px] mb-6">
            {[
              { id: 1, name: 'Рубль' },
              { id: 2, name: 'Доллар' },
              { id: 3, name: 'Франк' },
              { id: 4, name: 'Гривна' },
              { id: 5, name: 'Лира' },
            ].map(currency => (
              <li key={currency.id} className="flex items-center w-full">
                <label
                  htmlFor={currency.id.toString()}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="currencyItem"
                    value={currency.id.toString()}
                    checked={selectedCurrency === currency.id}
                    onChange={() => handleCheckboxChange2(currency.id)}
                    className="hidden"
                    id={currency.id.toString()}
                  />
                  <div
                    className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] mr-[8px]"
                    onClick={() => handleCheckboxChange2(currency.id)}
                  >
                    {selectedCurrency === currency.id && (
                      <div className="w-[8px] h-[8px] bg-[#0468FF] rounded-[3px]"></div>
                    )}
                  </div>
                </label>
                <span
                  className={`text-sm cursor-pointer ${selectedCurrency === currency.id ? 'text-[#111]' : 'text-[#ccc]'}`}
                  onClick={() => handleCheckboxChange2(currency.id)}
                >
                  {currency.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function PriceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState<number | null>(null); // изменяем на один элемент
  const [visible, setVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // Ссылка на кнопку

  const handleToggle = () => {
    setVisible(!visible);
  };

  const handleCheckboxChange2 = (currencyId: number) => {
    setSelectedCurrencies(currencyId === selectedCurrencies ? null : currencyId); // изменяем логику на выбор одного
  };

  // Закрытие модалки при клике вне её
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверка, кликнули ли мы вне модалки и кнопки
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Закрыть модалку
      }
    };

    // Добавляем слушатель событий при открытии модалки
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Очистка события при размонтировании компонента
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen); // Переключаем состояние модалки
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button
        ref={buttonRef} // Добавляем ref к кнопке
        className="flex items-center gap-2 text-base font-semibold"
        onClick={handleButtonClick} // теперь клики на кнопку контролируют модалку
      >
        <span className="text-md font-normal text-gray-800 hover:text-blue-600 focus:outline-none">
          Цена до, ₽
        </span>
      </button>

      <div
        ref={modalRef} // Ссылка на модалку
        onMouseLeave={handleMouseLeave}
        className={`absolute mt-11  max-w-[360px] w-full bg-white rounded-[30px] shadow-lg transition-all duration-300 
                    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
      >
        <div className="flex justify-center gap-4 mb-5 mt-[20px]">
          <input
            type="number"
            placeholder="от"
            className="w-[150px] rounded-[30px] bg-[#F3F3F3] border-none h-[40px] pl-[14px] text-[#9D9D9D] focus:outline-none focus:ring-0"
          />
          <input
            type="number"
            placeholder="до"
            className="w-[150px] rounded-[30px] bg-[#F3F3F3] border-none h-[40px] pl-[14px] text-[#9D9D9D] focus:outline-none focus:ring-0"
          />
        </div>

        <button
          className="flex justify-center items-center gap-[10px] ml-[30px] pb-[20px]"
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
                    checked={selectedCurrencies === currency.id}
                    onChange={() => handleCheckboxChange2(currency.id)}
                    className="hidden"
                    id={currency.id.toString()}
                  />
                  <div className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] transition-all duration-300 mr-[8px]">
                    {selectedCurrencies === currency.id && (
                      <div className="w-[8px] h-[8px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
                    )}
                  </div>
                </label>
                <span
                  className={`text-sm cursor-pointer ${selectedCurrencies === currency.id ? 'text-[#111]' : 'text-[#ccc]'}`}
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

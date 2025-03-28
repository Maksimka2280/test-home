'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CategoryItem = {
  id: number;
  name: string;
};

type Categories = {
  Жилая: CategoryItem[];
  Коммерческая: CategoryItem[];
};

const categories: Categories = {
  Жилая: [
    { id: 1, name: 'Квартира в новостройке' },
    { id: 2, name: 'Квартира во вторичке' },
    { id: 3, name: 'Комната' },
    { id: 4, name: 'Дом, дача' },
    { id: 5, name: 'Часть дома' },
    { id: 6, name: 'Таунхаус' },
    { id: 7, name: 'Участок' },
    { id: 8, name: 'Гараж' },
  ],
  Коммерческая: [
    { id: 1, name: 'Офис' },
    { id: 2, name: 'Торговая площадь' },
    { id: 3, name: 'Склад' },
    { id: 4, name: 'Помещение' },
    { id: 5, name: 'Общепит' },
    { id: 6, name: 'Производство' },
    { id: 7, name: 'Автосервис' },
    { id: 8, name: 'Здание' },
    { id: 9, name: 'Бытовые услуги' },
    { id: 10, name: 'Арендный бизнес' },
    { id: 11, name: 'Готовый бизнес' },
    { id: 12, name: 'Коммерческая земля' },
  ],
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof Categories>('Жилая');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Закрытие модалки при клике вне её области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Закрываем модалку
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const handleCategoryChange = (category: keyof Categories) => {
    setActiveCategory(category);
    setSelectedItems([]);
  };

  const toggleModal = () => {
    setIsOpen(prev => !prev); // Переключаем состояние модалки
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center gap-2 text-base font-semibold"
        onClick={toggleModal}
      >
        <span>Аренда</span>
        <ChevronDown
          size={17}
          strokeWidth={4}
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-5 w-max min-w-[305px] sm:ml-[65px] z-[2]
                  bg-white rounded-[30px] shadow-lg transition-all duration-300 ease-in-out
                  ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="flex justify-center gap-4 mb-5 mt-[20px]">
          {Object.keys(categories).map(category => (
            <button
              key={category}
              className={`w-[120px] h-[40px] border border-[#F3F3F3] rounded-[30px] text-sm transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#0468FF] text-white'
                  : 'bg-[#F3F3F3] text-[#9D9D9D]'
              }`}
              onClick={() => handleCategoryChange(category as keyof Categories)}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="flex flex-col gap-3 ml-[30px] mb-6">
          {categories[activeCategory].map(item => (
            <li key={item.id} className="flex items-center justify-between w-full">
              <span
                className="text-[#111] text-sm cursor-pointer"
                onClick={() => handleCheckboxChange(item.id)}
              >
                {item.name}
              </span>
              <input
                type="checkbox"
                name="categoryItem"
                value={item.id.toString()}
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                className="hidden"
                id={item.id.toString()}
              />
              <label
                htmlFor={item.id.toString()}
                className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300 mr-[20px]"
              >
                {selectedItems.includes(item.id) && (
                  <div className="w-[8px] h-[8px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
                )}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

'use client';

import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

type CategoryItem = {
  id: number;
  name: string;
};

type Categories = {
  Info: CategoryItem[];
};

const categories: Categories = {
  Info: [
    { id: 1, name: 'Сравнить из избранного' },
    { id: 2, name: 'Название' },
    { id: 3, name: 'Название' },
    { id: 4, name: 'Название' },
    { id: 5, name: 'Название' },
    { id: 6, name: 'Сравнить с каталогом' },
  ],
};

export default function ModalAddToComparison() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory] = useState<keyof Categories>('Info');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const toggleModal = () => setIsOpen(prev => !prev);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center justify-center gap-1 text-base font-semibold bg-[#0164EB] text-white w-[190px] h-[30px] rounded-[10px]"
        onClick={toggleModal}
      >
        <span className="text-[14px]">Добавить в сравнение</span>
        <ChevronDown
          size={15}
          strokeWidth={3}
          color="#fff"
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
        className={`absolute top-full transform -translate-x-1/2 mt-[10px] w-max min-w-[275px] ml-[95px] z-2
          bg-white rounded-[17px] shadow-lg transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <ul className="flex flex-col ml-[18px] mt-[20px] mb-4">
          {categories[activeCategory].map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === categories[activeCategory].length - 1;
            const isGroupTitle = index === 1;

            if (isGroupTitle) {
              return (
                <li key="group-title" className="font-bold text-[#1A1A1A] text-[13px] my-[10px]">
                  Группа
                </li>
              );
            }

            return (
              <li key={item.id} className={'flex items-center justify-between w-full mb-[15px]'}>
                <span
                  onClick={() => handleCheckboxChange(item.id)}
                  className={`text-[13px] cursor-pointer ${
                    isFirst
                      ? 'font-medium text-[#1A1A1A]'
                      : isLast
                        ? 'text-[#0C1D37]'
                        : 'text-[#A7A7A7]'
                  }`}
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
                  className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300 mr-[17px]"
                >
                  {selectedItems.includes(item.id) && (
                    <div className="w-[8px] h-[8px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

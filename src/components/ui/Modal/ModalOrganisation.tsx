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
    { id: 1, name: 'Магазин' },
    { id: 2, name: 'Школа' },
    { id: 3, name: 'Детский сад' },
    { id: 4, name: 'Больница' },
    { id: 5, name: 'Стоянка' },
  ],
};

type ModalOrganizationsProps = {
  onSelect: (selectedItems: { id: number; name: string }[]) => void; // Функция для передачи выбранных данных
};

export default function ModalOrganizations({ onSelect }: ModalOrganizationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory] = useState<keyof Categories>('Info');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCheckboxChange = async (id: number) => {
    setSelectedItems(prev => {
      const newSelection = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];

      const selectedCategory = categories[activeCategory].find(item => item.id === id);

      if (selectedCategory) {
        onSelect(
          newSelection.map(id => {
            const category = categories[activeCategory].find(item => item.id === id);
            return category ? { id: category.id, name: category.name } : { id: 0, name: '' };
          }),
        );
      }

      console.log(newSelection);

      return newSelection;
    });
  };

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative ">
      <button
        ref={buttonRef}
        className="flex items-center gap-2 text-base font-semibold"
        onClick={toggleModal}
      >
        <span>Инфраструктура</span>
        <ChevronDown
          size={17}
          strokeWidth={4}
          color="#0468FF"
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
        className={`absolute top-full transform -translate-x-1/2 mt-[2px] w-max min-w-[192px] ml-[78.8px] z-2
          bg-white rounded-b-[17px] shadow-lg transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <ul className="flex flex-col gap-5 ml-[18px] mb-6 mt-4">
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
                className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300 mr-[17px]"
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

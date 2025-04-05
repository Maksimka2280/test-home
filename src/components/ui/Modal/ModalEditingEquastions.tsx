'use client';

import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import ReactPaginate from 'react-paginate';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/shared/Button/Button';

// Типизация пропсов компонента
interface ModalEditingEquastionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalEditingEquastions({ isOpen, onClose }: ModalEditingEquastionsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState<string[]>([]);

  const images = ['/img/image123.png', '/img/room-test.png'];
  const modalRef = useRef<HTMLDivElement | null>(null);

  const defaultItems = [
    '1-комн',
    'Общая площадь: 49,60 м²',
    'Этаж: 17/27',
    'До метро: 5 минут',
    'Ипотечные программы: есть',
    'Скидки и акции от застройщиков: есть',
    'Ремонт: дизайнерский',
    'Год постройки: 2022',
    'Тип дома: кирпичный',
    'Балкон/Лоджия: есть',
    'Лифт: нет',
    'Кухонная плита: электричество',
    'Санузел: 2 и более',
    'Вид из окна: на двор',
    'Продавец: собственник',
    'Рейтинг продавца: 4,6',
  ];

  // Инициализация элементов
  useEffect(() => {
    setItems([...defaultItems]);
  }, []);

  // Закрытие модального окна при клике вне его
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

  // Пагинация
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // Удаление элемента
  const removeItem = (index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Сброс к изначальному состоянию
  const resetItems = () => {
    setItems([...defaultItems]);
  };

  // Закрытие модального окна при отсутствии открытия
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[50]">
      <div
        ref={modalRef}
        className="max-w-[400px] w-full bg-white rounded-[20px] shadow-lg p-5 sm:max-w-[350px] transition-all duration-300"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-3 right-1 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        {/* Галерея изображений */}
        <div
          className="rounded-t-[20px] flex justify-center items-center relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex flex-col h-full relative">
            <img
              className="max-w-[424px] w-full h-[160px] sm:h-[240px] rounded-[20px]"
              src={images[currentPage]}
              alt="Пример изображения"
            />
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center">
              <ReactPaginate
                pageCount={images.length}
                onPageChange={handlePageClick}
                containerClassName="flex gap-2 justify-center"
                pageClassName="w-[6px] h-[6px] rounded-full bg-[#FFFFFF] cursor-pointer hover:bg-gray-200 transition select-none"
                activeClassName="bg-blue-500"
                pageLinkClassName="w-[6px] h-[6px] text-transparent select-none"
                previousLabel={
                  <ArrowLeft
                    size={24}
                    color="#FFFFFF"
                    className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  />
                }
                nextLabel={
                  <ArrowRight
                    size={24}
                    color="#FFFFFF"
                    className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  />
                }
                previousClassName="absolute mr-[170px] mt-[-80px] sm:mr-[240px] sm:mt-[-110px] select-none"
                nextClassName="absolute ml-[170px] mt-[-80px] sm:ml-[240px] sm:mt-[-110px] select-none"
              />
            </div>
          </div>
        </div>

        {/* Список параметров */}
        <div className="text-left flex flex-col gap-[3px] px-[10px] text-[12px] mt-5">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span>{item}</span>
              <button
                onClick={() => removeItem(index)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Кнопки действий */}
        <div className="flex gap-2 justify-center items-center mt-[10px]">
          <Button width="220px" height="50px" rounded="15px">
            Сохранить изменения
          </Button>
          <Button width="110px" height="50px" rounded="15px" color="red" onClick={resetItems}>
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
}

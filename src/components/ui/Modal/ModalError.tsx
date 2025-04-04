'use client';

import { useEffect, useRef, useState } from 'react';

export default function ModalError() {
  const [isOpen, setIsOpen] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне модалки
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="max-w-[530px] w-full bg-white rounded-[20px] h-[321px] shadow-lg p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[20px]">Упс... Ошибка!</h1>
            </div>
            <div className="mt-[20px] mb-[30px]">
              <p className="w-[300px] mb-[20px] ">
                В бесплатной версии для сравнения доступно{' '}
                <span className="font-bold">только 2 варианта</span>
              </p>
              <p>Снимите ограничение по подписке</p>
            </div>
            <div className="bg-[#D11D04] rounded-[20px] max-w-[480px] h-[100px] flex text-[#fff] justify-center items-center gap-6">
              <div>
                <p className="text-[14px]">Подписка неактивна:</p>
                <p className="text-[19px] font-bold">Продлите подписку</p>
              </div>
              <div>
                <button className="w-[230px] h-[71px] rounded-[20px] text-[#000000] bg-[#fff] font-bold">
                  Оплатить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import MiniCard from '@/components/shared/Card/MiniCard';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ModalLayers() {
  const [isOpen, setIsOpen] = useState(true); // Открываем модалку сразу

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
            className="max-w-[530px] w-full bg-white rounded-[20px] shadow-lg p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[20px]">Варианты в сравнении</h1>
              <button className="bg-[#fff] border-none text-[#0468FF] text-[15px] ml-auto">
                Удалить
              </button>
            </div>
            <div className="flex flex-col  overflow-y-auto max-h-[500px]">
              <MiniCard />
              <MiniCard />
              <MiniCard />
              <MiniCard />
            </div>

            <div className="mt-[15px]">
              <button className="max-w-[480px] w-full rounded-[15px] bg-[#0164EB] h-[50px] text-white">
                <Link href={'/PageLayers'}>Перейти к сравнению</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

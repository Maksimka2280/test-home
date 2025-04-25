'use client';

import MiniCard from '@/components/shared/Card/MiniCard';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDelCard } from '../../../store/cardSlice/Cardslice';
export default function ModalLayers() {
  const [isOpen, setIsOpen] = useState(true);
  const [layeredIds, setLayeredIds] = useState<number[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const clearStorage = () => {
    dispatch(toggleDelCard());
  };
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

  useEffect(() => {
    const likedIds = Object.keys(localStorage)
      .filter(key => key.endsWith('-layers') && localStorage.getItem(key) === 'true')
      .map(key => parseInt(key.split('-')[0]));

    setLayeredIds(likedIds);
  }, []);

  const handleClearLayers = () => {
    setLayeredIds([]);
    Object.keys(localStorage)
      .filter(key => key.endsWith('-layers'))
      .forEach(key => localStorage.removeItem(key));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="max-w-[530px] w-full bg-white rounded-[20px] shadow-lg p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold text-[20px]">Варианты в сравнении</h1>
              <button
                className="bg-[#fff] border-none text-[#0468FF] text-[15px] ml-auto"
                onClick={() => {
                  handleClearLayers();
                  clearStorage();
                }}
              >
                Удалить
              </button>
            </div>

            <div className="flex flex-col overflow-y-auto max-h-[500px] gap-4">
              {layeredIds.length === 0 ? (
                <p className="text-center text-[#999]">Нет выбранных вариантов</p>
              ) : (
                layeredIds.map(id => <MiniCard key={id} id={id} />)
              )}
            </div>

            <div className="mt-[15px]">
              <Link href="/PageLayers">
                <button className="max-w-[480px] w-full rounded-[15px] bg-[#0164EB] h-[50px] text-white">
                  Перейти к сравнению
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

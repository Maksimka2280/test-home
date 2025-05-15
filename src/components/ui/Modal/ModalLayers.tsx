'use client';

import MiniCard from '@/components/shared/Card/MiniCard';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleDelCard } from '../../../store/cardSlice/Cardslice';
import axios from 'axios';
import { CardType } from '@/types/Card';
import { API_BASE_URL } from '@/config';

export default function ModalLayers() {
  const [isOpen, setIsOpen] = useState(true);
  const [layeredIds, setLayeredIds] = useState<number[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComparisons = async () => {
      try {
        const response = await axios.get<CardType[]>(`${API_BASE_URL}/comparisons/get_all`, {
          withCredentials: true,
        });
        const ids = response.data.map(item => Number(item.id));
        setLayeredIds(ids);
      } catch (error) {
        console.error('Ошибка при получении сравнений:', error);
      }
    };

    void fetchComparisons();
  }, []);

  const clearStorage = () => {
    dispatch(toggleDelCard());
  };

  // Закрытие модалки при клике вне
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

  const handleClearLayers = async () => {
    try {
      await axios.post(`${API_BASE_URL}/comparisons/delete_all`, {
        withCredentials: true,
      });
      setLayeredIds([]);
      clearStorage();
    } catch (error) {
      console.error('Ошибка при удалении сравнений:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="max-w-[530px] w-full bg-white rounded-[20px] shadow-lg p-5 transition-all duration-300"
          >
            <div className="flex justify-between items-center mb-1">
              <h1 className="font-bold text-[20px]">Варианты в сравнении</h1>
              <button
                className="bg-[#fff] border-none text-[#0468FF] text-[15px] ml-auto"
                onClick={handleClearLayers}
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

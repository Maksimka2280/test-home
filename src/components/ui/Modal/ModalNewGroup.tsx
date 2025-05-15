'use client';

import { Edit, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/shared/Button/Button';
import { API_BASE_URL } from '@/config';

interface ModalEditingEquastionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewGroup({ isOpen, onClose }: ModalEditingEquastionsProps) {
  const [groupName, setGroupName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  const handleAddGroup = async () => {
    if (!groupName.trim()) return;
    try {
      setIsLoading(true);

      await axios.post(`${API_BASE_URL}/favorite_groups/add_favorite_group`, null, {
        params: { name: groupName },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setGroupName('');
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении группы:', error);
      alert('Не удалось добавить группу. Проверьте имя.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[50]">
      <div
        ref={modalRef}
        className="max-w-[280px] w-full bg-white rounded-[20px] shadow-lg p-5 transition-all duration-300"
      >
        <button
          onClick={onClose}
          className="absolute right-[43.4%] top-[39%] text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>
        <div className="rounded-t-[20px] flex justify-center items-center relative group">
          <div className="flex flex-col h-full relative">
            {/* <div className="flex gap-[20px] justify-start items-center mb-[15px]">
              <button className="w-[55px] h-[55px] bg-[#e9e8e8] border-[#D5D5D5] rounded-[15px] border-[1px] flex justify-center items-center">
                <Plus size={30} color="#0468FF" />
              </button>
              <h1>Выберите иконку</h1>
            </div> */}
            <div className="relative w-[225px] max-w-md flex items-center">
              <input
                type="text"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Введите название группы"
                className="w-full text-base font-medium text-black placeholder:text-gray-500 placeholder:text-sm focus:outline-none bg-transparent"
              />
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <Edit size={16} />
              </button>
            </div>

            <p className="text-[#0468FF] text-[14px] mt-[5px]">Добавить объявления</p>
            <Button
              color="blue"
              width="230px"
              height="60px"
              rounded="15px"
              className="mt-[15px]"
              onClick={handleAddGroup}
              disabled={isLoading}
            >
              {isLoading ? 'Добавление...' : 'Добавить группу'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

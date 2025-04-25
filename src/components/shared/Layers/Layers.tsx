'use client';

import ModalLayers from '@/components/ui/Modal/ModalLayers';
import { Layers3 } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Layers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [layeredIds, setLayeredIds] = useState<number[]>([]);

  const updateLayeredIds = () => {
    const likedIds = Object.keys(localStorage)
      .filter(key => key.endsWith('-layers') && localStorage.getItem(key) === 'true')
      .map(key => parseInt(key.split('-')[0]));
    setLayeredIds(likedIds);
  };

  useEffect(() => {
    updateLayeredIds();

    const intervalId = setInterval(() => {
      updateLayeredIds();
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // const toggleLayer = (cardId: number) => {
  //   const currentLayerState = localStorage.getItem(`${cardId}-layers`) === 'true';
  //   const newLayerState = !currentLayerState;

  //   if (newLayerState) {
  //     localStorage.setItem(`${cardId}-layers`, 'true');
  //   } else {
  //     localStorage.removeItem(`${cardId}-layers`);
  //   }
  //   setLayeredIds(prevState => {
  //     const newLayeredIds = newLayerState
  //       ? [...prevState, cardId]
  //       : prevState.filter(id => id !== cardId);
  //     return newLayeredIds;
  //   });
  // };

  return (
    <div>
      <div
        className="w-[235px] h-[90px] bg-[#0468FF] rounded-[20px] flex justify-center items-center gap-[15px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-[68px] h-[68px] bg-[#fff] rounded-[10px] flex justify-center items-center">
          <Layers3 size={30} color={'#0468FF'} />
        </div>
        <div>
          <p className="text-[#fff] font-bold">Варианты</p>
          <p className="text-[#fff] font-bold">в сравнении: {layeredIds.length}</p>{' '}
          {/* Отображаем количество */}
        </div>
      </div>

      {isOpen && <ModalLayers />}
    </div>
  );
};

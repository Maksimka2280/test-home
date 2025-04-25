'use client';

import { useEffect, useRef, useState } from 'react';
import { Bike, BusFront, CarFront, Footprints, Timer } from 'lucide-react';

interface ModalTimerProps {
  data: {
    time_transport?: number;
    time_foot?: number;
    time_bus?: number;
    time_bike?: number;
  };
}

export default function ModalTimer({ data }: ModalTimerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const isDataEmpty =
    !data?.time_transport && !data?.time_foot && !data?.time_bus && !data?.time_bike;

  return (
    <>
      <button
        ref={buttonRef}
        className={`flex items-center gap-2 text-base font-semibold transition-colors min-w-[48px] h-[48px] rounded-[38px] justify-center z-[5]
        ${isOpen ? 'bg-[#0468FF] text-white' : 'text-[#BCBCBC]'}`}
        onClick={handleToggle}
      >
        <Timer size={18} color={isOpen ? '#FFFFFF' : '#0468FF'} />
      </button>

      <div
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
        className={`absolute w-[295px] sm:w-[330px] h-[48px] bg-white rounded-[40px] shadow-lg transition-all duration-[600ms] right-2 xl:right-4
        ${isOpen ? 'opacity-100 visibility-visible' : 'opacity-0 visibility-hidden pointer-events-none'}`}
      >
        <div className="flex justify-center items-center gap-2 mr-[40px] mt-[3px]">
          {isDataEmpty ? (
            <div className="text-center font-bold mt-[12px]">Пожалуйста выберите точку</div>
          ) : (
            <ul className="flex flex-wrap gap-2 sm:gap-5 items-center">
              <li className="flex items-center gap-3 h-10">
                <CarFront size={22} color="#BCBCBC" />
                <p className="text-[16px]">{data?.time_transport ?? 0} </p>
              </li>
              <li className="flex items-center gap-3 h-10">
                <BusFront size={22} color="#BCBCBC" />
                <p className="text-[16px]">{data?.time_bus ?? 0} </p>
              </li>
              <li className="flex items-center gap-3 h-10">
                <Bike size={22} color="#BCBCBC" />
                <p className="text-[16px]">{data?.time_bike ?? 0} </p>
              </li>
              <li className="flex items-center gap-3 h-10">
                <Footprints size={22} color="#BCBCBC" />
                <p className="text-[16px]">{data?.time_foot ?? 0} </p>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

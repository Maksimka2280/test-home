'use client';

import { useEffect, useRef, useState } from 'react';
import { Bike, BusFront, CarFront,  Footprints, Timer } from 'lucide-react';

export default function ModalTimer() {
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
          <ul className="flex flex-wrap gap-2 sm:gap-5 items-center">
            <li className="flex items-center gap-3 h-10">
              <CarFront size={22} color="#BCBCBC" />
              <p className="text-[16px]">10</p>
            </li>
            <li className="flex items-center gap-3 h-10">
              <BusFront size={22} color="#BCBCBC" />
              <p className="text-[16px]">10</p>
            </li>
            <li className="flex items-center gap-3 h-10">
              <Bike size={22} color="#BCBCBC" />
              <p className="text-[16px]">10</p>
            </li>
            <li className="flex items-center gap-3 h-10">
              <Footprints size={22} color="#BCBCBC" />
              <p className="text-[16px]">10</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

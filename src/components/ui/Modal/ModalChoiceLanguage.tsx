'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ChoiceLanguage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>('Ru');
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (id: string) => {
    setSelectedButton(id === selectedButton ? null : id);
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
        className="flex items-center gap-2 text-base font-semibold text-[#BCBCBC]"
        onClick={handleToggle}
      >
        <span className="w-[20px]">{selectedButton}</span>
        <ChevronDown
          size={17}
          strokeWidth={4}
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
        className={`absolute z-[4] mt-[145px] max-w-[350px]  w-full bg-white rounded-[30px] shadow-lg transition-all duration-300  right-2 xl:right-40 xl:mt-[150px]
              ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
      >
        <div className="flex justify-center items-center gap-4 py-5 left-0">
          {['Ru', 'En', 'De', 'Fr', 'It', 'Ua'].map(id => (
            <button
              key={id}
              onClick={() => handleButtonClick(id)}
              className={`w-[40px] h-[40px] font-bold rounded-full flex items-center justify-center transition-all duration-300 
                       ${
                         selectedButton === id
                           ? 'bg-[#0468FF] text-white'
                           : 'bg-[#F3F3F3] text-gray-500'
                       }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

'use client';

import { Button } from '@/components/shared/Button/Button';
import MiniCard from '@/components/shared/Card/MiniCard';
import { MapPin, Timer } from 'lucide-react';
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
                        className="w-[530px] bg-white rounded-[20px] shadow-lg p-5 transition-all duration-300"
                    >
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold">Варианты в сравнении</h1>
                            <button className="bg-[#fff] border-none text-[#0468FF] text-[15px] ml-auto">
                                Удалить
                            </button>
                        </div>
                        <div className='flex mt-[30px]'>
                        <MiniCard/>
                        </div>
                        <div className='mt-[35px]'>
                            <Button width='477px' height='65px' rounded='25px' color='blue'>
                                Перейти к сравнению
                            </Button>
                        </div>

                    </div>
                </div >
            )
            }
        </>
    );
    ;
}

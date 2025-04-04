'use client';

import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import { Phone } from 'lucide-react';
import { useState } from 'react';
import SixNumber from './SixNumber';
import Link from 'next/link';

export default function ChangeNumber() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const toggleModal = () => setIsOpen(prev => !prev);
  const openCodeModal = () => {
    setIsOpen(false);
    setIsCodeModalOpen(true);
  };

  return (
    <>
      <Button color="blue" height="37px" rounded="10px" width="100px" onClick={toggleModal}>
        Войти
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={toggleModal}
          ></div>

          <div className="fixed left-1/2 transform -translate-x-1/2 bg-white z-50 w-full max-w-[580px] h-[60vh] md:h-[440px] rounded-[30px] transition-all duration-500 ease-in-out overflow-auto p-4 md:p-6">
            <button
              className="absolute top-4 right-4 text-5xl text-[#BCBCBC] hover:text-black"
              onClick={toggleModal}
            >
              ×
            </button>

            <div className="flex flex-col justify-center items-center">
              <img src="/img/logo.jpg" alt="" className="w-[90px] h-[90px] rounded-[40px]" />
              <h1 className="font-bold text-[33px] text-center">Смена номера телефона</h1>
              <form className="mt-[40px] max-w-[400px] w-full">
                <div className="flex flex-col gap-[20px] ">
                  <div className="relative w-full ">
                    <Phone
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={14}
                      color="#9D9D9D"
                    />
                    <Input placeholder="Телефон" type="number" className="pl-10 w-full" />
                  </div>
                </div>
              </form>

              <div className="flex gap-[20px] mt-[20px] max-w-[400px] w-full">
                <Button
                  width="100%"
                  height="70px"
                  rounded="15px"
                  color="blue"
                  onClick={openCodeModal}
                >
                  Отправить код подтверждения
                </Button>
              </div>
            </div>
            <Link href={'#'}>
              <p className="text-[#0468FF] text-center mt-[20px]">Нужна помощь</p>
            </Link>
          </div>
        </>
      )}

      {/* Модалка для ввода кода */}
      {isCodeModalOpen && <SixNumber onClose={() => setIsCodeModalOpen(false)} />}
    </>
  );
}

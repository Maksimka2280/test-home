'use client';

import { Button } from '@/components/shared/Button/Button';
import Link from 'next/link';

export default function SixNumber({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
        onClick={onClose}
      ></div>

      <div className="fixed left-1/2 transform -translate-x-1/2 bg-white z-50 w-full max-w-[480px] sm:max-w-[580px] h-[50vh] sm:h-[440px] rounded-[30px] transition-all duration-500 ease-in-out overflow-auto p-4 md:p-6">
        <button
          className="absolute top-4 right-4 text-5xl text-[#BCBCBC] hover:text-black"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex flex-col justify-center items-center">
          <img
            src="/img/logo.jpg"
            alt=""
            className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] rounded-[40px]"
          />
          <h1 className="font-bold text-[28px] sm:text-[33px] text-center">Введите код</h1>

          <div className="flex gap-2 mt-6 max-w-[350px] sm:max-w-[400px] w-full">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-11 sm:w-[60px] h-11 sm:h-[60px] text-xl sm:text-2xl text-center bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <div className="flex max-w-[350px] sm:max-w-[400px] w-full gap-[20px] mt-[20px]">
            <Button width="100%" height="70px" rounded="15px" color="blue">
              Подтвердить
            </Button>
          </div>
        </div>
        <Link href={'#'}>
          <p className="text-[#0468FF] text-center mt-[20px]">Нужна помощь</p>
        </Link>
      </div>
    </>
  );
}

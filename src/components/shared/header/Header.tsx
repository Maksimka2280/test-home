'use client';
import { useState } from 'react';
import ChoiceLanguage from '@/components/ui/Modal/ModalChoiceLanguage';
import Link from 'next/link';
import { MiniGreyLine } from '../Filters/mini-grey-line';
import { Bell, Heart, Menu, X } from 'lucide-react';
import { Button } from '../Button/Button';

export default function Header() {
  const [isOpen2, setIsOpen2] = useState(false);
  const handleMouseLeave = () => {
    setIsOpen2(false);
  };

  return (
    <>
      <header className="w-full flex justify-center relative">
        <div className="max-w-[1440px] 2xl:max-w-[1810px] w-full flex justify-between items-center px-6 py-4">
          <div>Логотип</div>
          <ul className="hidden xl:flex gap-[50px]">
            <li>
              <Link href={'#'} className="text-[14px]">
                Подробнее о проекте
              </Link>
            </li>
            <li>
              <Link href={'#'} className="text-[14px]">
                Тарифы
              </Link>
            </li>
            <li>
              <Link href={'#'} className="text-[14px]">
                Справочный центр
              </Link>
            </li>
            <li>
              <Link href={'#'} className="text-[#c2c2c2] text-[14px]">
                Подписки на e-mail оповещения
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-6">
            <ChoiceLanguage />
            <MiniGreyLine height="30px" />
            <Heart size={20} color={'#dbdbdb'} />
            <Bell size={20} color={'#dbdbdb'} />

            <div className="hidden xl:block">
              <Button color="blue" height="37px" rounded="10px" width="100px">
                Войти
              </Button>
            </div>

            <button
              className={`xl:hidden transition-transform duration-300 ${
                isOpen2 ? 'rotate-90' : 'rotate-0'
              }`}
              onClick={() => setIsOpen2(!isOpen2)}
            >
              {isOpen2 ? (
                <X size={24} className="transition-transform duration-300 rotate-180" />
              ) : (
                <Menu size={24} className="transition-transform duration-300 rotate-0" />
              )}
            </button>
          </div>
        </div>

        <div
          onMouseLeave={handleMouseLeave}
          className={`absolute top-16 right-0 w-full bg-white shadow-md p-4 flex flex-col gap-4 xl:hidden transition-[max-height,opacity] duration-700 ease-in-out ${
            isOpen2 ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="absolute top-4 right-4">
            <Button color="blue" height="37px" rounded="10px" width="100px">
              Войти
            </Button>
          </div>

          <Link href={'#'} className="text-[14px]">
            Подробнее о проекте
          </Link>
          <Link href={'#'} className="text-[14px]">
            Тарифы
          </Link>
          <Link href={'#'} className="text-[14px]">
            Справочный центр
          </Link>
          <Link href={'#'} className="text-[#c2c2c2] text-[14px]">
            Подписки на e-mail оповещения
          </Link>
        </div>
      </header>
      <div className="bg-[#BCBCBC] h-[1px] w-full max-w-[1400px] 2xl:max-w-[1755px] mx-auto"></div>
    </>
  );
}

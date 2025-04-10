'use client';
import Link from 'next/link';

export default function MainFooter() {
  return (
    <footer className="w-full bg-[#F3F3F3] py-8">
      <div className="max-w-[1440px] 2xl:max-w-[1810px] w-full flex justify-between items-center px-6 mx-auto"></div>

      <div className="bg-[#BCBCBC] h-[1px] w-full max-w-[1400px] 2xl:max-w-[1755px] mx-auto mt-6"></div>

      <div className="text-center text-[12px] py-4">
        <p>&copy; 2025 Ваша компания. Все права защищены.</p>
        <ul className="flex flex-wrap justify-center gap-8 mt-4 text-[12px]">
          <li>
            <Link href={'#'} className="text-[#c2c2c2]">
              Контакты
            </Link>
          </li>
          <li>
            <Link href={'#'} className="text-[#c2c2c2]">
              Политика конфиденциальности
            </Link>
          </li>
          <li>
            <Link href={'#'} className="text-[#c2c2c2]">
              Условия использования
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../Button/Button';
import { ButtonBlackWhite } from '../Button/ButtonBlackWhite';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';

interface BigCardProps {
  onEditComparison: () => void; // Пропс для открытия модального окна
}

export default function BigCard({ onEditComparison }: BigCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { currencySymbol } = useCurrency();
  const images = ['/img/image123.png', '/img/room-test.png'];

  const pageCount = Math.ceil(images.length);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="relative max-w-[330px] w-full min-h-[1040px] rounded-[20px] cursor-pointer">
      <div
        className="rounded-t-[20px] flex justify-center items-center relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex-grow relative">
            <img
              className="max-w-[330px] w-full h-[240px] rounded-[20px]"
              src={images[currentPage]}
              alt=""
            />

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center">
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="flex gap-2 justify-center relative"
                pageClassName="w-[6px] h-[6px] flex items-center justify-center rounded-full bg-[#FFFFFF] cursor-pointer hover:bg-gray-200 transition select-none"
                activeClassName="bg-blue-500"
                pageLinkClassName="w-[6px] h-[6px] flex items-center justify-center text-transparent select-none"
                renderOnZeroPageCount={null}
                pageRangeDisplayed={4}
                breakLabel={null}
                previousLabel={
                  <ArrowLeft
                    size={24}
                    color="#FFFFFF"
                    className={`hidden sm:block transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  />
                }
                nextLabel={
                  <ArrowRight
                    size={24}
                    color="#FFFFFF"
                    className={`hidden sm:block transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  />
                }
                previousClassName="hidden sm:block absolute mr-[270px] mt-[-110px] select-none"
                nextClassName="hidden sm:block absolute ml-[270px] mt-[-110px] select-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center max-w-[330px] w-full">
        <div className="flex flex-col gap-6 mt-[20px]">
          <Button color="blue" width="330px" height="60px" rounded="15px">
            Показать телефон
          </Button>
          <ButtonBlackWhite height="60px" width="330px" rounded="15px">
            Написать
          </ButtonBlackWhite>
        </div>

        <div className="space-y-[25px] py-[35px]">
          <p className="text-[#BCBCBC] text-[14px] sm:text-[16px]">2-й Амбулаторный проезд, 18</p>
          <h1 className="text-[18px] sm:text-[22px] font-bold">999 999 999 {currencySymbol}</h1>
          <p>1-комн</p>
          <p>Общая площадь: 49,60 м²</p>
          <p>Этаж: 17/27</p>
          <p>До метро: 5 минут</p>
          <p>Ипотечные программы: есть</p>
          <p>Скидки и акции от застройщиков: есть</p>
          <p>Ремонт: дизайнерский</p>
          <p>Год постройки: 2022</p>
          <p>Тип дома: кирпичный</p>
          <p>Балкон/Лоджия: есть</p>
          <p>Лифт: нет</p>
          <p>Кухонная плита: электричество</p>
          <p>Санузел: 2 и более</p>
          <p>Вид из окна: на двор</p>
          <p>Продавец: собственник</p>
          <p>Рейтинг продавца: 4,6</p>
          <Button width="330px" height="60px" color="blue" onClick={onEditComparison}>
            Редактировать сравнение
          </Button>
        </div>
      </div>

      <div className="absolute left-[-15px] top-0 h-[97.5%] bg-[#BCBCBC] w-[2px] rounded-r-[10px]" />
    </div>
  );
}

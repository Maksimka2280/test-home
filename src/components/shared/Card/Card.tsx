'use client';

import { ArrowLeft, ArrowRight, Heart, MapPin, Timer } from 'lucide-react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

export const Card = () => {
  const [liked, setLiked] = useState(false);
  const [viewed, setViewed] = useState(false);

  const [isHovered, setIsHovered] = useState(false); // Состояние для отслеживания наведения
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = 3; // Например, количество картинок

  const images = [
    '/img/image123.png',
    '/img/new-build.svg',
    '/img/another-image.png', // добавьте свои изображения сюда
  ];

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };



  const toggleLike = () => {
    setLiked(!liked);
  };

  const markAsViewed = () => {
    setViewed(true);
  };

  return (
    <div
      className="relative max-w-[330px] bg-[#ffffff] w-full h-[420px] rounded-[20px] cursor-pointer"
      onClick={markAsViewed}
    >
      <div
        className="h-[50%] bg-[#ffffff] rounded-t-[20px] flex justify-center items-center relative group"
        onMouseEnter={() => setIsHovered(true)} // При наведении
        onMouseLeave={() => setIsHovered(false)} // При уходе с элемента
      >
        <div className="flex flex-col h-full relative">
          <div className="flex-grow relative">
          <img src={images[currentPage]} alt="" />
            {/* Пагинация по центру, появляется только при наведении */}
            <div
              className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center ${isHovered ? 'block' : 'hidden'}`}
            >
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
                previousLabel={<ArrowLeft size={24} color="#FFFFFF" />}
                nextLabel={<ArrowRight size={24} color="#FFFFFF" />}
                previousClassName="absolute mr-[270px] mt-[-110px] select-none"
                nextClassName="absolute ml-[270px] mt-[-110px] select-none"
              />
            </div>

          </div>
        </div>

        {viewed && (
          <div className="absolute top-2 left-2 w-[120px] h-[30px] bg-white rounded-[50px] flex items-center justify-center shadow-md">
            <p className="text-green-600 font-bold text-sm select-none">Просмотрено</p>

          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
          className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#ffffff] transition-all"
        >
          <Heart
            size={20}
            className={`transition-all ${liked ? 'fill-[#0468FF]' : 'fill-[#dbdbdb]'}`}
            color={liked ? '#0468FF' : '#fff'}
          />
        </button>
      </div>

      <div className="h-[50%] px-[20px] py-[23px] mt-[20px]">
        <div>
          <h1 className="text-[22px] font-bold pb-[5px]">999 999 999 ₽</h1>
          <p>1-комн. кв. · 49,60м² · 17/27 этаж</p>
        </div>

        <div className="flex flex-wrap gap-[10px] items-center pt-[15px] pb-[15px]">
          <div className="flex gap-[6px] items-center justify-center">
            <MapPin color="#9D9D9D" size={17} />
            <p className="text-[16px]">Островская</p>
          </div>
          <div className="flex gap-[6px] items-center justify-center">
            <Timer color="#9D9D9D" size={17} />
            <p className="text-[16px]">
              <span className="text-[16px] font-bold">14</span> минут
            </p>
          </div>
        </div>

        <p className="text-[#BCBCBC]">2-й Амбулаторный проезд, 18</p>
      </div>
    </div>
  );
};

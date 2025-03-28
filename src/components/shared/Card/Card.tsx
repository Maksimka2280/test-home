'use client';

import { ArrowLeft, ArrowRight, Heart, Layers2, MapPin, Timer } from 'lucide-react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

export const Card = () => {
  const [liked, setLiked] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [Layers, setLayers] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const images = ['/img/image123.png', '/img/room-test.png'];

  // Количество картинок
  const pageCount = Math.ceil(images.length);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const toggleLike = () => {
    setLiked(!liked);
    markAsViewed();
  };
  const toggleLayers = () => {
    setLayers(!Layers);
    markAsViewed();
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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full relative">
          <div className="flex-grow relative">
            <img
              className="max-w-[330px] w-full h-[240px] rounded-t-[20px]"
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
                    className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  />
                }
                nextLabel={
                  <ArrowRight
                    size={24}
                    color="#FFFFFF"
                    className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                  />
                }
                previousClassName="absolute mr-[270px] mt-[-110px] select-none"
                nextClassName="absolute ml-[270px] mt-[-110px] select-none"
              />
            </div>
          </div>
        </div>

        {viewed && (
          <div className="absolute top-2 left-2 w-[120px] h-[30px] bg-white rounded-[50px] flex items-center justify-center shadow-md">
            <p className="text-green-600 font-semibold text-sm select-none">Просмотрено</p>
          </div>
        )}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleLayers();
          }}
          className="absolute top-2 right-12 w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#ffffff] transition-all"
        >
          <Layers2
            size={20}
            className={`transition-all ${Layers ? 'fill-[#0468FF]' : 'fill-[#dbdbdb]'}`}
            color={'#fff'}
          />
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            toggleLike();
          }}
          className="absolute top-2 right-2 w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#ffffff] transition-all"
        >
          <Heart
            size={20}
            className={`transition-all ${liked ? 'fill-[#0468FF]' : 'fill-[#dbdbdb]'}`}
            color={'#fff'}
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

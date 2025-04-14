import {
  ArrowLeft,
  ArrowRight,
  CornerUpRight,
  Download,
  FolderClosed,
  MapPin,
  Pencil,
  Timer,
  TriangleAlert,
} from 'lucide-react';
import { MiniGreyButton } from '../Button/MinigreyButton/MinigreyButton';
import { useState } from 'react';
import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';
import ReactPaginate from 'react-paginate';
export default function FavoritesLKCard() {
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = ['/img/image123.png', '/img/room-test.png'];
  const pageCount = images.length;

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const { currencySymbol, convertPrice, isLoading, error } = useCurrency();
  const priceInRubles = 999999999;
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="flex flex-wrap justify-center xl:justify-start mt-[30px] gap-[30px]">
        <div>
          {/* Блок изображения с пагинацией */}
          <div
            className=" w-[250px] h-[230px] sm:w-[330px] rounded-[20px] overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={images[currentPage]} alt="Favorite object" />
            {/* Пагинация */}
            <div className="mt-[-25px]">
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="flex gap-2 justify-center relative"
                pageClassName="w-[6px] h-[6px] flex items-center justify-center rounded-full bg-[#FFFFFF] cursor-pointer hover:bg-gray-200 transition select-none"
                activeClassName="bg-blue-500"
                pageLinkClassName="w-[6px] h-[6px] flex items-center justify-center text-transparent select-none"
                renderOnZeroPageCount={null}
                pageRangeDisplayed={3}
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

          {/* Кнопки */}
          <div className="flex flex-wrap justify-center xl:justify-start gap-[8.5px] sm:mt-[25px]">
            <MiniGreyButton>
              <CornerUpRight size={17} />
            </MiniGreyButton>
            <MiniGreyButton>
              <Pencil size={17} />
            </MiniGreyButton>
            <MiniGreyButton>
              <Download size={17} />
            </MiniGreyButton>
            <MiniGreyButton>
              <TriangleAlert size={17} />
            </MiniGreyButton>
            <MiniGreyButton>
              <FolderClosed size={17} />
            </MiniGreyButton>
            <button className="w-[88px] h-[28px] rounded-[10px] bg-[#E12B2B] text-white text-[12px]">
              Удалить
            </button>
          </div>
        </div>

        {/* Текстовая информация */}
        <div>
          <div className="px-[20px] text-center xl:text-left">
            <h1 className="text-[22px] font-bold pb-[5px]">
              {convertPrice(priceInRubles).toFixed(2)} {currencySymbol}
            </h1>
            <p>1-комн. кв. · 49,60м² · 17/27 этаж</p>
            <div className="flex flex-wrap justify-center xl:justify-start gap-[10px] items-center pt-[15px] pb-[15px]">
              <div className="flex gap-[6px] items-center justify-center">
                <MapPin color="#9D9D9D" size={17} />
                <p className="text-[16px]">Островская</p>
              </div>
              <div className="flex gap-[6px] items-center justify-center">
                <Timer color="#9D9D9D" size={17} />
                <p className="text-[16px]">
                  <span className="font-bold">14</span> минут
                </p>
              </div>
            </div>

            <p className="text-[#BCBCBC]">2-й Амбулаторный проезд, 18</p>
            <p className="max-w-[600px] mt-[15px] text-[14px]">
              Хотите переехать в уютную квартиру? Переезжайте в самый экологичный и прогрессивный
              район...
            </p>

            <div className="flex flex-wrap gap-[10px] mt-[25px] justify-end">
              <button className="bg-[#0468FF] w-[155px] h-[30px] rounded-[10px] text-white text-[14px] font-medium">
                +7 (999) 999 99 99
              </button>
              <button className="bg-[#0468FF] w-[155px] h-[30px] rounded-[10px] text-white text-[14px] font-medium">
                Сохранить фильтры
              </button>
            </div>
          </div>
        </div>

        {/* Чекбокс */}
        <div className="flex items-start gap-[25px]">
          <input
            type="checkbox"
            id="price-checkbox"
            className="hidden"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="price-checkbox"
            className="w-[20px] h-[20px] flex items-center justify-center rounded-[5px] bg-white cursor-pointer"
          >
            {isChecked && <div className="w-[12px] h-[12px] bg-[#0468FF] rounded-[3px]" />}
          </label>
        </div>
      </div>
    </>
  );
}

'use client';
import { DefFilters } from '@/components/shared/Filters/default-filters';
import { Input } from '@/components/shared/Input/Input';
import { PopularSearches } from '@/components/shared/Filters/Popular-searches';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import './style/main.css';
import { Button } from '@/components/shared/Button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CityList from '@/components/ui/CityRender/CityRender';
import ModalMoreFilter from '@/components/ui/Modal/ModalMoreFilters';
import { Layers } from '@/components/shared/Layers/Layers';
import { API_BASE_URL } from '@/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { usePriceFilter } from '@/components/Context/ContextPrice/ContextPrice';
import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';
import { FilteredCards } from '@/components/shared/Filters/filterConditions';
import { CardType } from '@/types/Card';

export default function Home() {
  const { convertPrice } = useCurrency();
  const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);
  const { minPrice, maxPrice } = usePriceFilter();
  const [cards, setCards] = useState<CardType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption] = useState<string>('asc');

  const fetchData = async (page: number): Promise<void> => {
    try {
      const response = await axios.get<{ items: CardType[]; total_pages: number }>(
        `${API_BASE_URL}/adverts/adverts_list/`,
        {
          params: {
            page: page,
            page_size: 30,
          },
        },
      );
      console.log(response);

      setCards(response.data.items);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    void fetchData(page);
  }, [page]);

  const sortedCards = [...cards].sort((a, b) => {
    if (sortOption === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const filteredCards = sortedCards.filter(card => {
    const cardPrice = convertPrice(card.price);

    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    const hasMin = min !== null && !isNaN(min);
    const hasMax = max !== null && !isNaN(max);

    if (hasMin && hasMax) {
      return cardPrice >= min && cardPrice <= max;
    }
    if (hasMin) return cardPrice >= min;
    if (hasMax) return cardPrice <= max;

    return true;
  });

  const handlePageChange = (selectedPage: { selected: number }) => {
    setPage(selectedPage.selected + 1);
  };

  return (
    <>
      <div>
        <div className="flex justify-center mb-[35px] pr-[10px] mt-[35px]">
          <div className="flex flex-wrap items-center justify-center lg:justify-between w-full max-w-[1360px] 2xl:max-w-[1760px] ">
            <p className="text-center sm:text-left w-full sm:w-auto">
              Сервис для поиска недвижимости в Швейцарии
            </p>

            <div className="min-w-[200px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[360px] xl:min-w-[380px] max-w-full bg-[#F3F3F3] rounded-[15px] ml-[10px] flex sm:flex-row flex-col gap-3 sm:gap-2 justify-center sm:items-center p-[18px]">
              <p className="text-[#BCBCBC] text-[16px] text-center sm:text-left whitespace-nowrap">
                Выбрано городов:{' '}
                <span className="text-[#0468FF] font-semibold text-[16px] pl-[6px]">
                  {selectedCities.length}
                </span>
              </p>

              <div className="w-[17px] h-[17px] flex-shrink-0 mx-auto sm:mx-0">
                <MapPin color="#0164EB" size={17} />
              </div>

              <CityList />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="max-w-[1385px] 2xl:max-w-[1800px]  w-full  bg-[#FFFFFF] rounded-[40px] h-[auto] py-[50px] px-[30px] ">
            <h1 className="font-bold text-[30px] md:text-[50px] pb-[30px] text-center sm:text-left">
              Подходящая недвижимость
            </h1>
            <Input
              placeholder="Коммерческая недвижимость в аренду Санкт-Галлен"
              type="search"
              className="max-w-[1320px] 2xl:max-w-[1740px]"
            />
            <div className="py-[20px] pl-[5px]">
              <ModalMoreFilter />
            </div>

            <div className="flex justify-center sm:justify-start gap-[20px] 2xl:gap-[70px] items-center flex-wrap ">
              <DefFilters />
              <Link
                className="max-w-[185px] 2xl:max-w-[250px] w-full h-[60px] rounded-[15px] bg-[#f3f3f3] flex justify-center items-center gap-[35px]"
                href={'/Map'}
              >
                <p className="text-[16px] xl:text-[18px]">На карте</p>
                <MapPin color="#9D9D9D" size={19} />
              </Link>
              <Button width="250px" height="60px" rounded="15px" color="blue">
                Показать 29 вариантов
              </Button>
              <Button width="130px" height="60px" rounded="15px" color="red">
                Сбросить
              </Button>
            </div>

            <h2 className="text-[#BCBCBC] py-[25px]">Часто ищут</h2>
            <div className="flex gap-[20px] justify-center items-center flex-wrap">
              <PopularSearches img="/img/new-build.svg" title="Новостройки" number={23} />
              <PopularSearches img="/img/lease.svg" title="Аренда ·  " number={23} />
              <PopularSearches img="/img/buy-build.svg" title="Купить ·  " number={23} />
              <PopularSearches img="/img/commercial.svg" title="Коммерческая ·  " number={23} />
              <PopularSearches img="/img/forsell.svg" title="Продажа ·  " number={23} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-[90px]">
          <h1 className="text-[28px] font-bold max-w-[1380px] 2xl:max-w-[1800px] w-full mb-[40px] text-center xl:text-left">
            Могут подойти
          </h1>

          <div className="flex flex-wrap gap-[20px] max-w-[1400px] 2xl:max-w-[1870px] justify-center">
            <FilteredCards cards={filteredCards} />
          </div>
          <div className="mt-6 flex justify-center">
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName="flex gap-2 items-center"
              pageClassName="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white text-gray-700 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 select-none"
              activeClassName=" font-semibold border-2 border-blue-700"
              pageLinkClassName="w-full h-full flex items-center justify-center text-center text-sm font-semibold"
              previousLabel="‹"
              nextLabel="›"
              previousClassName="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white text-gray-700 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 select-none"
              nextClassName="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-white text-gray-700 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-300 select-none"
              previousLinkClassName="w-full h-full flex items-center justify-center"
              nextLinkClassName="w-full h-full flex items-center justify-center"
            />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 p-4">
        <Layers />
      </div>
    </>
  );
}

import { Button } from '@/components/shared/Button/Button';
import { Card } from '@/components/shared/Card/Card';
import { DefFilters } from '@/components/shared/Filters/default-filters';
import { Input } from '@/components/shared/Filters/Input';
import { PopularSearches } from '@/components/shared/Filters/Popular-searches';
import { ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import './style/main.css';
import { Layers } from '@/components/shared/Layers/Layers';

export default function Home() {
  return (
    <>
      <div>
        <div className="flex justify-center mb-[35px] pr-[10px] mt-[35px]">
          <div className="flex flex-wrap items-center justify-between w-full max-w-[1360px] 2xl:max-w-[1760px]  ">
            <p className="text-center sm:text-left w-full sm:w-auto">
              Сервис для поиска недвижимости в Швейцарии
            </p>

            <div className="flex gap-2 justify-center items-center w-full sm:w-auto mt-2 sm:mt-0">
              <p className="text-[#BCBCBC] text-[14px] text-center sm:text-left w-full sm:w-auto">
                Выбрано городов <span className="text-[#0164EB] font-bold pl-1">5</span>
              </p>

              <div className="w-[17px] h-[17px]">
                <MapPin color="#0164EB" size={17} /> {/* Размер иконки остается фиксированным */}
              </div>
              <p className="font-bold text-center sm:text-left w-full sm:w-auto">
                Санкт-Галлен / Берн / Цюрих / Женева / Базель{' '}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="max-w-[1385px] 2xl:max-w-[1800px]  w-full  bg-[#FFFFFF] rounded-[40px] h-[auto] py-[50px] px-[30px] ">
            <h1 className="font-bold text-[37px] md:text-[50px] pb-[30px]">
              Подходящая недвижимость
            </h1>
            <Input
              placeholder="Коммерческая недвижимость в аренду Санкт-Галлен"
              type="search"
              className="max-w-[1320px] 2xl:max-w-[1740px]"
            />

            <Link href={'#'} className="flex items-center font-bold text-[#0468FF] py-[25px]">
              Больше фильтров{' '}
              <ChevronRight size={14} color="#0468FF" fontWeight="bold" strokeWidth={3} />
            </Link>
            <div className="flex  gap-[20px] 2xl:gap-[70px]  items-center flex-wrap ">
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
        <div className="flex flex-col  items-center mt-[90px]">
          <h1 className="text-[28px] font-bold  max-w-[1380px] 2xl:max-w-[1800px] w-full mb-[40px] text-center xl:text-left">
            Могут подойти
          </h1>
          <div className="flex flex-wrap gap-[20px] max-w-[1400px] 2xl:max-w-[1870px] justify-center">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 p-4">
        <Layers />
      </div>
    </>
  );
}

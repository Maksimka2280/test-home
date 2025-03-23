import { Text } from '@/components';
import { Button } from '@/components/shared/Button/Button';
import { Card } from '@/components/shared/Card/Card';
import { DefFilters } from '@/components/shared/Filters/default-filters';
import { Input } from '@/components/shared/Filters/Input';
import { PopularSearches } from '@/components/shared/Filters/Popular-searches';
import { ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className="flex justify-center mb-[35px] ">
        <div className="flex flex-wrap items-center justify-between w-[1360px]">
          <p>Сервис для поиска недвижимости в Швейцарии</p>

          <div className="flex gap-2 justify-center items-center">
            <p className="text-[#BCBCBC] text-[14px]">
              Выбрано городов <span className="text-[#0164EB] font-bold pl-1">5</span>
            </p>
            <MapPin color="#0164EB" size={17} />
            <p className="font-bold">Санкт-Галлен / Берн / Цюрих / Женева / Базель </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="max-w-[1385px] w-full  bg-[#FFFFFF] rounded-[40px] h-[620px] py-[30px] px-[30px] ml-[30px]">
          <h1 className="font-bold text-[50px] pb-[30px]">Подходящая недвижимость</h1>
          <Input
            placeholder="Коммерческая недвижимость в аренду Санкт-Галлен"
            type="search"
            maxWidth="1320px"
          />
          <Link href={'#'} className="flex items-center font-bold text-[#0468FF] py-[25px]">
            Больше фильтров{' '}
            <ChevronRight size={12} color="#0468FF" fontWeight="bold" strokeWidth={3} />
          </Link>
          <div className="flex  gap-[20px]  items-center flex-wrap ">
            <DefFilters />
            <Link
              className="max-w-[185px] w-full h-[60px] rounded-[15px] bg-[#f3f3f3] flex justify-center items-center gap-[35px]"
              href={'#'}
            >
              <Text size="md" weight="normal" color="default">
                На карте
              </Text>
              <MapPin color="#9D9D9D" size={17} />
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
      <div className="flex flex-col ml-[40px] items-center mt-[90px]">
        <h1 className="text-[28px] font-bold text-left max-w-[1380px] w-full mb-[40px]">
          Могут подойти
        </h1>
        <div className="flex flex-wrap gap-[20px] max-w-[1400px] justify-center">
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
  );
}

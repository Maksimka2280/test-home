'use client';
import { MiniGreyButton } from '@/components/shared/Button/MinigreyButton/MinigreyButton';
import CityList from '@/components/ui/CityRender/CityRender';
import ModalAddToComparison from '@/components/ui/Modal/ModalAddtocomparison';
import { RootState } from '@/store/store';
import {
  AirVent,
  Armchair,
  Bed,
  Building2,
  ChevronDown,
  ChevronRight,
  CornerUpRight,
  Download,
  EyeOff,
  FolderClosed,
  FolderOpen,
  House,
  MapPin,
  Microwave,
  Pencil,
  Refrigerator,
  ShowerHead,
  Timer,
  TriangleAlert,
  TvMinimal,
  Utensils,
  WashingMachine,
  Wifi,
} from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import MapProduct from '@/components/MapForProduct/MapForProduct';
import { Button } from '@/components/shared/Button/Button';
import { ButtonBlackWhite } from '@/components/shared/Button/ButtonBlackWhite';
import { Input } from '@/components/shared/Input/Input';
const features = [
  { icon: <Refrigerator size={16} />, label: 'Холодильник' },
  { icon: <WashingMachine size={16} />, label: 'Стиральная машина' },
  { icon: <ShowerHead size={16} />, label: 'Душевая кабина' },
  { icon: <Armchair size={16} />, label: 'Мебель в комнатах' },
  { icon: <AirVent size={16} />, label: 'Кондиционер' },
  { icon: <Microwave size={16} />, label: 'Мебель на кухне' },
  { icon: <Wifi size={16} />, label: 'Интернет' },
  { icon: <TvMinimal size={16} />, label: 'Телевизор' },
];

export default function PageProduct() {
  const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="px-[15px]">
      {/* Верхняя панель */}
      <div className="flex justify-center mb-[35px] mt-[50px]">
        <div className="flex flex-wrap items-center justify-center lg:justify-between w-full max-w-[1360px] 2xl:max-w-[1760px] ">
          <div className="pb-[35px] md:pb-0">
            <p className="text-center sm:text-left">Сервис для поиска недвижимости в Швейцарии</p>
            <p className="flex items-center text-[#A0A6B2] mt-3 text-[14px]">
              Недвижимость в Санкт-Галлен
              <ChevronRight size={16} className="mx-2" />
              <span className="font-medium">Сравнение</span>
            </p>
          </div>

          <div className="min-w-[200px] sm:min-w-[300px] lg:min-w-[360px] bg-[#F3F3F3] rounded-[15px] mt-4 sm:mt-0 p-[18px] flex flex-col items-center gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
              <p className="text-[#BCBCBC] text-[16px] text-center sm:text-left whitespace-nowrap">
                Выбрано городов:
                <span className="text-[#0468FF] font-semibold pl-1">{selectedCities.length}</span>
              </p>
              <MapPin color="#0164EB" size={17} />
              <CityList />
            </div>
            <div className="text-[#A0A6B2] text-[13px] w-full text-right">
              Обновлено: 5 дек, 15:19 ·{' '}
              <span className="font-bold text-[#0164EB]">780 просмотров</span>, 178 за сегодня, 519
              уникальных
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap xl:flex-nowrap flex-row-reverse max-w-[1360px] 2xl:max-w-[1560px] mx-auto justify-center  gap-[60px] ">
        <div className="max-w-[600px] w-full h-[670px] rounded-[15px] bg-[#fff] flex items-center justify-center mt-[20px] px-8">
          <div className="w-full">
            <div>
              <p className="text-[26px] sm:text-[40px] ">120.000 ₽/мес.</p>
            </div>
            <p className="text-[#0661EC] relative mt-[10px]">
              Следить за изменением цены
              <span className="block max-w-[230px] w-full h-[1px] border-b border-dotted border-[#0661EC] mt-1"></span>
            </p>
            <div className="mt-6 space-y-3 text-[13px] sm:text-[16px] text-[#2A3C4F] font-medium">
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Оплата ЖКХ</span>
                <span>включена (без счётчиков)</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Залог</span>
                <span>нет</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Комиссии</span>
                <span>нет</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Предоплата</span>
                <span>1 месяц</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Срок аренды</span>
                <span>несколько месяцев</span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] mt-[35px]">
              <Button className="w-full" height="60px" rounded="15px">
                Показать телефон
              </Button>
              <ButtonBlackWhite className="w-full" rounded="15px" height="60px">
                Написать
              </ButtonBlackWhite>
            </div>

            <div className="mt-[30px]">
              <p className="text-[#BCBCBC] mb-[15px]">Предложите свою цену</p>
              <div className="flex gap-[10px] w-full">
                <Input
                  placeholder="Например, 116 400"
                  type="text"
                  height="50px"
                  className="flex-grow min-w-0"
                />
                <Button width="60px" height="50px" rounded="15px" className="flex-shrink-0">
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="">
            <h1 className="text-[30px] sm:text-[40px]  font-bold text-[#152242]">
              Сдается 2-комн. квартира, 40 м²
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <p>2-й Амбулаторный проезд, 18</p>
              <Link href="/Map" className="text-[#0164EB]">
                На карте
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-[10px] py-[15px]">
              <div className="flex items-center gap-[6px]">
                <MapPin color="#9D9D9D" size={17} />
                <p className="text-[16px]">Островская</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <Timer color="#9D9D9D" size={17} />
                <p className="text-[16px]">
                  <span className="font-bold">14</span> минут
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-start gap-[8.5px] mt-[25px]">
              {[
                CornerUpRight,
                Pencil,
                Download,
                TriangleAlert,
                FolderClosed,
                FolderOpen,
                EyeOff,
              ].map((Icon, i) => (
                <MiniGreyButton key={i}>
                  <Icon size={17} />
                </MiniGreyButton>
              ))}
              {/* Вторая кнопка */}
              <div className="flex justify-center mt-2 sm:mt-0 xl:justify-end w-full sm:w-auto  xl:ml-auto">
                <ModalAddToComparison />
              </div>
            </div>
            <div className="mt-[30px]">
              <img src="/img/ig-test.png" alt="" className="w-full max-w-[750px]" />
              <div className="flex flex-wrap gap-[15px] mt-[20px]">
                {Array(7)
                  .fill(0)
                  .map((_, i) => (
                    <img
                      key={i}
                      src="/img/mini-appartament.png"
                      alt=""
                      className="rounded-[10px] w-[65px] h-[65px] sm:w-[95px] sm:h-[95px]"
                    />
                  ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-full mt-12">
              {[
                { icon: House, label: 'Общая площадь', value: '40 м²' },
                { icon: Bed, label: 'Жилая площадь', value: '22,5 м²' },
                { icon: Utensils, label: 'Площадь кухни', value: '7 м²' },
                { icon: Building2, label: 'Этаж', value: '4 из 9' },
                { icon: Building2, label: 'Год постройки', value: '1961' },
              ].map(({ icon: Icon, label, value }, i) => (
                <div className="flex items-center gap-3" key={i}>
                  <MiniGreyButton width="30px" height="30px">
                    <Icon size={16} />
                  </MiniGreyButton>
                  <div>
                    <p className="text-[#737A8E] text-[12px]  sm:text-[16px]">{label}</p>
                    <p className="font-semibold text-[12px] sm:text-[16px]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Описание */}
            <div className="w-full max-w-[750px] mt-8">
              <p
                className={`text-[16px] leading-[24px] text-[#3A3A3A] transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}
              >
                Хотите переехать в уютную квартиру? Переезжайте жить в самый экологичный и
                прогрессивный район. Хотите переехать в уютную квартиру? Переезжайте жить в самый
                экологичный и прогрессивный район. Хотите переехать в уютную квартиру? Переезжайте
                жить в самый экологичный и прогрессивный район.
              </p>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 flex items-center gap-1 text-[#0164EB] text-[14px]"
              >
                {isExpanded ? 'Скрыть описание' : 'Открыть все описание'}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-full">
                {/* О квартире */}
                <div>
                  <h3 className="text-[#152242] text-[20px] font-bold mb-4">О квартире</h3>
                  <ul className="space-y-4 text-[#737A8E] text-[15px]">
                    {[
                      'Общая площадь',
                      'Жилая площадь',
                      'Площадь кухни',
                      'Высота потолков',
                      'Санузел',
                      'Балкон/лоджия',
                      'Ремонт',
                    ].map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{item}</span>
                        <span>•••</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* О доме */}
                <div>
                  <h3 className="text-[#152242] text-[20px] font-bold mb-4">О доме</h3>
                  <ul className="space-y-4 text-[#737A8E] text-[15px]">
                    {[
                      'Год постройки',
                      'Строительная серия',
                      'Мусоропровод',
                      'Количество лифтов',
                      'Тип дома',
                      'Тип перекрытий',
                      'Парковка',
                      'Подъезды',
                      'Отопление',
                      'Аварийность',
                      'Газоснабжение',
                    ].map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{item}</span>
                        <span>•••</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-16 mb-12 w-full max-w-[700px]">
                <h2 className="text-xl font-semibold mb-4">В квартире есть</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm text-gray-900">
                  {features.map(({ icon, label }, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {icon}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[#152242] text-[28px] font-bold py-[40px]">Расположение</h3>
                <MapProduct coordinates={[55.751244, 37.618423]} />
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

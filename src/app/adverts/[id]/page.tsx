'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { MiniGreyButton } from '@/components/shared/Button/MinigreyButton/MinigreyButton';
import CityList from '@/components/ui/CityRender/CityRender';
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
  Heart,
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
import MapProduct from '@/components/MapForProduct/MapForProduct';
import { Button } from '@/components/shared/Button/Button';
import { ButtonBlackWhite } from '@/components/shared/Button/ButtonBlackWhite';
import { Input } from '@/components/shared/Input/Input';
import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';
import { ModalAddToComparison } from '@/components/ui/Modal/ModalAddtocomparison';
const features = [
  { key: 'fridge', icon: <Refrigerator size={16} />, label: 'Холодильник' },
  { key: 'washer', icon: <WashingMachine size={16} />, label: 'Стиральная машина' },
  { key: 'shower_cabin', icon: <ShowerHead size={16} />, label: 'Душевая кабина' },
  { key: 'room_furniture', icon: <Armchair size={16} />, label: 'Мебель в комнатах' },
  { key: 'conditioner', icon: <AirVent size={16} />, label: 'Кондиционер' },
  { key: 'kitchen_furniture', icon: <Microwave size={16} />, label: 'Мебель на кухне' },
  { key: 'internet', icon: <Wifi size={16} />, label: 'Интернет' },
  { key: 'tv', icon: <TvMinimal size={16} />, label: 'Телевизор' },
];

interface AdvertData {
  price: number;
  type: string;
  description: string;
  [key: string]: any;
}
interface Params {
  id?: string | number;
}

export default function ProductDetail() {
  const params: Params = useParams();
  const advertId = params?.id;
  const { currencySymbol, convertPrice } = useCurrency();
  const [advertData, setAdvertData] = useState<AdvertData | null>(null);
  const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [liked, setLiked] = useState(() => {
    const stored = localStorage.getItem(`${String(advertId)}-liked`);
    return typeof stored === 'string' ? JSON.parse(stored) : false;
  });

  const [setViewed] = useState(() => {
    const stored = localStorage.getItem(`${String(advertId)}-viewed`);
    return stored != null ? JSON.parse(stored) : false;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get_profile/`, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    void checkAuth();
  }, []);

  useEffect(() => {
    if (advertId && typeof advertId === 'number') {
      setViewed(true);
      localStorage.setItem(`${advertId}-viewed`, JSON.stringify(true));
    }
  }, [advertId]);

  const toggleLike = async () => {
    if (!isAuthenticated) return;

    const newLiked = !liked;
    setLiked(newLiked);

    const id = Number(advertId);

    try {
      if (!isNaN(id)) {
        if (newLiked) {
          await axios.post(
            `${API_BASE_URL}/favorite_groups/add_to_favorites_list/${id}`,
            { id },
            { withCredentials: true },
          );
        } else {
          await axios.post(
            `${API_BASE_URL}/favorite_groups/delete_from_favorites_list/${id}`,
            { id },
            { withCredentials: true },
          );
        }
      } else {
        console.error('Некорректный advertId:', advertId);
      }
    } catch (error) {
      console.error('Ошибка при обновлении избранного:', error);
    }
  };

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsTextOverflowing(isOverflowing);
    }
  }, [advertData?.description]);

  useEffect(() => {
    const fetchAdvertData = async (): Promise<void> => {
      try {
        if (typeof advertId === 'string' && advertId) {
          const response = await axios.get<{ data: AdvertData }>(
            `${API_BASE_URL}/adverts/advert/${advertId}`,
          );
          console.log('Ответ от API:', response.data);
          setAdvertData(response.data.data);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    void fetchAdvertData();
  }, [advertId]);

  const propertyDetails = [
    { label: 'Общая площадь', key: 'total_area' },
    { label: 'Жилая площадь', key: 'living_area' },
    { label: 'Площадь кухни', key: 'kitchen_area' },
    { label: 'Высота потолков', key: 'ceiling_height' },
    { label: 'Санузел', key: 'bathroom' },
    { label: 'Балкон/лоджия', key: 'balcony' },
    { label: 'Ремонт', key: 'renovation' },
  ];
  const propertyDetails2 = [
    { label: 'Год постройки', key: 'build_year' },
    { label: 'Мусоропровод', key: 'chute' },
    { label: 'Количество лифтов', key: 'lifts' },
    { label: 'Парковка', key: 'parking' },
    { label: 'Подъезды', key: 'entrances' },
    { label: 'Отопление', key: 'heating' },
    { label: 'Газоснабжение', key: 'gas_supply' },
  ];
  const availableFeatures = features.filter(feature => advertData?.[feature.key]);
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
      <div className="flex flex-wrap xl:flex-nowrap flex-row-reverse max-w-[1360px] 2xl:max-w-[1560px] mx-auto justify-center  xl:gap-[150px] ">
        <div className="max-w-[600px] w-full h-[670px] rounded-[15px] bg-[#fff] flex items-center justify-center mt-[20px] px-8">
          <div className="w-full">
            <div className="flex justify-between">
              <p className="text-[26px] sm:text-[40px] ">
                {convertPrice(advertData?.price ?? 0).toFixed(2)}
                {currencySymbol}/мес.
              </p>
              <button
                onClick={toggleLike}
                className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-white shadow"
              >
                <Heart
                  size={28}
                  className={`transition-all ${liked ? 'fill-[#0468FF]' : 'fill-[#dbdbdb]'}`}
                  color="#fff"
                />
              </button>
            </div>
            <p className="text-[#0661EC] relative mt-[10px]">
              Следить за изменением цены
              <span className="block max-w-[230px] w-full h-[1px] border-b border-dotted border-[#0661EC] mt-1"></span>
            </p>
            <div className="mt-6 space-y-3 text-[13px] sm:text-[16px] text-[#2A3C4F] font-medium">
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Оплата ЖКХ</span>
                <span>{advertData?.utility_payments}</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Залог</span>
                <span>{advertData?.deposit}</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Комиссии</span>
                <span>{advertData?.fee}</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Предоплата</span>
                <span>{advertData?.prepayment}</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                <span>Срок аренды</span>
                <span>{advertData?.tenancy}</span>
              </div>
            </div>
            <div className="flex flex-col gap-[10px] mt-[35px]">
              <Button className="w-full" height="60px" rounded="15px">
                Показать телефон
              </Button>
              {!isAuthenticated ? (
                <></>
              ) : (
                <ButtonBlackWhite className="w-full" rounded="15px" height="60px">
                  Написать
                </ButtonBlackWhite>
              )}
            </div>
            {!isAuthenticated ? (
              <></>
            ) : (
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
            )}
          </div>
        </div>

        <div>
          <div className="mt-[80px] xl:mt-0">
            <h1 className="text-[30px] sm:text-[40px]  font-bold text-[#152242]">
              {advertData?.title}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <p>{advertData?.address}</p>
            </div>
            <div className="flex flex-wrap items-center gap-[10px] py-[15px]">
              <div className="flex items-center gap-[6px]">
                <MapPin color="#9D9D9D" size={17} />
                <p className="text-[16px]">{advertData?.city}</p>
              </div>
              <div className="flex items-center gap-[6px]">
                <Timer color="#9D9D9D" size={17} />
                <p className="text-[16px]">
                  <span className="font-bold">{advertData?.time_on_foot_to_subway}</span> минут
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

              <div className="flex justify-center mt-2 sm:mt-0 xl:justify-end w-full sm:w-auto  xl:ml-auto">
                {!isAuthenticated || advertId === undefined ? (
                  <></>
                ) : (
                  <ModalAddToComparison advertId={advertId} />
                )}
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
                {
                  icon: House,
                  label: 'Общая площадь',
                  value: `${advertData?.total_area ?? '—'} м²`,
                },
                {
                  icon: Bed,
                  label: 'Жилая площадь',
                  value: `${advertData?.living_area ?? '—'} м²`,
                },
                {
                  icon: Utensils,
                  label: 'Площадь кухни',
                  value: `${advertData?.kitchen_area ?? '—'} м²`,
                },
                {
                  icon: Building2,
                  label: 'Этаж',
                  value:
                    advertData?.floor && advertData?.total_floors
                      ? `${advertData.floor} из ${advertData.total_floors}`
                      : '—',
                },
                {
                  icon: Building2,
                  label: 'Год постройки',
                  value: advertData?.build_year ?? '—',
                },
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
                ref={textRef}
                className={`text-[16px] leading-[24px] text-[#3A3A3A] transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}
              >
                {advertData?.description}
              </p>
              {isTextOverflowing && !isExpanded && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 flex items-center gap-1 text-[#0164EB] text-[14px]"
                >
                  Открыть все описание
                  <ChevronDown size={16} className="transition-transform duration-300 rotate-0" />
                </button>
              )}
              {isExpanded && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 flex items-center gap-1 text-[#0164EB] text-[14px]"
                >
                  Скрыть описание
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>
              )}
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-full">
                {/* О квартире */}
                <div>
                  <h3 className="text-[#152242] text-[20px] font-bold mb-4">О квартире</h3>
                  <ul className="space-y-4 text-[#737A8E] text-[15px]">
                    {propertyDetails.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.label}</span>
                        <span>{advertData?.[item.key] ? `${advertData[item.key]} м²` : '—'}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-4 text-[#737A8E] text-[15px] mt-[15px]">
                    {propertyDetails.map((item, index) => {
                      if (index < 3) return null;
                      return (
                        <li key={index} className="flex justify-between">
                          <span>{item.label}</span>
                          <span>{advertData?.[item.key] ?? '—'}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* О доме */}
                <div>
                  <h3 className="text-[#152242] text-[20px] font-bold mb-4">О доме</h3>
                  <ul className="space-y-4 text-[#737A8E] text-[15px]">
                    {propertyDetails2.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.label}</span>
                        <span>{advertData?.[item.key] ?? '—'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-16 mb-12 w-full max-w-[700px]">
                {availableFeatures.length > 0 && (
                  <div className="mt-16 mb-12 w-full max-w-[700px]">
                    <h2 className="text-xl font-semibold mb-4">в квартире есть</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm text-gray-900">
                      {availableFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {feature.icon}
                          <span>{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-[#152242] text-[28px] font-bold py-[40px]">Расположение</h3>
                <MapProduct
                  coordinates={
                    advertData?.lat && advertData?.lon ? [advertData?.lon, advertData?.lat] : [0, 0]
                  }
                />
              </div>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

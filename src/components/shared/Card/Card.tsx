'use client';
import { ArrowLeft, ArrowRight, Heart, Layers2, MapPin, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useCurrency } from '../../Context/Contextcurrency/Contextcurrency';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { useDispatch } from 'react-redux';
import { toggleCardId } from '@/store/cardSlice/Cardslice';

interface CardProps {
  cardId: string;
  total_area: number;
  price: number;
  floor: number;
  city: string;
  street: string;
  address: string;
  time_on_foot_to_subway: number;
  description: string;
  isFavorite: boolean;
  isCompared: boolean;
  isAuthenticated: boolean;
}

export const Card: React.FC<CardProps> = ({
  cardId,
  total_area,
  price,
  floor,
  city,
  address,
  time_on_foot_to_subway,
  isFavorite,
  isCompared,
  isAuthenticated,
}) => {
  const getStoredState = (key: string) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : false;
  };

  const [liked, setLiked] = useState(getStoredState(`${cardId}-liked`) || isFavorite);
  const [viewed, setViewed] = useState(getStoredState(`${cardId}-viewed`));
  const [Layers, setLayers] = useState(getStoredState(`${cardId}-layers`) || isCompared);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { currencySymbol, convertPrice, isLoading } = useCurrency();
  const dispatch = useDispatch();
  const images = ['/img/image123.png', '/img/room-test.png'];
  const pageCount = Math.ceil(images.length);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    setLayers(isCompared);
  }, [isCompared]);

  const toggleLike = async () => {
    if (!isAuthenticated) return;
    const newLiked = !liked;
    setLiked(newLiked);

    try {
      if (newLiked) {
        await axios.post(
          `${API_BASE_URL}/favorite_groups/add_to_favorites_list/${cardId}`,
          { id: cardId },
          { withCredentials: true },
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/favorite_groups/delete_from_favorites_list/${cardId}`,
          { id: cardId },
          { withCredentials: true },
        );
      }
    } catch (err) {
      console.error('Ошибка при изменении избранного:', err);
    }

    localStorage.setItem(`${cardId}-liked`, JSON.stringify(newLiked));
  };

  const toggleLayers = async () => {
    if (!isAuthenticated) return;
    const newLayers = !Layers;
    setLayers(newLayers);
    try {
      if (newLayers) {
        await axios.post(
          `${API_BASE_URL}/comparisons/add_to_comparison_list/${cardId}`,
          { id: cardId },
          { withCredentials: true },
        );
      } else {
        await axios.post(
          `${API_BASE_URL}/comparisons/delete_from_comparison_list/${cardId}`,
          { id: cardId },
          { withCredentials: true },
        );
        dispatch(toggleCardId(Number(cardId)));
      }

      markAsViewed();
    } catch (error) {
      console.error('Ошибка при обновлении сравнения:', error);
    }
  };

  const markAsViewed = () => {
    setViewed(true);
    localStorage.setItem(`${cardId}-viewed`, JSON.stringify(true));
  };

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div
      className={`relative max-w-[330px] bg-[#ffffff] w-full h-[420px] rounded-[20px] cursor-pointer ${viewed ? 'filter brightness-90' : ''} transition-all duration-300`}
      onClick={() => {
        markAsViewed();
        router.push(`/adverts/${cardId}`);
      }}
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
            void toggleLayers();
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
            void toggleLike();
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
          <h1 className="text-[22px] font-bold pb-[5px]">
            {convertPrice(price).toFixed(2)}
            {currencySymbol}
          </h1>

          <p>
            {total_area}м² · {floor} этаж
          </p>
        </div>

        <div className="flex flex-wrap gap-[10px] items-center pt-[15px] pb-[15px]">
          <div className="flex gap-[6px] items-center justify-center">
            <MapPin color="#9D9D9D" size={17} />
            <p className="text-[16px]">{city}</p>
          </div>
          <div className="flex gap-[6px] items-center justify-center">
            <Timer color="#9D9D9D" size={17} />
            <p className="text-[16px]">
              <span className="text-[16px] font-bold">{time_on_foot_to_subway}</span> минут
            </p>
          </div>
        </div>
        <p className="text-[#BCBCBC]">{address}</p>
      </div>
    </div>
  );
};

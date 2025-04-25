'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../Button/Button';
import { ButtonBlackWhite } from '../Button/ButtonBlackWhite';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ModalEditingEquastions from '@/components/ui/Modal/ModalEditingEquastions';
import { ModalCard } from '@/types/ModalLayers';
import { ShowCard } from '@/types/ShowCard';
type Card = ShowCard;

export default function BigCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<ModalCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedIds = useSelector((state: RootState) => state.cards?.selectedIds);
  const { currencySymbol, convertPrice, isLoading, error } = useCurrency();

  const pageCount = Math.ceil(selectedIds.length / 2);
  const images = ['/img/image123.png', '/img/room-test.png'];

  const handleEditComparison = (card: ShowCard) => {
    const modalCard: ModalCard = {
      ...card,
      metroDistance: card.metroDistance ? String(card.metroDistance) : undefined,
    };
    setSelectedCard(modalCard);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const resetCardFields = (cardId: string) => {
    setData(prevData =>
      prevData.map((card: ShowCard): ShowCard => {
        if (card.id === cardId) {
          return {
            ...card,
            _hide_address: false,
            _hide_price: false,
            _hide_roomCount: false,
            _hide_area: false,
            _hide_floor: false,
            _hide_metroDistance: false,
            _hide_mortgage: false,
            _hide_renovation: false,
            _hide_year: false,
            _hide_buildingType: false,
            _hide_balcony: false,
            _hide_elevator: false,
            _hide_stove: false,
            _hide_bathroomCount: false,
            _hide_view: false,
            _hide_seller: false,
            _hide_sellerRating: false,
          };
        }
        return card;
      }),
    );
  };
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const responses = await Promise.all(
          selectedIds.map(id => axios.get<ModalCard>(`${API_BASE_URL}/adverts/advert/${id}`)),
        );
        const fetchedData = responses.map(res => res.data.data);
        setData(fetchedData);
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
      }
    };

    if (selectedIds.length > 0) {
      void fetchData();
    }
  }, [selectedIds]);

  const handleDeleteRow = (rowId: string, field: string) => {
    setData(prevData =>
      prevData.map((card: ShowCard): ShowCard => {
        if (card.id === rowId) {
          return { ...card, [field]: null, [`_hide_${field}`]: true };
        }
        return card;
      }),
    );
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="relative max-w-[1760px] w-full  rounded-[20px] cursor-pointer">
      <div
        className="rounded-t-[20px] flex justify-center items-center relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      <div className="text-center w-full">
        <div className="flex gap-[30px] min-w-full overflow-x-auto custom-scrollbar py-5">
          {data.length > 0 ? (
            (data as Card[]).map((card, index) => (
              <div
                key={index}
                className="flex flex-col justify-start items-center gap-[20px] max-w-[1700px] w-full"
                style={{ transform: 'rotate(180deg)' }}
              >
                <div className="relative w-full">
                  <img
                    className="max-w-[330px] w-full h-[240px] rounded-[20px] object-cover"
                    src={images[currentPage % images.length]}
                    alt="Card Image"
                  />
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-center">
                    <ReactPaginate
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                      containerClassName="flex gap-2 justify-center relative"
                      pageClassName="w-[8px] h-[8px] flex items-center justify-center rounded-full bg-[#FFFFFF] cursor-pointer hover:bg-gray-200 transition select-none"
                      activeClassName="bg-blue-500"
                      pageLinkClassName="w-[8px] h-[8px] flex items-center justify-center text-transparent select-none"
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
                      previousClassName="absolute mr-[270px] mt-[-110px] select-none"
                      nextClassName="absolute ml-[270px] mt-[-110px] select-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6 mt-[20px]">
                  <Button color="blue" width="330px" height="60px" rounded="15px">
                    Показать телефон
                  </Button>
                  <ButtonBlackWhite height="60px" width="330px" rounded="15px">
                    Написать
                  </ButtonBlackWhite>
                </div>

                {!card._hide_address && (
                  <p className="text-[#BCBCBC] text-[14px] sm:text-[16px]">
                    {card.address ?? 'Адрес не указан'}
                  </p>
                )}
                {!card._hide_price && (
                  <h1 className="text-[18px] sm:text-[22px] font-bold">
                    {convertPrice(Number(card.price)).toFixed(2)} {currencySymbol}
                  </h1>
                )}
                {!card._hide_roomCount && <p>{card.roomCount ?? 'Не указано'}-комн</p>}
                {!card._hide_area && <p>Общая площадь: {card.area ?? 'Не указано'} м²</p>}
                {!card._hide_floor && (
                  <p>
                    Этаж: {card.floor ?? 'Не указан'}/{card.totalFloors ?? 'Не указано'}
                  </p>
                )}
                {!card._hide_metroDistance && <p>До метро: {card.metroDistance ?? 'Не указано'}</p>}
                {!card._hide_mortgage && (
                  <p>Ипотечные программы: {card.mortgage ? 'есть' : 'нет'}</p>
                )}
                {!card._hide_renovation && <p>Ремонт: {card.renovation ?? 'Не указан'}</p>}
                {!card._hide_year && <p>Год постройки: {card.year ?? 'Не указан'}</p>}
                {!card._hide_buildingType && <p>Тип дома: {card.buildingType ?? 'Не указан'}</p>}
                {!card._hide_balcony && <p>Балкон/Лоджия: {card.balcony ? 'есть' : 'нет'}</p>}
                {!card._hide_elevator && <p>Лифт: {card.elevator ? 'есть' : 'нет'}</p>}
                {!card._hide_stove && <p>Кухонная плита: {card.stove ?? 'Не указано'}</p>}
                {!card._hide_bathroomCount && <p>Санузел: {card.bathroomCount ?? 'Не указан'}</p>}
                {!card._hide_view && <p>Вид из окна: {card.view ?? 'Не указан'}</p>}
                {!card._hide_seller && <p>Продавец: {card.seller ?? 'Не указан'}</p>}
                {!card._hide_sellerRating && (
                  <p>Рейтинг продавца: {card.sellerRating ?? 'Не указан'}</p>
                )}

                <Button
                  width="330px"
                  height="60px"
                  color="blue"
                  onClick={() => handleEditComparison(card)}
                >
                  Редактировать сравнение
                </Button>
              </div>
            ))
          ) : (
            <div
              className="flex justify-center items-center"
              style={{ transform: 'rotate(180deg)' }}
            >
              Вы не выбрали ни одной карточки для сравнения
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0  bg-opacity-50 z-50 flex justify-center items-center"
          style={{ transform: 'rotate(180deg)' }}
        >
          <ModalEditingEquastions
            isOpen={isModalOpen}
            onClose={closeModal}
            card={selectedCard}
            onDeleteRow={handleDeleteRow}
            resetCardFields={resetCardFields}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { Button } from '@/components/shared/Button/Button';
import { ButtonFilters } from '@/components/shared/Button/ButtonFilters.tsx/ButtonFilters';
import { MiniGreyLine } from '@/components/shared/Filters/mini-grey-line';
import { ChevronRight, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, removeFilter } from '../../../store/FilterSlice/FilterSlices';
import { RootState } from '../../../store/store';
type FilterButton = {
  label: string;
  width?: string;
  type?: string; // Тип необязателен
  id?: string; // id тоже необязателен
};

type FilterGroup = {
  buttons: FilterButton[];
};
const filterGroups: FilterGroup[] = [
  {
    buttons: [
      { label: '10 минут', width: '115px' },
      { label: 'Пешком', width: '115px' },
      { label: 'Транспортом', width: '150px' },
    ],
  },
  {
    buttons: [
      //общая
      { label: '17', width: '44px' },
      { label: '28', width: '44px' },
      //кухня
      { label: 'от', width: '44px' },
      { label: 'до', width: '44px' },

      { label: '30', width: '44px' },
      { label: '78', width: '44px' },
    ],
  },
  {
    buttons: [
      { label: '30', width: '44px', type: 'button' },
      { label: '50', width: '44px', type: 'button' },
      { label: 'Не первый', type: 'checkbox', id: 'checkbox-1' },
      { label: 'Не последний', type: 'checkbox', id: 'checkbox-2' },
      { label: 'Только последний', type: 'checkbox', id: 'checkbox-3' },
    ],
  },
  {
    buttons: [
      { label: 'от', width: '44px' },
      { label: 'до', width: '44px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Без ремонта', width: '140px' },
      { label: 'Косметический', width: '160px' },
      { label: 'Евроремонт', width: '140px' },
      { label: 'Дизайн', width: '105px' },
    ],
  },

  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Кирпич', width: '105px' },
      { label: 'Панельный', width: '130px' },
      { label: 'Деревянный', width: '140px' },
      { label: 'Монолитный', width: '140px' },
      { label: 'Блочный', width: '115px' },
      { label: 'Кирпично-монолитный', width: '215px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Балкон', width: '115px' },
      { label: 'Лоджия', width: '115px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Есть любой', width: '135px' },
      { label: 'Есть грузовой', width: '150px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Газовая', width: '105px' },
      { label: 'Электрическая', width: '160px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Смежная', width: '115px' },
      { label: 'Изолированная', width: '160px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'от 2 м', width: '100px' },
      { label: 'от 2,5 м', width: '100px' },
      { label: 'от 2,7 м', width: '100px' },
      { label: 'от 3 м', width: '100px' },
      { label: 'от 3,5 м', width: '100px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Совмещенный', width: '155px' },
      { label: 'Раздельный', width: '140px' },
      { label: '2 и более', width: '120px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Во двор', width: '110px' },
      { label: 'На улицу', width: '120px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Без апартаментов', width: '180px' },
      { label: 'Только апартаменты', width: '200px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Наземная', width: '120px' },
      { label: 'Многоуровневая', width: '170px' },
      { label: 'Подземная', width: '130px' },
    ],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Собственник', width: '145px' },
      { label: 'Агент', width: '90px' },
      { label: 'Застройщик', width: '140px' },
    ],
  },
  {
    buttons: [{ label: 'Возможна ипотека', width: '190px' }],
  },
  {
    buttons: [
      { label: 'Неважно', width: '115px' },
      { label: 'Введите дату', width: '150px' },
    ],
  },
  {
    buttons: [{ label: 'Введите слова', width: '150px' }],
  },
];
type ModalMoreFilterProps = {
  trigger?: ReactNode;
};
export default function ModalMoreFilter({ trigger }: ModalMoreFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedFilters = useSelector((state: RootState) => state.filters.selectedFilters);
  const dispatch = useDispatch();

  const handleCheckboxChange = (id: string) => {
    if (selectedFilters.includes(id)) {
      dispatch(removeFilter(id));
    } else {
      dispatch(addFilter(id));
    }
  };

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      {trigger ? (
        <div onClick={toggleModal} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <button
          className="flex justify-center items-center font-medium text-[#0468FF] py-2 sm:py-4 lg:text-lg transition-all duration-300 ease-in-out transform"
          onClick={toggleModal}
        >
          Больше фильтров
          <ChevronRight size={14} color="#0468FF" fontWeight="bold" strokeWidth={3} />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40 transition-opacity duration-300"
          onClick={toggleModal}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-50 bg-white rounded-r-[25px] shadow-lg transition-transform duration-500 ease-in-out over ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-[85%] sm:w-[80%] md:w-[70%] lg:w-[1125px] h-full max-h-screen overflow-y-auto`}
      >
        <div className="p-6 relative">
          {/* Кнопка закрытия */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
            onClick={toggleModal}
          >
            <X size={24} />
          </button>
          <h1 className="text-[28px] font-bold">Ещё фильтры</h1>

          <div className="flex items-start">
            <div className="text-left">
              <ul className="mt-[40px] text-[20px] flex flex-col gap-[40px]">
                <li>
                  <p>До метро</p>
                </li>
                <li>
                  <p>Площадь, м2</p>
                </li>
                <li>
                  <p>Этаж</p>
                </li>
                <li>
                  <p>Этажей в доме</p>
                </li>
                <li>
                  <p>Ремонт</p>
                </li>
                <li>
                  <p>Год постройки</p>
                </li>
                <li>
                  <p>Тип дома</p>
                </li>
              </ul>

              <ul className=" pt-[40px] lg:pt-[100px] text-[20px] flex flex-col gap-[40px]">
                <li>
                  <p>Балкон/Лоджия</p>
                </li>
                <li>
                  <p>Лифт</p>
                </li>
                <li>
                  <p>Кухонная плита</p>
                </li>
                <li>
                  <p>Планировка</p>
                </li>
                <li>
                  <p>Высота потолков</p>
                </li>
                <li>
                  <p>Санузел</p>
                </li>
                <li>
                  <p>Вид из окна</p>
                </li>
                <li>
                  <p>Апартаменты</p>
                </li>
                <li>
                  <p className="w-[200px]">Парковка</p>
                </li>
                <li>
                  <p className="w-[200px]">Продавец</p>
                </li>
                <li>
                  <p className="w-[200px]">Условия продажи</p>
                </li>
                <li>
                  <p className="w-[200px]">Дата публикации</p>
                </li>
                <li>
                  <p className="w-[160px]">Содержит слова в объявлении</p>
                </li>
              </ul>
            </div>

            <MiniGreyLine height="1520px" className="ml-7 mt-7" />
            <div className="ml-10 flex flex-col mt-[35px] gap-[30px]">
              {filterGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-[20px]">
                  <div className="flex sm:flex-wrap items-center gap-[10px]">
                    {groupIndex === 0 && (
                      <div className="flex sm:flex-wrap items-center mr-4 gap-[20px]">
                        <div className="mr-2 text-sm font-medium">Не более</div>
                        {group.buttons.map((button, buttonIndex) => (
                          <ButtonFilters
                            key={`${groupIndex}-${buttonIndex}`}
                            color="blue"
                            id={`button-${groupIndex}-${buttonIndex}`}
                            height="40px"
                            rounded="15px"
                            width={button.width}
                          >
                            {button.label}
                          </ButtonFilters>
                        ))}
                      </div>
                    )}

                    {groupIndex === 1 && (
                      <>
                        <div className="flex sm:flex-wrap items-center gap-[10px]">
                          <div className="mr-2 text-sm font-medium">Общая</div>
                          {group.buttons.slice(0, 2).map((button, buttonIndex) => (
                            <ButtonFilters
                              key={`${groupIndex}-${buttonIndex}`}
                              color="blue"
                              id={`button-${groupIndex}-${buttonIndex}`}
                              height="40px"
                              rounded="15px"
                              width={button.width}
                            >
                              {button.label}
                            </ButtonFilters>
                          ))}
                        </div>

                        <div className="flex sm:flex-wrap items-center gap-[10px] ml-4">
                          <div className="mr-2 text-sm font-medium">Кухня</div>
                          {group.buttons.slice(3, 4).map((_, index) => (
                            <input
                              key={`input-${groupIndex}-${index}`} // Add a unique key for each item
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px]  items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          ))}

                          {group.buttons.slice(3, 4).map((_, index) => (
                            <input
                              key={`input-${groupIndex}-${index}`} // Add a unique key for each item
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px]  items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          ))}
                        </div>

                        <div className="flex sm:flex-wrap items-center gap-[10px] ml-4">
                          <div className="mr-2 text-sm font-medium">Жилая</div>
                          {group.buttons.slice(4, 6).map((button, buttonIndex) => (
                            <ButtonFilters
                              key={`${groupIndex}-${buttonIndex}`}
                              color="blue"
                              id={`button-${groupIndex}-${buttonIndex}`}
                              height="40px"
                              rounded="15px"
                              width={button.width}
                            >
                              {button.label}
                            </ButtonFilters>
                          ))}
                        </div>
                      </>
                    )}

                    {groupIndex === 2 && (
                      <div className="flex sm:flex-wrap items-center gap-[10px]">
                        {group.buttons.map((button, buttonIndex) => {
                          if (button.type === 'checkbox') {
                            const buttonId = button.id;

                            return (
                              <div
                                key={`${groupIndex}-${buttonIndex}`}
                                className="flex items-center gap-[10px] justify-end"
                              >
                                <label htmlFor={buttonId} className="text-sm ml-4">
                                  {button.label}
                                </label>

                                <input
                                  type="checkbox"
                                  id={buttonId}
                                  className="hidden"
                                  checked={buttonId ? selectedFilters.includes(buttonId) : false}
                                  onChange={() => buttonId && handleCheckboxChange(buttonId)}
                                />

                                <label
                                  htmlFor={buttonId}
                                  className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300"
                                >
                                  {buttonId && selectedFilters.includes(buttonId) && (
                                    <div className="w-[10px] h-[10px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
                                  )}
                                </label>
                              </div>
                            );
                          }

                          return (
                            <ButtonFilters
                              key={`${groupIndex}-${buttonIndex}`}
                              color="blue"
                              id={`button-${groupIndex}-${buttonIndex}`}
                              height="40px"
                              rounded="15px"
                              width={button.width}
                            >
                              {button.label}
                            </ButtonFilters>
                          );
                        })}
                      </div>
                    )}

                    {/* Заменяем кнопки на инпуты только в определенном блоке */}
                    {groupIndex === 3 && (
                      <div className="flex sm:flex-wrap items-center mr-4 gap-[20px]">
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px]  items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px]  items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex === 5 && (
                      <div className="flex sm:flex-wrap items-center mr-4 gap-[20px] mb-[20px]">
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px] items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px] items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex !== 0 &&
                      groupIndex !== 1 &&
                      groupIndex !== 2 &&
                      groupIndex !== 3 && (
                        <div className="flex lg:flex-wrap items-center gap-[20px]">
                          {group.buttons.map((button, buttonIndex) => (
                            <ButtonFilters
                              key={`${groupIndex}-${buttonIndex}`}
                              color="blue"
                              id={`button-${groupIndex}-${buttonIndex}`}
                              height="40px"
                              rounded="15px"
                              width={button.width}
                            >
                              {button.label}
                            </ButtonFilters>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-[20px] justify-center items-center mt-[50px] flex-wrap">
            <Button width="273px" height="60px" rounded="20px" color="blue">
              Искать варианты
            </Button>
            <button className="bg-[#fff] border-[3px] border-[#152242] w-[270px] h-[60px] rounded-[20px] font-bold">
              Сохранить фильтр
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import { ButtonFilters } from '@/components/shared/Button/ButtonFilters.tsx/ButtonFilters';
import { MiniGreyLine } from '@/components/shared/Filters/mini-grey-line';
import { ChevronRight, X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, removeFilter } from '../../../store/FilterSlice/FilterSlices';
import { RootState } from '../../../store/store';
import { useFilter } from '@/components/Context/FromandToYersContext/FromandToYersContext';
import { usePublicationDate } from '@/components/Context/PublicationDateContext/PublicationDateContext';
import { useFloor } from '@/components/Context/FloorsContext/FloorsContext';
import { useKitchenAreaFilter } from '@/components/Context/ChickenContext/ChickenContext';
import { useTotalAreaFilter } from '@/components/Context/TotakContext/TotakContext';
import { useLivingArea } from '@/components/Context/LiveAreaContext/LiveAreaContext';
type FilterButton = {
  label: string;
  width?: string;
  type?: string;
  id?: string;
};

type FilterGroup = {
  buttons: FilterButton[];
  id: number;
};
const filterGroups: FilterGroup[] = [
  {
    id: 2,
    buttons: [{ label: '', width: '', id: '' }],
  },
  {
    id: 3,
    buttons: [
      { label: '30', width: '44px', type: 'button', id: 'button-3-1' },
      { label: '50', width: '44px', type: 'button', id: 'button-3-2' },
      { label: 'Не первый', type: 'checkbox', id: 'checkbox-3-1' },
      { label: 'Не последний', type: 'checkbox', id: 'checkbox-3-2' },
      { label: 'Только последний', type: 'checkbox', id: 'checkbox-3-3' },
    ],
  },
  {
    id: 4,
    buttons: [{ label: '', width: '', id: '' }],
  },
  {
    id: 5,
    buttons: [
      { label: 'новый', width: '140px', id: 'button-5-2' },
      { label: 'старый', width: '160px', id: 'button-5-3' },
    ],
  },
  {
    id: 6,
    buttons: [
      { label: 'Кирпич', width: '105px', id: 'button-6-2' },
      { label: 'Панельный', width: '130px', id: 'button-6-3' },
      { label: 'Деревянный', width: '140px', id: 'button-6-4' },
      { label: 'Монолитный', width: '140px', id: 'button-6-5' },
      { label: 'Блочный', width: '115px', id: 'button-6-6' },
      { label: 'Кирпично-монолитный', width: '215px', id: 'button-6-7' },
    ],
  },
  {
    id: 7,
    buttons: [
      { label: 'Балкон', width: '115px', id: 'button-7-2' },
      { label: 'терраса', width: '115px', id: 'button-7-3' },
    ],
  },
  {
    id: 8,
    buttons: [
      { label: 'Есть', width: '135px', id: 'button-8-2' },
      { label: 'Нет', width: '150px', id: 'button-8-3' },
    ],
  },
  {
    id: 11,
    buttons: [
      { label: 'от 2 м', width: '100px', id: 'button-11-2' },
      { label: 'от 2,5 м', width: '100px', id: 'button-11-3' },
      { label: 'от 2,7 м', width: '100px', id: 'button-11-4' },
      { label: 'от 3 м', width: '100px', id: 'button-11-5' },
      { label: 'от 3,5 м', width: '100px', id: 'button-11-6' },
    ],
  },
  {
    id: 12,
    buttons: [
      { label: '1 санузел', width: '155px', id: 'button-12-1' },
      { label: '2 санузла', width: '140px', id: 'button-12-2' },
      { label: 'Более двух санузлов', width: '200px', id: 'button-12-3' },
    ],
  },
  {
    id: 15,
    buttons: [
      { label: 'Наземная', width: '120px', id: 'button-15-2' },
      { label: 'Многоуровневая', width: '170px', id: 'button-15-3' },
      { label: 'Подземная', width: '130px', id: 'button-15-4' },
    ],
  },
  {
    id: 16,
    buttons: [
      { label: 'Собственник', width: '145px', id: 'button-16-2' },
      { label: 'Агент', width: '90px', id: 'button-16-3' },
      { label: 'Застройщик', width: '140px', id: 'button-16-4' },
    ],
  },
  {
    id: 17,
    buttons: [{ label: 'Возможна ипотека', width: '190px', id: 'button-17-1' }],
  },
  {
    id: 18,
    buttons: [
      { label: 'в течение недели', width: '175px', id: 'button-16-2' },
      { label: 'в течение месяца', width: '200px', id: 'button-16-3' },
      { label: 'в течение 3 меясцев', width: '200px', id: 'button-16-4' },
      { label: 'в течение 6 меясцев', width: '200px', id: 'button-16-4' },
      { label: 'Введите дату', width: '150px', id: 'button-18-2' },
    ],
  },
  {
    id: 19,
    buttons: [{ label: 'Введите слова', width: '150px', id: 'button-19-1' }],
  },
];

type ModalMoreFilterProps = {
  trigger?: ReactNode;
};
export default function ModalMoreFilter({ trigger }: ModalMoreFilterProps) {
  const filterSections = [
    { title: 'Площадь, м2', group: filterGroups[0] },
    { title: 'Этаж', group: filterGroups[1] },
    { title: 'Этажей в доме', group: filterGroups[2] },
    { title: 'Ремонт', group: filterGroups[3] },
    { title: 'Год постройки', group: filterGroups[4] },
    { title: 'Тип дома', group: filterGroups[4] },
    { title: 'Балкон/терраса', group: filterGroups[5] },
    { title: 'Лифт', group: filterGroups[6] },

    { title: 'Высота потолков', group: filterGroups[7] },
    { title: 'Санузел', group: filterGroups[8] },

    { title: 'Продавец', group: filterGroups[10] },
    { title: 'Условия продажи', group: filterGroups[11] },
    { title: 'Дата публикации', group: filterGroups[12] },
    { title: 'Содержит слова в объявлении', group: filterGroups[13] },
  ].filter(section => section.group);

  const [isOpen, setIsOpen] = useState(false);
  const { yearFrom, yearTo, updateYearFrom, updateYearTo } = useFilter();
  const { setPublicationDate } = usePublicationDate();
  const { floorFrom, floorTo, updateFloorFrom, updateFloorTo } = useFloor();
  const { minLivingArea, maxLivingArea, setMinLivingArea, setMaxLivingArea } = useLivingArea();
  const { minTotalArea, maxTotalArea, setMinTotalArea, setMaxTotalArea } = useTotalAreaFilter();
  const [activeButtonsByGroup, setActiveButtonsByGroup] = useState<Record<number, number[]>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activeButtonsByGroup');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  useEffect(() => {
    localStorage.setItem('activeButtonsByGroup', JSON.stringify(activeButtonsByGroup));
  }, [activeButtonsByGroup]);
  const { minKitchenArea, maxKitchenArea, setMinKitchenArea, setMaxKitchenArea } =
    useKitchenAreaFilter();

  const handleMinAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinKitchenArea(e.target.value);
  };

  const handleMaxAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxKitchenArea(e.target.value);
  };
  const handleMinAreaChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinTotalArea(e.target.value); // обновляем минимальную площадь
  };

  const handleMaxAreaChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxTotalArea(e.target.value); // обновляем максимальную площадь
  };

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
  const handleButtonClick = (groupId: number, buttonIndex: number) => {
    setActiveButtonsByGroup(prev => {
      const current = prev[groupId] || [];

      const isActive = current.includes(buttonIndex);
      const updated = isActive ? current.filter(i => i !== buttonIndex) : [...current, buttonIndex];

      const newState = {
        ...prev,
        [groupId]: updated,
      };

      return newState;
    });
  };

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
        className={`fixed top-0 left-0 z-50 bg-white pt-[30px] pl-[30px] pb-[10px]  rounded-r-[25px] shadow-lg transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-full sm:w-[80%] md:w-[70%] lg:w-[1125px] h-full max-h-screen overflow-hidden`}
      >
        <div className="h-full overflow-y-auto rounded-r-[25px]">
          {/* Кнопка закрытия */}
          <button
            onClick={toggleModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition duration-300"
          >
            <X size={24} />
          </button>

          <h1 className="text-[28px] font-bold">Ещё фильтры</h1>

          <div className="flex items-start hidden lg:flex">
            <div className="text-left">
              <ul className="mt-[40px] text-[20px] flex flex-col gap-[40px]">
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
                  <p>Балкон/терраса</p>
                </li>
                <li>
                  <p>Лифт</p>
                </li>
                <li>
                  <p>Высота потолков</p>
                </li>
                <li>
                  <p>Санузел</p>
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
                  <p className="w-[160px] pt-10">Содержит слова в объявлении</p>
                </li>
              </ul>
            </div>

            <MiniGreyLine height="1520px" className="ml-7 mt-7" />
            <div className="ml-10 flex flex-col mt-[35px] gap-[30px] hidden lg:flex">
              {filterGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-[20px]">
                  <div className="flex sm:flex-wrap items-center gap-[10px]">
                    {groupIndex === 1 && (
                      <div className="flex sm:flex-wrap items-center gap-[10px]">
                        {group.buttons.map((button, buttonIndex) => {
                          if (button.type === 'checkbox') {
                            const inputId = `CheckBox-${groupIndex}-${buttonIndex}`;

                            return (
                              <div
                                key={`${groupIndex}-${buttonIndex}`}
                                className="flex items-center gap-[10px] justify-end"
                              >
                                <label htmlFor={inputId} className="text-sm ml-4 cursor-pointer">
                                  {button.label}
                                </label>
                                <input
                                  type="checkbox"
                                  id={inputId}
                                  className="hidden"
                                  checked={selectedFilters.includes(inputId)}
                                  onChange={() => handleCheckboxChange(inputId)}
                                />

                                <label
                                  htmlFor={inputId}
                                  className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300"
                                >
                                  {selectedFilters.includes(inputId) && (
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

                    {groupIndex === 2 && (
                      <div className="flex sm:flex-wrap items-center mr-4 gap-[20px]">
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              onChange={e => {
                                updateFloorFrom(e.target.value);
                              }}
                              value={floorFrom}
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex    items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              onChange={e => {
                                updateFloorTo(e.target.value);
                              }}
                              value={floorTo}
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex    items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex === 4 && (
                      <div className="flex sm:flex-wrap items-center mr-4 gap-[20px] mb-[20px]">
                        <div className="flex gap-[20px]">
                          <div className="relative">
                            <input
                              id="input-from"
                              type="number"
                              placeholder="От"
                              value={yearFrom}
                              onChange={e => updateYearFrom(e.target.value)}
                              className="w-[120px] h-[40px] border-none rounded-[15px] pl-[25px] pr-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder-transparent focus:outline-none"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#152242]">
                              От
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              id="input-to"
                              type="number"
                              placeholder="До"
                              value={yearTo}
                              onChange={e => updateYearTo(e.target.value)}
                              className="w-[120px] h-[40px] border-none rounded-[15px] pl-[25px] pr-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder-transparent focus:outline-none"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#152242]">
                              До
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex === 0 && (
                      <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                        <p>Кухня </p>
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              id={`input-from-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              value={minKitchenArea}
                              onChange={handleMinAreaChange}
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex  bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              value={maxKitchenArea}
                              onChange={handleMaxAreaChange}
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex  bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex === 0 && (
                      <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                        <p>Общая </p>
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              id={`input-from-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              value={minTotalArea}
                              onChange={handleMinAreaChange2}
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex  bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              value={maxTotalArea}
                              onChange={handleMaxAreaChange2}
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex  bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex === 0 && (
                      <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                        <p>Жилая </p>
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              id={`input-from-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              value={minLivingArea ?? ''}
                              onChange={e =>
                                setMinLivingArea(e.target.value ? parseFloat(e.target.value) : null)
                              }
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex  bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              value={maxLivingArea ?? ''}
                              onChange={e =>
                                setMaxLivingArea(e.target.value ? parseFloat(e.target.value) : null)
                              }
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex  bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex !== 1 && groupIndex !== 2 && (
                      <div className="flex lg:flex-wrap items-center gap-[20px]">
                        {group.buttons.map((button, buttonIndex) => {
                          const groupId = group.id || groupIndex;
                          const activeButtons = activeButtonsByGroup[groupId] || [];
                          const isNotImportant = button.label === 'Неважно';

                          if (
                            isNotImportant &&
                            activeButtons.length > 0 &&
                            !activeButtons.includes(buttonIndex)
                          ) {
                            return null;
                          }
                          if (button.label === 'Введите дату') {
                            return (
                              <input
                                key={`${groupIndex}-${buttonIndex}`}
                                type="date"
                                className="h-[40px] w-[150px] pl-3 pr-2 bg-[#F3F3F3] text-[#152242] rounded-[15px] focus:outline-none"
                                onChange={e => setPublicationDate(e.target.value)}
                              />
                            );
                          }

                          if (button.label === 'Введите слова') {
                            return (
                              <input
                                key={`${groupIndex}-${buttonIndex}`}
                                id=""
                                type="text"
                                placeholder="Введите слова"
                                className="h-[40px] w-[280px] pl-3 pr-2 bg-[#F3F3F3] text-[#152242] rounded-[15px] focus:outline-none"
                              />
                            );
                          }
                          return (
                            <>
                              <ButtonFilters
                                key={`${groupIndex}-${buttonIndex}`}
                                color="blue"
                                id={`button-${groupIndex}-${buttonIndex}`}
                                height="40px"
                                rounded="15px"
                                width={button.width}
                                className={`transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:text-white ${activeButtons.includes(buttonIndex) ? 'bg-blue-700 text-white' : ''}`}
                                onClick={() => {
                                  handleButtonClick(groupId, buttonIndex);
                                  console.log(selectedFilters);
                                }}
                              >
                                {button.label}
                              </ButtonFilters>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[30px] mt-[35px] w-full lg:hidden">
            {filterSections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="flex flex-col sm:items-start gap-6 bg-white p-6 mr-[30px] rounded-xl shadow-lg transition-all hover:shadow-xl"
              >
                {}
                <p className="min-w-[200px] text-[18px] text-left font-semibold text-gray-800">
                  {section.title}
                </p>

                <div className="flex flex-wrap sm:flex-row sm:items-center gap-4">
                  {sectionIndex === 0 && (
                    <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                      <p>Кухня </p>
                      <div className="flex gap-[20px]">
                        <div>
                          <input
                            id={`input-from-${sectionIndex}`}
                            type="number"
                            placeholder="От"
                            value={minKitchenArea}
                            onChange={handleMinAreaChange}
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                        <div>
                          <input
                            id={`input-to-${sectionIndex}`}
                            type="number"
                            placeholder="До"
                            value={maxKitchenArea}
                            onChange={handleMaxAreaChange}
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {sectionIndex === 0 && (
                    <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                      <p>Жилая </p>
                      <div className="flex gap-[20px]">
                        <div>
                          <input
                            id={`input-from-${sectionIndex}`}
                            type="number"
                            placeholder="От"
                            value={minLivingArea ?? ''}
                            onChange={e =>
                              setMinLivingArea(e.target.value ? parseFloat(e.target.value) : null)
                            }
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                        <div>
                          <input
                            id={`input-to-${sectionIndex}`}
                            type="number"
                            placeholder="До"
                            value={maxLivingArea ?? ''}
                            onChange={e =>
                              setMaxLivingArea(e.target.value ? parseFloat(e.target.value) : null)
                            }
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {sectionIndex === 0 && (
                    <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                      <p>Общая </p>
                      <div className="flex gap-[20px]">
                        <div>
                          <input
                            id={`input-from-${sectionIndex}`}
                            type="number"
                            placeholder="От"
                            value={minTotalArea}
                            onChange={handleMinAreaChange2}
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                        <div>
                          <input
                            id={`input-to-${sectionIndex}`}
                            type="number"
                            placeholder="До"
                            value={maxTotalArea}
                            onChange={handleMaxAreaChange2}
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {sectionIndex === 4 ? (
                    <div className="flex sm:flex-wrap items-center mr-4 gap-[20px] mb-[20px]">
                      <div className="flex sm:flex-wrap items-center mr-4 gap-[20px] mb-[20px]">
                        <div className="flex gap-[20px]">
                          <div className="relative">
                            <input
                              id="input-from"
                              type="number"
                              placeholder="От"
                              value={yearFrom}
                              onChange={e => updateYearFrom(e.target.value)}
                              className="w-[120px] h-[40px] border-none rounded-[15px] pl-[25px] pr-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder-transparent focus:outline-none"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#152242]">
                              От
                            </span>
                          </div>
                          <div className="relative">
                            <input
                              id="input-to"
                              type="number"
                              placeholder="До"
                              value={yearTo}
                              onChange={e => updateYearTo(e.target.value)}
                              className="w-[120px] h-[40px] border-none rounded-[15px] pl-[25px] pr-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder-transparent focus:outline-none"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#152242]">
                              До
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : sectionIndex === 2 ? (
                    <div className="flex gap-[20px]">
                      <div>
                        <input
                          onChange={e => {
                            updateFloorFrom(e.target.value);
                          }}
                          value={floorFrom}
                          id={`input-to-${sectionIndex}`}
                          type="number"
                          placeholder="От"
                          className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px]   items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          onChange={e => {
                            updateFloorTo(e.target.value);
                          }}
                          value={floorTo}
                          id={`input-to-${sectionIndex}`}
                          type="number"
                          placeholder="До"
                          className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px]   items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : section.group.buttons.some(btn => btn.type === 'checkbox') ? (
                    section.group.buttons.map((button, buttonIndex) => {
                      const buttonId = button.id;
                      return (
                        <div
                          key={`${sectionIndex}-${buttonIndex}`}
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
                    })
                  ) : (
                    section.group.buttons.map((button, buttonIndex) => {
                      const groupId = section.group.id || 0;
                      const activeButtons = activeButtonsByGroup[groupId] || [];
                      const isNotImportant = button.label === 'Неважно';

                      if (
                        isNotImportant &&
                        activeButtons.length > 0 &&
                        !activeButtons.includes(buttonIndex)
                      ) {
                        return null;
                      }

                      if (button.label === 'Введите дату') {
                        return (
                          <input
                            key={`${sectionIndex}-${buttonIndex}`}
                            type="date"
                            className="h-[40px] w-[150px] pl-3 pr-2 bg-[#F3F3F3] text-[#152242] rounded-[15px] focus:outline-none"
                            onChange={e => setPublicationDate(e.target.value)}
                          />
                        );
                      }

                      if (button.label === 'Введите слова') {
                        return (
                          <input
                            key={`${sectionIndex}-${buttonIndex}`}
                            type="text"
                            className="h-[40px] w-[150px] pl-3 pr-2 bg-[#F3F3F3] text-[#152242] rounded-[15px] focus:outline-none"
                          />
                        );
                      }

                      return (
                        <>
                          <div className="flex sm:flex-wrap items-center  gap-[20px] ">
                            <ButtonFilters
                              key={`${sectionIndex}-${buttonIndex}`}
                              color="blue"
                              id={`button-${sectionIndex}-${buttonIndex}`}
                              height="40px"
                              rounded="15px"
                              width={button.width}
                              className={`transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:text-white ${activeButtons.includes(buttonIndex) ? 'bg-blue-700 text-white' : ''}`}
                              onClick={() => {
                                handleButtonClick(groupId, buttonIndex);
                              }}
                            >
                              {button.label}
                            </ButtonFilters>
                          </div>
                        </>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

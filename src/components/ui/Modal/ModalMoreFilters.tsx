'use client';

import { Button } from '@/components/shared/Button/Button';
import { ButtonFilters } from '@/components/shared/Button/ButtonFilters.tsx/ButtonFilters';
import { MiniGreyLine } from '@/components/shared/Filters/mini-grey-line';
import { ChevronRight, X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
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
  id: number;
};
const filterGroups: FilterGroup[] = [
  {
    id: 1,
    buttons: [
      { label: '10 минут', width: '115px', id: 'button-1-1' },
      { label: 'Пешком', width: '115px', id: 'button-1-2' },
      { label: 'Транспортом', width: '150px', id: 'button-1-3' },
    ],
  },
  {
    id: 2,
    buttons: [
      { label: '17', width: '44px', id: 'button-2-1' },
      { label: '28', width: '44px', id: 'button-2-2' },
      { label: '30', width: '44px', id: 'button-2-5' },
      { label: '78', width: '44px', id: 'button-2-6' },
    ],
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
    buttons: [
      { label: 'от', width: '44px', id: 'button-4-1' },
      { label: 'до', width: '44px', id: 'button-4-2' },
    ],
  },
  {
    id: 5,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-5-1' },
      { label: 'Без ремонта', width: '140px', id: 'button-5-2' },
      { label: 'Косметический', width: '160px', id: 'button-5-3' },
      { label: 'Евроремонт', width: '140px', id: 'button-5-4' },
      { label: 'Дизайн', width: '105px', id: 'button-5-5' },
    ],
  },
  {
    id: 6,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-6-1' },
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
      { label: 'Неважно', width: '115px', id: 'button-7-1' },
      { label: 'Балкон', width: '115px', id: 'button-7-2' },
      { label: 'Лоджия', width: '115px', id: 'button-7-3' },
    ],
  },
  {
    id: 8,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-8-1' },
      { label: 'Есть любой', width: '135px', id: 'button-8-2' },
      { label: 'Есть грузовой', width: '150px', id: 'button-8-3' },
    ],
  },
  {
    id: 9,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-9-1' },
      { label: 'Газовая', width: '105px', id: 'button-9-2' },
      { label: 'Электрическая', width: '160px', id: 'button-9-3' },
    ],
  },
  {
    id: 10,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-10-1' },
      { label: 'Смежная', width: '115px', id: 'button-10-2' },
      { label: 'Изолированная', width: '160px', id: 'button-10-3' },
    ],
  },
  {
    id: 11,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-11-1' },
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
      { label: 'Неважно', width: '115px', id: 'button-12-1' },
      { label: 'Совмещенный', width: '155px', id: 'button-12-2' },
      { label: 'Раздельный', width: '140px', id: 'button-12-3' },
      { label: '2 и более', width: '120px', id: 'button-12-4' },
    ],
  },
  {
    id: 13,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-13-1' },
      { label: 'Во двор', width: '110px', id: 'button-13-2' },
      { label: 'На улицу', width: '120px', id: 'button-13-3' },
    ],
  },
  {
    id: 14,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-14-1' },
      { label: 'Без апартаментов', width: '180px', id: 'button-14-2' },
      { label: 'Только апартаменты', width: '200px', id: 'button-14-3' },
    ],
  },
  {
    id: 15,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-15-1' },
      { label: 'Наземная', width: '120px', id: 'button-15-2' },
      { label: 'Многоуровневая', width: '170px', id: 'button-15-3' },
      { label: 'Подземная', width: '130px', id: 'button-15-4' },
    ],
  },
  {
    id: 16,
    buttons: [
      { label: 'Неважно', width: '115px', id: 'button-16-1' },
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
      { label: 'Неважно', width: '115px', id: 'button-18-1' },
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
    { title: 'До метро', group: filterGroups[0] },
    { title: 'Площадь, м2', group: filterGroups[1] },
    { title: 'Этаж', group: filterGroups[2] },
    { title: 'Этажей в доме', group: filterGroups[3] },
    { title: 'Ремонт', group: filterGroups[4] },
    { title: 'Год постройки', group: filterGroups[5] },
    { title: 'Тип дома', group: filterGroups[5] },
    { title: 'Балкон/Лоджия', group: filterGroups[6] },
    { title: 'Лифт', group: filterGroups[7] },
    { title: 'Кухонная плита', group: filterGroups[8] },
    { title: 'Планировка', group: filterGroups[9] },
    { title: 'Высота потолков', group: filterGroups[10] },
    { title: 'Санузел', group: filterGroups[11] },
    { title: 'Вид из окна', group: filterGroups[12] },
    { title: 'Апартаменты', group: filterGroups[13] },
    { title: 'Парковка', group: filterGroups[14] },
    { title: 'Продавец', group: filterGroups[15] },
    { title: 'Условия продажи', group: filterGroups[16] },
    { title: 'Дата публикации', group: filterGroups[17] },
    { title: 'Содержит слова в объявлении', group: filterGroups[18] },
  ].filter(section => section.group);
  const [isOpen, setIsOpen] = useState(false);
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
  const handleButtonClick = (
    groupId: number,
    buttonIndex: number,
    label: string,
    buttons: { label: string }[],
  ) => {
    setActiveButtonsByGroup(prev => {
      const current = prev[groupId] || [];

      // Если нажали "Неважно"
      if (label === 'Неважно') {
        const newState = { ...prev, [groupId]: [buttonIndex] };
        console.log(`Группа ${groupId}: выбрана "Неважно"`);
        return newState;
      }

      const notImportantIndex = buttons.findIndex(btn => btn.label === 'Неважно');
      const filtered = current.filter(i => i !== notImportantIndex);

      const isActive = current.includes(buttonIndex);
      const updated = isActive
        ? filtered.filter(i => i !== buttonIndex)
        : [...filtered, buttonIndex];

      const newState = {
        ...prev,
        [groupId]: updated,
      };

      console.log(`Группа ${groupId}: активные кнопки ->`, newState[groupId]);
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
        className={`fixed top-0 left-0 z-50 bg-white pt-[0px] pl-[20px] rounded-r-[25px] shadow-lg transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-full sm:w-[80%] md:w-[70%] lg:w-[1125px] h-full max-h-screen overflow-hidden`}
      >
        <div className="h-full overflow-y-auto rounded-r-[25px]">
          {/* Кнопка закрытия */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300"
            onClick={toggleModal}
          >
            <X size={24} />
          </button>
          <h1 className="text-[28px] font-bold">Ещё фильтры</h1>

          <div className="flex items-start hidden lg:flex">
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
            <div className="ml-10 flex flex-col mt-[35px] gap-[30px] hidden lg:flex">
              {filterGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="flex items-center gap-[20px]">
                  <div className="flex sm:flex-wrap items-center gap-[10px]">
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

                    {groupIndex === 3 && (
                      <div className="flex sm:flex-wrap items-center mr-4 gap-[20px]">
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px]   items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px]   items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
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
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px]  items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px]  items-center bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {groupIndex === 1 && (
                      <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                        <p>Кухня </p>
                        <div className="flex gap-[20px]">
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="От"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex  xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                          <div>
                            <input
                              id={`input-to-${groupIndex}`}
                              type="number"
                              placeholder="До"
                              className="w-[45px] h-[40px] border-none rounded-[15px] flex xl:pl-[10px]   bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {groupIndex !== 2 && groupIndex !== 3 && (
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

                          return (
                            <>
                              {buttonIndex === 0 && groupIndex === 1 && <p>Общая </p>}
                              {buttonIndex === 0 && groupIndex === 0 && <p>Не более </p>}
                              <ButtonFilters
                                key={`${groupIndex}-${buttonIndex}`}
                                color="blue"
                                id={`button-${groupIndex}-${buttonIndex}`}
                                height="40px"
                                rounded="15px"
                                width={button.width}
                                className={`transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:text-white ${
                                  activeButtons.includes(buttonIndex)
                                    ? 'bg-blue-700 text-white'
                                    : ''
                                }`}
                                onClick={() => {
                                  console.log(
                                    `Clicked button ID: button-${groupIndex}-${buttonIndex}`,
                                  );
                                  handleButtonClick(
                                    groupId,
                                    buttonIndex,
                                    button.label,
                                    group.buttons,
                                  );
                                }}
                              >
                                {button.label}
                              </ButtonFilters>

                              {buttonIndex === 1 && groupIndex === 1 && <p>Жилая </p>}
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
                <p className="min-w-[200px] text-[18px] text-left font-semibold text-gray-800">
                  {section.title}
                </p>

                <div className="flex flex-wrap sm:flex-row sm:items-center gap-4">
                  {sectionIndex === 1 && (
                    <div className="flex sm:flex-wrap items-center mr-4  gap-[20px] ">
                      <p>Кухня </p>
                      <div className="flex gap-[20px]">
                        <div>
                          <input
                            id={`input-to-${sectionIndex}`}
                            type="number"
                            placeholder="От"
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex  2xl:pl-[10px] bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                        <div>
                          <input
                            id={`input-to-${sectionIndex}`}
                            type="number"
                            placeholder="До"
                            className="w-[45px] h-[40px] border-none rounded-[15px] flex 2xl:pl-[10px]   bg-[#F3F3F3] text-[#152242] text-center placeholder:text-[#152242] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {sectionIndex === 2 || sectionIndex === 3 || sectionIndex === 5 ? (
                    <div className="flex gap-[20px]">
                      <input
                        id={`input-from-${sectionIndex}`}
                        type="number"
                        placeholder="От"
                        className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px] items-center bg-[#F3F3F3] text-[#152242] text-left placeholder:text-[#152242] focus:outline-none"
                      />
                      <input
                        id={`input-to-${sectionIndex}`}
                        type="number"
                        placeholder="До"
                        className="w-[45px] h-[40px] border-none rounded-[15px] flex pl-[10px] items-center bg-[#F3F3F3] text-[#152242] text-left placeholder:text-[#152242] focus:outline-none"
                      />
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
                          />
                        );
                      }

                      if (button.label === 'Введите слова') {
                        return (
                          <input
                            key={`${sectionIndex}-${buttonIndex}`}
                            type="text"
                            placeholder="Введите слова"
                            className="h-[40px] w-[150px] pl-3 pr-2 bg-[#F3F3F3] text-[#152242] rounded-[15px] focus:outline-none"
                          />
                        );
                      }

                      return (
                        <>
                          {buttonIndex === 0 && sectionIndex === 1 && <p>Общая </p>}
                          {buttonIndex === 0 && sectionIndex === 0 && <p>Не более </p>}
                          <ButtonFilters
                            key={`${sectionIndex}-${buttonIndex}`}
                            color="blue"
                            id={`button-${sectionIndex}-${buttonIndex}`}
                            height="40px"
                            rounded="15px"
                            width={button.width}
                            className={`transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:text-white ${activeButtons.includes(buttonIndex) ? 'bg-blue-700 text-white' : ''}`}
                            onClick={() => {
                              console.log(
                                `Clicked button ID: button-${sectionIndex}-${buttonIndex}`,
                              );
                              handleButtonClick(
                                groupId,
                                buttonIndex,
                                button.label,
                                section.group.buttons,
                              );
                            }}
                          >
                            {button.label}
                          </ButtonFilters>

                          {buttonIndex === 1 && sectionIndex === 1 && <p>Жилая </p>}
                        </>
                      );
                    })
                  )}
                </div>
              </div>
            ))}
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

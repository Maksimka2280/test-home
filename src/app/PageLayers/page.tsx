'use client';
import BigCard from '@/components/shared/Card/BigCard';
import CityList from '@/components/ui/CityRender/CityRender';
import { RootState } from '@/store/store';
import { ChevronRight, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ModalEditingEquastions from '@/components/ui/Modal/ModalEditingEquastions';

export default function PageLayers() {
  const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <div className="flex justify-center mb-[35px] pr-[10px] mt-[20px]">
          <div className="flex flex-wrap items-center justify-center lg:justify-between w-full max-w-[1360px] 2xl:max-w-[1760px] ">
            <div className="pt-[50px]">
              <p className="text-center sm:text-left w-full sm:w-auto">
                Сервис для поиска недвижимости в Швейцарии
              </p>
              <p className="flex ml-[30px] items-center lg:ml-0 text-[#A0A6B2] mt-[12px] text-[14px] ">
                Недвижимость в Санкт-Галлен
                <ChevronRight size={16} className="mx-[6px] sm:mx-[10px]" />
                <span className="text-[14px] font-medium">Сравнение</span>
              </p>
            </div>

            <div className="min-w-[200px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[360px] xl:min-w-[380px] max-w-full bg-[#F3F3F3] rounded-[15px] mt-[10px] ml-[10px] flex sm:flex-row flex-col gap-3 sm:gap-2 justify-center sm:items-center p-[18px]">
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
      </div>

      <div className="flex justify-center items-center w-full overflow-hidden mt-[80px]">
        <div
          className="flex justify-center items-center gap-[30px] max-w-[1770px] w-full overflow-x-auto custom-scrollbar p-10"
          style={{ transform: 'rotate(180deg)' }}
        >
          <div style={{ transform: 'rotate(-180deg)', display: 'flex', gap: '30px' }}>
            <BigCard onEditComparison={openModal} />
            <BigCard onEditComparison={openModal} />
            <BigCard onEditComparison={openModal} />
            <BigCard onEditComparison={openModal} />
            <BigCard onEditComparison={openModal} />
            <BigCard onEditComparison={openModal} />
            <BigCard onEditComparison={openModal} />
            <BigCard onEditComparison={openModal} />

            <BigCard onEditComparison={openModal} />
          </div>
        </div>
      </div>

      {/* Модальное окно, которое появляется поверх всего */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <ModalEditingEquastions isOpen={isModalOpen} onClose={closeModal} />
        </div>
      )}
    </>
  );
}

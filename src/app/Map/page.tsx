'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/shared/Button/Button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null); // Ссылка на карту

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Инициализация карты только если она ещё не инициализирована
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }) // Отключаем стандартные кнопки зума
        .setView([55.58025722201384, 36.726230799187455], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Кастомные кнопки зума
      const zoomInButton: L.Control = L.control({ position: 'topright' });
      zoomInButton.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-zoom-in');
        div.innerHTML = '+';
        div.className =
          'cursor-pointer bg-[#0468FF] text-white font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#035cbf] absolute top-[170px] sm:top-[150px] md:top-[270px]';
        div.onclick = function () {
          mapInstance.current?.zoomIn();
        };
        return div;
      };
      zoomInButton.addTo(mapInstance.current);

      const zoomOutButton: L.Control = L.control({ position: 'topright' });
      zoomOutButton.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-zoom-out');
        div.innerHTML = '-';
        div.className =
          'cursor-pointer bg-[#0468FF] text-white font-bold text-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#035cbf] absolute top-[170px] sm:top-[150px] md:top-[270px]';
        div.onclick = function () {
          mapInstance.current?.zoomOut();
        };
        return div;
      };
      zoomOutButton.addTo(mapInstance.current);
    }
  }, []);

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-[1440px] 2xl:max-w-[1810px] w-full mx-auto">
          <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 xl:gap-[65px] max-w-[1440px] 2xl:max-w-[1810px] w-full ">
            <li>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg">Квартира в новостройке</p>
            </li>
            <li>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg">Квартира во вторичке</p>
            </li>
            <li>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg">2 комнаты</p>
            </li>
            <li>
              <p className="text-sm sm:text-base md:text-lg lg:text-lg">Цена</p>
            </li>
            <li>
              <Link
                href={'#'}
                className="flex items-center font-bold text-[#0468FF] py-2 sm:py-4 lg:text-lg"
              >
                Больше фильтров
                <ChevronRight size={14} color="#0468FF" fontWeight="bold" strokeWidth={3} />
              </Link>
            </li>
            <li>
              <input
                type="text"
                className="w-full sm:w-[300px] md:w-[400px] lg:w-[455px] h-[40px] sm:h-[45px] md:h-[48px] rounded-[10px] sm:rounded-[12px] md:rounded-[15px] pl-4 sm:pl-5 focus:outline-none focus:border-none"
                placeholder="Город, адрес, метро, район, ж/д, шоссе или ЖК"
              />
            </li>
            <li>
              <Button color="blue" height="48px" width="210px" rounded="15px">
                Сохранить фильтр
              </Button>
            </li>
          </ul>
          <div className="flex justify-center items-center mt-4 sm:mt-12">
            <div
              ref={mapRef}
              className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] 2xl:max-w-[1770px] h-[500px] sm:h-[400px] md:h-[500px] lg:h-[690px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px]"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

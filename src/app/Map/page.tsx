'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/shared/Button/Button';

import { createRoot } from 'react-dom/client';
import L, { LatLngTuple } from 'leaflet';

import 'leaflet/dist/leaflet.css';

import ModalOrganizations from '@/components/ui/Modal/ModalOrganisation';

import ModalTimer from '@/components/ui/Modal/ModalTimer';
import ModalMoreFilter from '@/components/ui/Modal/ModalMoreFilters';
import ModalChoiceCity from '@/components/ui/Modal/ModalChoiceCity';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '../../shared/styles/globals.scss';
import CityList from '@/components/ui/CityRender/CityRender';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null); // Начальное значение null

  const [selectedOrganizations, setSelectedOrganizations] = useState<any[]>([]);
  const handleSearch = async (query: string) => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error('Не удалось выполнить запрос');
      }

      const results = await response.json();

      if (Array.isArray(results) && results.length > 0) {
        const { lat, lon } = results[0];

        const latitude = parseFloat(String(lat));
        const longitude = parseFloat(String(lon));

        if (!isNaN(latitude) && !isNaN(longitude)) {
          mapInstance.current?.setView([latitude, longitude], 13);
        } else {
          alert('Неверные координаты');
        }
      } else {
        alert('Местоположение не найдено');
      }
    } catch (error) {
      console.error('Ошибка поиска:', error);
      alert('Произошла ошибка при поиске');
    }
  };
  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement instanceof HTMLInputElement) {
        try {
          // Если handleSearch возвращает промис, используем await
          await handleSearch(inputElement.value);
        } catch (error) {
          console.error('Ошибка при выполнении поиска:', error);
        }
      }
    }
  };

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView(
        [47.3769, 8.5417],
        13,
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      const customBlockLeft = new L.Control({ position: 'topright' });
      customBlockLeft.onAdd = function () {
      const div = L.DomUtil.create('div', 'custom-map-left');

        div.innerHTML = `
          <div class="min-w-[200px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[360px] xl:min-w-[380px] max-w-full bg-[#fff] rounded-[15px] border border-[#E0E0E0] mt-[10px] ml-[10px] flex sm:flex-row flex-col gap-3 sm:gap-2 justify-center sm:items-center p-[18px]">
            <div id="modal-choice-city-container"></div>
            <div class="w-[17px] h-[17px] flex-shrink-0 mx-auto sm:mx-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#0164EB">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 4.25 4.5 8.25 6.31 10.5.39.5 1.19.5 1.58 0C14.5 17.25 19 13.25 19 9c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div id="city-list-container"></div>
          </div>
        `;

        const modalContainer = div.querySelector('#modal-choice-city-container');
        const cityListContainer = div.querySelector('#city-list-container');

        if (modalContainer) {
          const root = createRoot(modalContainer);
          root.render(
            <Provider store={store}>
              <ModalChoiceCity />
            </Provider>,
          );
        }

        if (cityListContainer) {
          const cityRoot = createRoot(cityListContainer);
          cityRoot.render(
            <Provider store={store}>
              <CityList />
            </Provider>,
          );
        }

        return div;
      };

      customBlockLeft.addTo(mapInstance.current);

      const customControlContainer = new L.Control({ position: 'topright' });
      customControlContainer.onAdd = function () {
        const div = L.DomUtil.create('div', 'custom-map-container');

        const wrapper = document.createElement('div');
        wrapper.className =
          'flex flex-wrap lg:flex-nowrap justify-center items-center gap-[10px] absolute top-[10px] right-[1px]';

        const box1 = document.createElement('div');
        box1.className =
          'w-[192px] h-[57px] bg-[#fff] rounded-[15px] flex justify-center items-center ml-[20px] lg:ml-0 ';

        const box2 = document.createElement('div');
        box2.className =
          'w-[215px] h-[57px] bg-[#fff] rounded-[15px] flex justify-center items-center';

        const contentContainer = document.createElement('div');
        contentContainer.className = 'flex items-center gap-2';

        // Создаём SVG (иконку)
        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.setAttribute('width', '24');
        svgIcon.setAttribute('height', '24');
        svgIcon.setAttribute('viewBox', '0 0 24 24');
        svgIcon.setAttribute('fill', 'none');
        svgIcon.setAttribute('stroke', '#0468FF');
        svgIcon.setAttribute('stroke-width', '2');
        svgIcon.setAttribute('stroke-linecap', 'round');
        svgIcon.setAttribute('stroke-linejoin', 'round');
        svgIcon.classList.add('lucide', 'lucide-list-icon', 'lucide-list');

        // Вставляем пути (path) в SVG
        const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path1.setAttribute('d', 'M3 12h.01');
        const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path2.setAttribute('d', 'M3 18h.01');
        const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path3.setAttribute('d', 'M3 6h.01');
        const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path4.setAttribute('d', 'M8 12h13');
        const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path5.setAttribute('d', 'M8 18h13');
        const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path6.setAttribute('d', 'M8 6h13');

        // Добавляем пути в SVG
        svgIcon.appendChild(path1);
        svgIcon.appendChild(path2);
        svgIcon.appendChild(path3);
        svgIcon.appendChild(path4);
        svgIcon.appendChild(path5);
        svgIcon.appendChild(path6);

        // Создаём текст
        const text = document.createElement('span');
        text.textContent = '999 объекта списком'; // Текст
        text.classList.add('font-semibold', 'text-[15px]'); // Применяем шрифт и цвет для текста

        // Добавляем иконку и текст в контейнер
        contentContainer.appendChild(svgIcon);
        contentContainer.appendChild(text);

        // Вставляем в box2
        box2.appendChild(contentContainer);

        // ✅ Контейнер ДЛЯ РЕАКТА внутри box1
        const reactContainer = document.createElement('div');
        reactContainer.id = 'modal-organizations-container';
        reactContainer.style.width = '100%';
        reactContainer.style.display = 'flex'; // ✅ Flex-контейнер
        reactContainer.style.alignItems = 'center'; // ✅ Центр по вертикали
        reactContainer.style.justifyContent = 'center'; // ✅ Центр по горизонтали

        box1.appendChild(reactContainer); // ✅ Теперь внутри box1

        wrapper.appendChild(box1);
        wrapper.appendChild(box2);
        div.appendChild(wrapper);

        setTimeout(() => {
          createRoot(reactContainer).render(
            <ModalOrganizations onSelect={setSelectedOrganizations} />,
          );
        }, 0);
        console.log(selectedOrganizations);
        return div;
      };

      customControlContainer.addTo(mapInstance.current);

      const zoomInButton = new L.Control({ position: 'topright' });

      zoomInButton.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-zoom-in');
        div.innerHTML = '+';
        div.className =
          'cursor-pointer bg-[#0468FF] text-white text-xl w-10 h-10 rounded-full flex right-[10px] items-center justify-center hover:bg-[#035cbf] absolute top-[180px] sm:top-[220px] md:top-[220px]';
        div.style.userSelect = 'none';
        div.style.cursor = 'pointer';
        div.style.zIndex = '2';

        div.onclick = function () {
          mapInstance.current?.zoomIn();
        };

        return div;
      };

      zoomInButton.addTo(mapInstance.current);

      const zoomOutButton = new L.Control({ position: 'topright' });

      zoomOutButton.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-zoom-out');
        div.innerHTML = '-';
        div.className =
          'cursor-pointer bg-[#0468FF] text-white text-xl w-10 h-10 rounded-full flex right-[10px] items-center justify-center hover:bg-[#035cbf] absolute top-[180px] sm:top-[220px] md:top-[220px]';
        div.style.userSelect = 'none';
        div.style.cursor = 'pointer';
        div.style.zIndex = '2';
        div.onclick = function () {
          mapInstance.current?.zoomOut();
        };
        return div;
      };

      zoomOutButton.addTo(mapInstance.current);

      // Три кнопки в правом нижнем углу
      const bottomRightButtons = new L.Control({ position: 'bottomright' });
      bottomRightButtons.onAdd = function () {
        const div = L.DomUtil.create('div', 'custom-map-buttons');
        div.innerHTML = `
          <div class="flex flex-col gap-[5px] p-[11px] ">
            <button class="w-[38px] h-[38px] bg-[#ffffff] rounded-[38px] flex items-center justify-center" id="firstButton">
              <!-- Этот элемент будет заменен на React компонент -->
            </button>
            <button id="pinButton" class="w-[38px] h-[38px] bg-[#ffffff] rounded-[38px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#0468FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </button>
      
            <button id="rulerButton" class="w-[38px] h-[38px] bg-[#ffffff] rounded-[38px] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#0468FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
                <path d="m14.5 12.5 2-2"/>
                <path d="m11.5 9.5 2-2"/>
                <path d="m8.5 6.5 2-2"/>
                <path d="m17.5 15.5 2-2"/>
              </svg>
            </button>
          </div>
        `;

        // Интеграция React компонента в первую кнопку
        const firstButtonContainer = div.querySelector('#firstButton');
        if (firstButtonContainer) {
          setTimeout(() => {
            createRoot(firstButtonContainer).render(<ModalTimer />);
          }, 0);
        }

        // Слушаем события кнопок
        setTimeout(() => {
          const pinButton = div.querySelector('#pinButton');
          const rulerButton = div.querySelector('#rulerButton');

          if (pinButton) {
            pinButton.addEventListener('click', () => {
              const center: LatLngTuple = [47.3769, 8.5417];
              mapInstance.current?.setView(center, 13);
            });
          }

          if (rulerButton) {
            rulerButton.addEventListener('click', () => {
              alert('Скоро...');
            });
          }
        }, 100);

        return div;
      };

      bottomRightButtons.addTo(mapInstance.current);
    }
  }, []);

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-[1440px] 2xl:max-w-[1810px] w-full mx-auto">
          <ul className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8 xl:gap-[55px] max-w-[1440px] 2xl:max-w-[1810px] w-full">
            <li className="w-full sm:w-auto text-center sm:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-black transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-[#0468FF] hover:translate-y-[-5px]">
                Квартира в новостройке
              </p>
            </li>
            <li className="w-full sm:w-auto text-center sm:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-black transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-[#0468FF] hover:translate-y-[-5px]">
                Квартира во вторичке
              </p>
            </li>
            <li className="w-full sm:w-auto text-center sm:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-black transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-[#0468FF] hover:translate-y-[-5px]">
                2 комнаты
              </p>
            </li>
            <li className="w-full sm:w-auto text-center sm:text-left">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-black transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-[#0468FF] hover:translate-y-[-5px]">
                Цена
              </p>
            </li>
            <li className="w-full sm:w-auto text-center sm:text-left">
              <ModalMoreFilter />
            </li>
            <li className="w-full sm:w-auto text-center sm:text-left">
              <input
                type="text"
                className="w-full sm:w-[300px] md:w-[400px] lg:w-[455px] h-[40px] bg-[#fff] sm:h-[45px] md:h-[48px] rounded-[15px] pl-4 sm:pl-5 focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-105"
                placeholder="Город, адрес, метро, район, ж/д, шоссе или ЖК"
                onKeyUp={e => handleKeyUp(e)}
              />
            </li>
            <li className="w-full sm:w-auto flex justify-center sm:justify-start hover:scale-105 duration-300 ease-in-out transform">
              <Button color="blue" height="48px" width="210px" rounded="15px">
                Сохранить фильтр
              </Button>
            </li>
          </ul>

          <div className="flex justify-center items-center mt-4 sm:mt-12">
            <div
              ref={mapRef}
              className="w-full max-w-[500px] z-[1] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1200px] 2xl:max-w-[1780px] h-[700px] sm:h-[700px] md:h-[700px] lg:h-[690px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px]"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

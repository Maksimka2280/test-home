'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/shared/Button/Button';

import { createRoot } from 'react-dom/client';
import L, { DivIconOptions, Icon, IconOptions, LatLngTuple } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

import ModalOrganizations from '@/components/ui/Modal/ModalOrganisation';

import ModalTimer from '@/components/ui/Modal/ModalTimer';
import ModalMoreFilter from '@/components/ui/Modal/ModalMoreFilters';
import ModalChoiceCity from '@/components/ui/Modal/ModalChoiceCity';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '@/store/store';
import '../../shared/styles/globals.scss';
import CityList from '@/components/ui/CityRender/CityRender';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { fetchHospitalsInSwitzerland } from '@/api/hospital';
import { fetchParkingsInSwitzerland } from '@/api/parking';
import { fetchSchoolsInSwitzerland } from '@/api/school';
import { fetchShopsInSwitzerland } from '@/api/shop';
import { fetchKindergartensInSwitzerland } from '@/api/kindergartens';

interface Poin2t {
  type: number;
  lat: number;
  lon: number;
  city?: string;
  time_on_foot_to_subway?: number;
  time_on_transport_to_subway?: number;
}
interface agashka {
  lat: number;
  lon: number;
  city?: string;
  time_on_foot_to_subway?: number;
  time_on_transport_to_subway?: number;
}
interface CustomDivIconOptions extends DivIconOptions {
  type?: number;
}
interface Typetimer {
  time_transport?: number;
  time_foot?: number;
  time_bus?: number;
  time_bike?: number;
  lat?: number;
  lon?: number;
  city?: string;
  time_on_foot_to_subway?: number;
  time_on_transport_to_subway?: number;
}
export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<Typetimer | null>(null);
  const textRef = useRef<HTMLElement | null>(null);
  const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);
  const [points, setPoints] = useState<agashka[]>([]);
  const [markers, setMarkers] = useState<L.Marker[]>([]);
  const [isMarkerModeActive, setIsMarkerModeActive] = useState(false);
  const [line, setLine] = useState<L.Polyline | null>(null);
  const [distanceLabel, setDistanceLabel] = useState<L.Marker | null>(null);
  const [selectedOrganizations, setSelectedOrganizations] = useState<
    { name: string; id: number }[]
  >([]);
  const idToFetcherMap: Record<number, () => Promise<any>> = {
    1: fetchShopsInSwitzerland,
    2: fetchSchoolsInSwitzerland,
    3: fetchKindergartensInSwitzerland,
    4: fetchHospitalsInSwitzerland,
    5: fetchParkingsInSwitzerland,
  };
  const [shopPoints, setShopPoints] = useState<any[]>([]);
  const [schoolPoints, setSchoolPoints] = useState<any[]>([]);
  const [kindergartenPoints, setKindergartenPoints] = useState<any[]>([]);
  const [hospitalPoints, setHospitalPoints] = useState<any[]>([]);
  const [parkingPoints, setParkingPoints] = useState<any[]>([]);
  const filteredPoints = useMemo(() => {
    return points.filter((item: agashka) => item.city && selectedCities.includes(item.city));
  }, [points, selectedCities]);

  const bottomRightButtonsRef = useRef<L.Control | null>(null);

  const handleSearch = async (query: string) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=CH`,
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
          await handleSearch(inputElement.value);
        } catch (error) {
          console.error('Ошибка при выполнении поиска:', error);
        }
      }
    }
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      for (const item of selectedOrganizations) {
        const fetcher = idToFetcherMap[item.id];
        if (fetcher) {
          try {
            const coords = await fetcher();

            if (!Array.isArray(coords)) {
              console.error(`Неверный формат данных для ${item.name}`);
              return;
            }

            console.log(`Координаты для ${item.name}:`, coords);

            const formattedCoords = coords.map(coord => ({
              ...coord,
              type: item.id,
            }));

            if (item.id === 1) {
              setShopPoints(formattedCoords);
            } else if (item.id === 2) {
              setSchoolPoints(formattedCoords);
            } else if (item.id === 3) {
              setKindergartenPoints(formattedCoords);
            } else if (item.id === 4) {
              setHospitalPoints(formattedCoords);
            } else if (item.id === 5) {
              setParkingPoints(formattedCoords);
            }
          } catch (err) {
            console.error(`Ошибка при загрузке ${item.name}:`, err);
          }
        }
      }
    };

    const selectedIds = selectedOrganizations.map(item => item.id);

    if (!selectedIds.includes(1)) setShopPoints([]);
    if (!selectedIds.includes(2)) setSchoolPoints([]);
    if (!selectedIds.includes(3)) setKindergartenPoints([]);
    if (!selectedIds.includes(4)) setHospitalPoints([]);
    if (!selectedIds.includes(5)) setParkingPoints([]);

    if (selectedOrganizations.length > 0) {
      void loadData();
    }
  }, [selectedOrganizations]);

  const pointArray = useMemo(() => {
    const combinedPoints = [
      ...shopPoints,
      ...schoolPoints,
      ...kindergartenPoints,
      ...hospitalPoints,
      ...parkingPoints,
    ];
    return combinedPoints;
  }, [shopPoints, schoolPoints, kindergartenPoints, hospitalPoints, parkingPoints]);

  const markersRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!mapInstance.current) return;

    if (markersRef.current) {
      mapInstance.current.removeLayer(markersRef.current);
    }

    const getColorByType = (type: number) => {
      switch (type) {
        case 1:
          return '#0468FF';
        case 2:
          return '#28a745';
        case 3:
          return '#ffc107';
        case 4:
          return '#dc3545';
        case 5:
          return '#6c757d';
        default:
          return '#999';
      }
    };

    const markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 35,
      iconCreateFunction: function (cluster) {
        const children = cluster.getAllChildMarkers();
        const firstMarker = children[0];
        const icon = firstMarker?.options.icon as Icon & {
          options: IconOptions & { type?: string };
        };
        const firstMarkerType = Number(icon?.options.type ?? 0);
        const color = getColorByType(firstMarkerType);
        const count = cluster.getChildCount();

        return L.divIcon({
          html: `<div style="background-color: ${color}; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">${count}</div>`,
          className: 'custom-cluster-icon',
          iconSize: [28, 28],
        });
      },
    });

    pointArray.forEach((item: Poin2t) => {
      if (!item.lat || !item.lon) {
        console.log('Пропущена точка, у которой нет координат:', item);
        return;
      }

      const color = getColorByType(item.type);
      const marker = L.marker([item.lat, item.lon], {
        icon: L.divIcon({
          className: 'custom-circle-icon',
          html: `<div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%;"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
          type: item.type,
        } as CustomDivIconOptions),
      });
      markers.addLayer(marker);
    });

    mapInstance.current.addLayer(markers);
    markersRef.current = markers;
  }, [pointArray]);
  interface ApiResponse {
    items: Poin2t[];
  }

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/adverts/adverts_list/`, {
          params: {
            page_size: 30,
          },
        });

        const filteredCards: agashka[] = response.data.items.map(item => ({
          lat: item.lat,
          lon: item.lon,
          city: item.city,
          time_foot: item.time_on_foot_to_subway,
          time_transport: item.time_on_transport_to_subway,
        }));

        console.log(filteredCards);
        setPoints(filteredCards);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    void fetchData();
  }, []);

  useEffect(() => {
    if (points.length > 0 && mapInstance.current) {
      markersRef.current = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 35,
        iconCreateFunction: function (cluster) {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div style="background-color: #0468FF; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">${count}</div>`,
            className: 'custom-cluster-icon',
            iconSize: [28, 28],
          });
        },
      });
      mapInstance.current.addLayer(markersRef.current);

      const currentPoints = selectedCities.length === 0 ? points : filteredPoints;

      currentPoints.forEach((item: agashka) => {
        if (item.lat && item.lon) {
          const marker = L.marker([item.lat, item.lon], {
            icon: L.divIcon({
              className: 'custom-circle-icon',
              html: '<div style="width: 12px; height: 12px; background-color: #0468FF; border-radius: 50%;"></div>',
              iconSize: [12, 12],
              iconAnchor: [6, 6],
            }),
          });

          marker.on('click', () => {
            setSelectedPoint(item);
            console.log(item);
          });

          markersRef.current?.addLayer(marker);
        }
      });
    }
  }, [selectedCities, points, filteredPoints]);

  const handleSelect = (selectedItems: { id: number; name: string }[]) => {
    setSelectedOrganizations(selectedItems);
    console.log('Выбранные элементы:', selectedItems);
  };

  useEffect(() => {
    if (!mapInstance.current) return;

    const customControlContainer = new L.Control({ position: 'topright' });

    customControlContainer.onAdd = function () {
      const div = L.DomUtil.create('div', 'custom-map-container');

      const wrapper = document.createElement('div');
      wrapper.className =
        'flex flex-wrap lg:flex-nowrap justify-center items-center gap-[10px] absolute top-[10px] right-[1px] top-[-101px]';

      const box1 = document.createElement('div');
      box1.className =
        'w-[192px] h-[57px] bg-[#fff] rounded-[15px] flex justify-center items-center ml-[20px] lg:ml-0 ';

      const box2 = document.createElement('div');
      box2.className =
        'w-[215px] h-[57px] bg-[#fff] rounded-[15px] flex justify-center items-center';

      const contentContainer = document.createElement('div');
      contentContainer.className = 'flex items-center gap-2';

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

      ['M3 12h.01', 'M3 18h.01', 'M3 6h.01', 'M8 12h13', 'M8 18h13', 'M8 6h13'].forEach(d => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        svgIcon.appendChild(path);
      });

      const text = document.createElement('span');
      textRef.current = text;

      text.textContent = `${points.length} объектов`;
      text.classList.add('font-semibold', 'text-[15px]');

      const currentCount = selectedCities.length === 0 ? points.length : filteredPoints.length;

      if (textRef.current) {
        textRef.current.textContent = `${currentCount} объектов`;
      }
      text.classList.add('font-semibold', 'text-[15px]');

      contentContainer.appendChild(svgIcon);
      contentContainer.appendChild(text);

      box2.appendChild(contentContainer);

      const reactContainer = document.createElement('div');
      reactContainer.id = 'modal-organizations-container';
      reactContainer.style.width = '100%';
      reactContainer.style.display = 'flex';
      reactContainer.style.alignItems = 'center';
      reactContainer.style.justifyContent = 'center';

      box1.appendChild(reactContainer);
      wrapper.appendChild(box1);
      wrapper.appendChild(box2);
      div.appendChild(wrapper);

      setTimeout(() => {
        createRoot(reactContainer).render(<ModalOrganizations onSelect={handleSelect} />);
      }, 0);

      return div;
    };

    customControlContainer.addTo(mapInstance.current);

    return () => {
      mapInstance.current?.removeControl(customControlContainer);
    };
  }, [points.length, filteredPoints.length, selectedCities]);

  const resetMarkersAndLine = () => {
    if (!mapInstance.current) return;

    markers.forEach(marker => mapInstance.current!.removeLayer(marker));
    setMarkers([]);

    if (line) {
      mapInstance.current.removeLayer(line);
      setLine(null);
    }

    if (distanceLabel) {
      mapInstance.current.removeLayer(distanceLabel);
      setDistanceLabel(null);
    }
  };

  useEffect(() => {
    if (!isMarkerModeActive) {
      resetMarkersAndLine();
      return;
    }
  }, [isMarkerModeActive]);

  const blueDotIcon = L.divIcon({
    className: 'custom-blue-dot',
    html: '<div class="w-[15px] h-[15px] bg-[#23ffab] rounded-full"></div>',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
  });

  const drawLineAndDistance = (latlngs: L.LatLng[]) => {
    if (line) mapInstance.current!.removeLayer(line);
    if (distanceLabel) mapInstance.current!.removeLayer(distanceLabel);

    const newLine = L.polyline(latlngs, {
      color: '#0468FF',
      weight: 2,
      dashArray: '4',
    }).addTo(mapInstance.current!);
    setLine(newLine);

    let totalDistance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      totalDistance += latlngs[i].distanceTo(latlngs[i + 1]);
    }

    const formatted =
      totalDistance > 1000
        ? `${(totalDistance / 1000).toFixed(2)} км`
        : `${Math.round(totalDistance)} м`;

    const last = latlngs.length - 1;
    const labelLat = (latlngs[0].lat + latlngs[last].lat) / 2;
    const labelLng = (latlngs[0].lng + latlngs[last].lng) / 2;

    const label = L.marker([labelLat, labelLng], {
      icon: L.divIcon({
        className: '',
        html: `<div class="bg-white px-[6px] py-[2px] rounded-md shadow text-xs font-semibold text-[#0468FF]">${formatted}</div>`,
        iconSize: [100, 24],
        iconAnchor: [50, 12],
      }),
    }).addTo(mapInstance.current!);

    setDistanceLabel(label);
  };

  const handleMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      if (!isMarkerModeActive || !mapInstance.current) return;

      const clickedLatLng = e.latlng;

      if (markers.length >= 2) {
        resetMarkersAndLine();
        return;
      }

      const newMarker = L.marker(clickedLatLng, { icon: blueDotIcon }).addTo(mapInstance.current);
      const updatedMarkers = [...markers, newMarker];
      setMarkers(updatedMarkers);

      const latlngs = updatedMarkers.map(m => m.getLatLng());
      if (latlngs.length >= 2) {
        drawLineAndDistance(latlngs);
      }
    },
    [isMarkerModeActive, markers],
  );
  // const handleMapClick = useCallback((e: L.LeafletEvent) => {
  //   if (!isMarkerModeActive || !mapInstance.current) return;

  //   const clickedLatLng = e.latlng;

  //   setMarkers(prevMarkers => {
  //     if (prevMarkers.length >= 2) {
  //       resetMarkersAndLine();
  //       return [];
  //     }

  //     const newMarker = L.marker(clickedLatLng, { icon: blueDotIcon }).addTo(mapInstance.current!);
  //     const updatedMarkers = [...prevMarkers, newMarker];

  //     if (updatedMarkers.length >= 2) {
  //       const latlngs = updatedMarkers.map(m => m.getLatLng());
  //       drawLineAndDistance(latlngs);
  //     }

  //     return updatedMarkers;
  //   });
  // }, [isMarkerModeActive]);
  useEffect(() => {
    if (!mapInstance.current) return;

    const map = mapInstance.current;
    if (isMarkerModeActive) {
      map.on('click', handleMapClick);
    } else {
      map.off('click', handleMapClick);
    }
    return () => {
      map.off('click', handleMapClick);
    };
  }, [isMarkerModeActive, handleMapClick]);

  useEffect(() => {
    if (!mapInstance.current) return;

    const bottomRightButtons = new L.Control({ position: 'bottomright' });
    bottomRightButtons.onAdd = function () {
      const div = L.DomUtil.create('div', 'custom-map-buttons');
      div.innerHTML = `
      <div class="flex flex-col gap-[5px] p-[11px]">
        <button class="w-[38px] h-[38px] bg-[#ffffff] rounded-[38px] flex items-center justify-center" id="firstButton"></button>
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
      const pinButton = div.querySelector('#pinButton');
      if (pinButton) {
        pinButton.addEventListener('click', () => {
          const center: LatLngTuple = [47.3769, 8.5417];
          mapInstance.current?.setView(center, 13);
        });
      }
      const rulerButton = div.querySelector('#rulerButton');
      if (rulerButton) {
        rulerButton.addEventListener('click', () => {
          setIsMarkerModeActive(prevState => {
            const newState = !prevState;
            if (!newState) {
              rulerButton.classList.remove('bg-blue-100');
              rulerButton.classList.add('bg-white');
            } else {
              rulerButton.classList.remove('bg-white');
              rulerButton.classList.add('bg-blue-100');
            }
            return newState;
          });
        });
      }
      return div;
    };
    bottomRightButtons.addTo(mapInstance.current);
    bottomRightButtonsRef.current = bottomRightButtons;
  }, []);
  useEffect(() => {
    const firstButtonContainer = bottomRightButtonsRef.current
      ?.getContainer()
      ?.querySelector('#firstButton');
    if (firstButtonContainer) {
      firstButtonContainer.innerHTML = '';
      createRoot(firstButtonContainer).render(<ModalTimer data={selectedPoint!} />);
    }
  }, [selectedPoint]);

  useEffect(() => {
    console.log(points.length);
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
    }
  }, [points, selectedPoint]);

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

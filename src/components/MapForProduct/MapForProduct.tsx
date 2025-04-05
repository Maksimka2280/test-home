'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../shared/styles/globals.scss';

type MapProductProps = {
  coordinates: [number, number]; // [latitude, longitude]
};

export default function MapProduct({ coordinates }: MapProductProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView(coordinates, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

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
          'cursor-pointer bg-[#0468FF] text-white text-xl w-10 h-10 rounded-full flex right-[10px] items-center justify-center hover:bg-[#035cbf] absolute top-[220px] sm:top-[270px] md:top-[270px]';
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
  }, [coordinates]); // теперь карта будет перестраиваться, если координаты изменятся

  return <div ref={mapRef} className="w-full max-w-[500px] z-[1] sm:max-w-[750px] h-[546px]"></div>;
}

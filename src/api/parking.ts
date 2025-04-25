import axios from 'axios';

// Определяем интерфейс для элемента данных (парковка)
interface ParkingElement {
  lat?: number;
  lon?: number;
  type: 'node' | 'way' | 'relation';
  center?: {
    lat: number;
    lon: number;
  };
}

// Определяем интерфейс для ответа от Overpass API
interface OverpassApiResponse {
  elements: ParkingElement[];
}

// Функция для получения координат парковок
export const fetchParkingsInSwitzerland = async (): Promise<
  (ParkingElement & { type: number })[]
> => {
  const query = `
    [out:json][timeout:60];
    area["ISO3166-1"="CH"][admin_level=2]->.searchArea;
    (
      node["amenity"="parking"](area.searchArea);
      way["amenity"="parking"](area.searchArea);
      relation["amenity"="parking"](area.searchArea);
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get<OverpassApiResponse>(url); // Указали тип для данных ответа

    console.log('🅿️ Получены данные по парковкам:', data.elements);

    return data.elements
      .map(el => {
        if (el.type === 'node') {
          return {
            lat: el.lat,
            lon: el.lon,
            type: 5,
          };
        } else if (el.center) {
          return {
            lat: el.center.lat,
            lon: el.center.lon,
            type: 5,
          };
        }
        return null;
      })
      .filter(Boolean) as (ParkingElement & { type: number })[]; // Указали правильный тип для возвращаемых данных
  } catch (err) {
    console.error('❌ Ошибка при получении парковок:', err);
    return [];
  }
};

import axios from 'axios';

// Определяем интерфейс для элемента данных (детский сад)
interface KindergartenElement {
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
  elements: KindergartenElement[];
}

// Функция для получения координат детских садов
export const fetchKindergartensInSwitzerland = async (): Promise<
  (KindergartenElement & { type: number })[]
> => {
  const query = `
    [out:json][timeout:60];
    area["ISO3166-1"="CH"][admin_level=2]->.searchArea;
    (
      node["amenity"="kindergarten"](area.searchArea);
      way["amenity"="kindergarten"](area.searchArea);
      relation["amenity"="kindergarten"](area.searchArea);
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get<OverpassApiResponse>(url); // Указали тип для данных ответа

    console.log('📦 Ответ от Overpass API:', data.elements);

    return data.elements
      .map(el => {
        if (el.type === 'node') {
          return {
            lat: el.lat,
            lon: el.lon,
            type: 3,
          };
        } else if (el.center) {
          return {
            lat: el.center.lat,
            lon: el.center.lon,
            type: 3,
          };
        }
        return null;
      })
      .filter(Boolean) as (KindergartenElement & { type: number })[]; // Указали правильный тип для возвращаемых данных
  } catch (err) {
    console.error('❌ Ошибка при получении координат детских садов:', err);
    return [];
  }
};

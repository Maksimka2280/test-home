import axios from 'axios';

// Определяем интерфейс для элемента данных (магазин)
interface ShopElement {
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
  elements: ShopElement[];
}

// Функция для получения координат магазинов
export const fetchShopsInSwitzerland = async (): Promise<(ShopElement & { type: number })[]> => {
  const query = `
    [out:json][timeout:60];
    area["ISO3166-1"="CH"][admin_level=2]->.searchArea;
    (
      node["shop"](area.searchArea);
      way["shop"](area.searchArea);
      relation["shop"](area.searchArea);
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get<OverpassApiResponse>(url); // Указали тип для данных ответа

    console.log('🛒 Получены данные по магазинам:', data.elements);

    return data.elements
      .map(el => {
        if (el.type === 'node') {
          return {
            lat: el.lat,
            lon: el.lon,
            type: 1,
          };
        } else if (el.center) {
          return {
            lat: el.center.lat,
            lon: el.center.lon,
            type: 1,
          };
        }
        return null;
      })
      .filter(Boolean) as (ShopElement & { type: number })[]; // Указали правильный тип для возвращаемых данных
  } catch (err) {
    console.error('❌ Ошибка при получении магазинов:', err);
    return [];
  }
};

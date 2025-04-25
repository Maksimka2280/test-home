import axios from 'axios';

// Определяем интерфейс для элемента данных (школа)
interface SchoolElement {
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
  elements: SchoolElement[];
}

// Функция для получения координат школ
export const fetchSchoolsInSwitzerland = async (): Promise<
  (SchoolElement & { type: number })[]
> => {
  const query = `
    [out:json][timeout:60];
    area["ISO3166-1"="CH"][admin_level=2]->.searchArea;
    (
      node["amenity"="school"](area.searchArea);
      way["amenity"="school"](area.searchArea);
      relation["amenity"="school"](area.searchArea);
    );
    out center;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Ожидаем 2 секунды, как в оригинальном коде

    const { data } = await axios.get<OverpassApiResponse>(url); // Указали тип для данных ответа

    console.log('🏫 Получены данные по школам:', data.elements);

    return data.elements
      .map(el => {
        if (el.type === 'node') {
          return {
            lat: el.lat,
            lon: el.lon,
            type: 2,
          };
        } else if (el.center) {
          return {
            lat: el.center.lat,
            lon: el.center.lon,
            type: 2,
          };
        }
        return null;
      })
      .filter(Boolean) as (SchoolElement & { type: number })[]; // Указали правильный тип для возвращаемых данных
  } catch (err) {
    console.error('❌ Ошибка при получении школ:', err);
    return [];
  }
};

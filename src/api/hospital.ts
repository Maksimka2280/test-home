import axios from 'axios';
interface HospitalElement {
  lat?: number;
  lon?: number;
  type: 'node' | 'way' | 'relation';
  tags?: {
    ['addr:city']?: string;
  };
  center?: {
    lat: number;
    lon: number;
  };
}

interface OverpassApiResponse {
  elements: HospitalElement[];
}

export const fetchHospitalsInSwitzerland = async (): Promise<
  (HospitalElement & { type: number })[]
> => {
  const query = `
    [out:json][timeout:60];
    area["ISO3166-1"="CH"][admin_level=2]->.searchArea;
    (
      node["amenity"="hospital"](area.searchArea);
      way["amenity"="hospital"](area.searchArea);
      relation["amenity"="hospital"](area.searchArea);
    );
    out center tags;
  `;

  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get<OverpassApiResponse>(url);

    console.log('📦 Ответ от Overpass API:', data.elements);

    return data.elements
      .map(el => {
        const city = el.tags?.['addr:city'];

        if (el.type === 'node') {
          return {
            lat: el.lat,
            lon: el.lon,
            city: city ?? null,
            type: 4,
          };
        } else if (el.center) {
          return {
            lat: el.center.lat,
            lon: el.center.lon,
            city: city ?? null,
            type: 4,
          };
        }
        return null;
      })
      .filter(Boolean) as (HospitalElement & { type: number })[];
  } catch (err) {
    console.error('❌ Ошибка при получении координат:', err);
    return [];
  }
};

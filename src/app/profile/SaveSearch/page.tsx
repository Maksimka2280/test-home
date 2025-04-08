'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

type SearchItem = {
  id: number;
  title: string;
  priceRange: string;
  options: { rooms: string; address: string }[];
  favorite: boolean;
};

const initialSearches: SearchItem[] = [
  {
    id: 1,
    title: 'Квартира в новостройке',
    priceRange: 'от 25.000.000 до 55.000.000',
    options: Array(4).fill({ rooms: '2 комнаты', address: 'Адрес' }),
    favorite: true,
  },
  {
    id: 2,
    title: 'Квартира в новостройке',
    priceRange: 'от 25.000.000 до 55.000.000',
    options: Array(4).fill({ rooms: '2 комнаты', address: 'Адрес' }),
    favorite: false,
  },
];

export default function SaveSearch() {
  const [searches, setSearches] = useState(initialSearches);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (id: number) => {
    setSearches(prev =>
      prev.map(item => (item.id === id ? { ...item, favorite: !item.favorite } : item)),
    );
  };

  const RemoveList = () => {
    setSearches([]);
  };

  const toggleShowFavorites = () => {
    setShowFavorites(prev => !prev);
  };

  const getWordForm = (count: number, forms: [string, string, string]) => {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return forms[0];
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
    return forms[2];
  };

  const displayedSearches = showFavorites ? searches.filter(item => item.favorite) : searches;

  return (
    <div className="p-4 space-y-6 text-sm md:text-base">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-[33px] font-bold">Сохраненные поиски</h1>

        <div className="flex flex-wrap gap-4 md:gap-[45px] items-center">
          <p>
            {displayedSearches.length}{' '}
            {getWordForm(displayedSearches.length, ['поиск', 'поиска', 'поисков'])}
          </p>
          <button className="text-[#0468FF]" onClick={toggleShowFavorites}>
            *Отмеченные
          </button>
          <button className="text-[#0468FF]" onClick={RemoveList}>
            Удалить все
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {displayedSearches.length === 0 && (
          <div className="flex justify-center mt-24 text-center">
            <p className="text-lg">
              {showFavorites ? 'У вас нет отмечённых поисков' : 'У вас нет сохранённых поисков'}
            </p>
          </div>
        )}

        {displayedSearches.map(item => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center py-4 gap-4 text-[#0D1F3A]"
          >
            <div className="w-full md:w-[250px]">
              <div className="font-semibold">{item.title}</div>
              <div className="text-gray-500">{item.priceRange}</div>
            </div>

            <div className="flex flex-wrap gap-4">
              {item.options.map((opt, index) => (
                <div key={index} className="w-[120px]">
                  <div>{opt.rooms}</div>
                  <div className="text-gray-500">{opt.address}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-2 md:mt-0 md:ml-auto">
              <button onClick={() => toggleFavorite(item.id)}>
                <Heart
                  size={18}
                  className={item.favorite ? 'text-[#0468FF] fill-[#0468FF]' : 'text-gray-400'}
                />
              </button>
              <button className="text-[#0468FF] whitespace-nowrap">Использовать</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { Input } from '@/components/shared/Input/Input';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store'; // Импортируем корневой стейт
import { addCity, removeCity } from '../../../store/citiesSlice/citiesSlices';

const GEO_NAMES_API_URL = 'http://api.geonames.org/searchJSON';
const GEO_NAMES_USER = 'penguincity778';

// Дефолтный список городов
const allSwissCities = [
  'Цюрих',
  'Женева',
  'Базель',
  'Лозанна',
  'Берн',
  'Винтертур',
  'Люцерн',
  'Санкт-Галлен',
  'Лугано',
  'Биль/Бьенн',
  'Тун',
  'Кёниц',
  'Ла-Шо-де-Фон',
  'Фрибург',
  'Шаффхаузен',
  'Кьяссо',
  'Глан',
  'Мартиньи',
  'Шпиц',
  'Дельмон',
  'Лангененталь',
  'Баден',
  'Беллинцона',
  'Веве',
];

export default function ModalChoiceCity() {
  const dispatch = useDispatch();
  const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);

  const [isOpen, setIsOpen] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [citiesSuggestions, setCitiesSuggestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleModal = () => setIsOpen(!isOpen);

  const handleCityClick = (city: string) => {
    if (selectedCities.includes(city)) {
      dispatch(removeCity(city));
    } else {
      dispatch(addCity(city));
    }
  };

  const fetchCities = async (query: string) => {
    try {
      const response = await axios.get<{
        geonames?: { name: string }[];
      }>(GEO_NAMES_API_URL, {
        params: {
          q: query,
          maxRows: 10,
          username: GEO_NAMES_USER,
          country: 'CH',
          type: 'json',
        },
      });

      const geonames = response.data.geonames ?? [];

      if (geonames.length > 0) {
        const uniqueCities = Array.from(
          new Map(geonames.map(city => [city.name, city])).values(),
        ).map(city => city.name);

        setCitiesSuggestions(uniqueCities);
      } else {
        console.log('Город не найден');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleAddCity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && cityInput.trim() !== '') {
      if (citiesSuggestions.includes(cityInput.trim())) {
        handleCityClick(cityInput.trim());
        setCityInput('');
        setCitiesSuggestions([]);
      } else {
        console.log('Город не найден');
      }
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setCityInput(value);
    setErrorMessage('');

    if (value === '') {
      setCitiesSuggestions(allSwissCities);
    } else {
      try {
        await fetchCities(value);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setErrorMessage('There was an error fetching city suggestions.');
      }
    }
  };

  const filteredCities = cityInput === '' ? allSwissCities : citiesSuggestions;

  return (
    <>
      <button
        className="flex justify-center items-center font-medium text-[#BCBCBC] lg:text-[16px] transition-all duration-300 ease-in-out transform gap-2"
        onClick={toggleModal}
      >
        Выбрано городов:{' '}
        <span className="text-[#0468FF] font-semibold text-[16px]">{selectedCities.length}</span>
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={toggleModal}
        ></div>
      )}

      {isOpen && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-white z-50 max-w-[90%] w-full md:max-w-[80%] lg:max-w-[1210px] 2xl:max-w-[1500px] h-[80vh] md:h-[672px] transition-all duration-500 ease-in-out overflow-auto p-4 md:p-6">
          <h1 className="text-[20px] md:text-[28px] font-bold text-center">
            Выберите регион или город
          </h1>
          <div className="flex justify-center items-center mt-[20px] md:mt-[35px]">
            <Input
              placeholder="Город"
              type="search"
              value={cityInput}
              onChange={handleInputChange}
              onKeyDown={handleAddCity}
              className="max-w-[90%] md:max-w-[1056px]"
              showSearchButton={false}
            />
          </div>

          {/* Выбранные города */}
          {selectedCities.length > 0 && (
            <div className="flex flex-wrap gap-2 md:gap-4 mt-4 justify-start ml-[10px] md:ml-[55px] max-h-[220px] overflow-y-auto">
              {selectedCities.map(city => (
                <div
                  key={city}
                  className="relative w-[120px] md:w-[160px] h-[45px] md:h-[55px] rounded-[10px] md:rounded-[15px] bg-[#0468FF] text-white flex items-center justify-center text-sm md:text-lg font-medium"
                >
                  {city}
                  <button
                    onClick={() => handleCityClick(city)}
                    className="absolute top-1 right-1 w-[16px] md:w-[20px] h-[16px] md:h-[20px] flex items-center justify-center text-[#ffffff] rounded-full text-xs md:text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Предложения городов */}
          {filteredCities.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 ml-[10px] md:ml-[60px] mt-6 md:mt-10">
              {filteredCities.map(city => (
                <button
                  key={city}
                  onClick={() => handleCityClick(city)}
                  className={`text-left text-base md:text-lg transition-all duration-300 ${
                    selectedCities.includes(city) ? 'text-[#0A2A5A] font-bold' : 'text-[#BCBCBC]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}

          {/* Сообщение об ошибке */}
          {errorMessage && (
            <div className="text-red-500 mt-4 text-sm md:text-base">{errorMessage}</div>
          )}
        </div>
      )}
    </>
  );
}

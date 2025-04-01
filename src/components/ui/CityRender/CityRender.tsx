import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const CityList = () => {
  const selectedCities = useSelector((state: RootState) => state.cities.selectedCities);

  return (
    <p className="font-semibold text-center text-[16px] sm:text-left break-words">
      {selectedCities.length ? selectedCities.join(' / ') : 'Города не выбраны'}
    </p>
  );
};

export default CityList;

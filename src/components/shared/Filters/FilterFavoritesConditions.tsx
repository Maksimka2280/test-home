import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFilter } from '@/components/Context/FromandToYersContext/FromandToYersContext';
import { usePublicationDate } from '@/components/Context/PublicationDateContext/PublicationDateContext';
import { useFloor } from '@/components/Context/FloorsContext/FloorsContext';
import FavoritesCard from '../Card/FavoritesCard';
import { CardType } from '@/types/Card';
import { useTotalAreaFilter } from '@/components/Context/TotakContext/TotakContext';
import { useKitchenAreaFilter } from '@/components/Context/ChickenContext/ChickenContext';
import { useLivingArea } from '@/components/Context/LiveAreaContext/LiveAreaContext';

interface FilteredCardsProps {
  cards: CardType[];
  onDelete: (id: number) => void;
}

const FilteredFavCards: FC<FilteredCardsProps> = ({ cards, onDelete }) => {
  const selectedFilters = useSelector((state: RootState) => state.filters.selectedFilters);
  const { yearFrom, yearTo } = useFilter();
  const { publicationDate } = usePublicationDate();
  const { minTotalArea, maxTotalArea } = useTotalAreaFilter();
  const { minKitchenArea, maxKitchenArea } = useKitchenAreaFilter();
  const { minLivingArea, maxLivingArea } = useLivingArea();
  const { floorFrom, floorTo } = useFloor();
  const from = yearFrom ? parseInt(yearFrom, 10) : 0;
  const to = yearTo ? parseInt(yearTo, 10) : Infinity;
  const filteredCards = cards.filter(card => {
    const buildYear = card.build_year;
    if (buildYear < from || buildYear > to) {
      return false;
    }

    const totalFloors = card.total_floors;
    const minFloor = floorFrom ? parseInt(floorFrom, 10) : 0;
    const maxFloor = floorTo ? parseInt(floorTo, 10) : Infinity;
    if (totalFloors < minFloor || totalFloors > maxFloor) {
      return false;
    }

    if (publicationDate) {
      const cardDate = new Date(card.created_at);
      const selectedDate = new Date(publicationDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (cardDate < selectedDate) {
        return false;
      }
    }
    const floorTip: Record<string, string> = {
      'CheckBox-2-2': 'не первый',
      'CheckBox-2-3': 'не последний',
      'CheckBox-2-4': 'только последний',
    };
    const kitchenArea = card.kitchen_area;
    const minKitchen = minKitchenArea ? parseInt(minKitchenArea, 10) : 0;
    const maxKitchen = maxKitchenArea ? parseInt(maxKitchenArea, 10) : Infinity;
    const cardTotalArea = card.total_area;
    const minTotal = minTotalArea ? parseInt(minTotalArea, 10) : 0;
    const maxTotal = maxTotalArea ? parseInt(maxTotalArea, 10) : Infinity;
    const livingArea = card.living_area ?? 0;
    if (minLivingArea !== null && livingArea < minLivingArea) {
      return false;
    }
    if (maxLivingArea !== null && livingArea > maxLivingArea) {
      return false;
    }

    if (kitchenArea < minKitchen || kitchenArea > maxKitchen) {
      return false;
    }
    if (cardTotalArea < minTotal || cardTotalArea > maxTotal) {
      return false;
    }
    const activeFloors = Object.entries(floorTip)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    const filteredCards = cards.filter(card => {
      const floor = card.floor;
      const totalFloors = card.total_floors;
      if (activeFloors.length > 0) {
        if (activeFloors.includes('не первый') && floor <= 1) {
          return false;
        }
        if (activeFloors.includes('не последний') && floor >= totalFloors) {
          return false;
        }
        if (activeFloors.includes('только последний') && floor !== totalFloors) {
          return false;
        }
      }

      return true;
    });
    console.log(filteredCards);
    const dateFilterMap: Record<string, number> = {
      'button-12-0': 7,
      'button-12-1': 30,
      'button-12-2': 90,
      'button-12-3': 180,
    };

    const activeDateFilters = Object.entries(dateFilterMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, days]) => days);

    if (activeDateFilters.length > 0) {
      const cardDate = new Date(card.created_at);
      const now = new Date();

      const isWithinAnyRange = activeDateFilters.some(days => {
        const compareDate = new Date();
        compareDate.setDate(now.getDate() - days);
        return cardDate >= compareDate;
      });

      if (!isWithinAnyRange) {
        return false;
      }
    }

    const sellerTip: Record<string, string> = {
      'button-10-0': 'собственник',
      'button-10-1': 'агент',
      'button-10-2': 'застройщик',
    };
    const sellerTopActive = Object.entries(sellerTip)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      sellerTopActive.length > 0 &&
      !sellerTopActive.includes(card.seller?.toLowerCase?.() || '')
    ) {
      return false;
    }

    const renovationMap: Record<string, string> = {
      'button-3-0': 'новый',
      'button-3-1': 'старый',
    };
    const activeRenovations = Object.entries(renovationMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      activeRenovations.length > 0 &&
      !activeRenovations.includes(card.renovation?.toLowerCase?.() || '')
    ) {
      return false;
    }

    const apartmentTypeMap: Record<string, boolean> = {
      'button-13-0': false,
      'button-13-1': true,
    };
    const activeApartmentTypes = Object.entries(apartmentTypeMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (activeApartmentTypes.length > 0 && !activeApartmentTypes.includes(card.is_apartment)) {
      return false;
    }

    const balconyTypeMap: Record<string, string> = {
      'button-5-0': 'балкон',
      'button-5-1': 'терраса',
    };
    const activeBalconies = Object.entries(balconyTypeMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      activeBalconies.length > 0 &&
      !activeBalconies.includes(card.balcony?.toLowerCase?.() || '')
    ) {
      return false;
    }

    const houseTypeMap: Record<string, string> = {
      'button-4-0': 'кирпичный',
      'button-4-1': 'панельный',
      'button-4-2': 'деревянный',
      'button-4-3': 'монолитный',
      'button-4-4': 'блочный',
      'button-4-5': 'кирпично-монолитный',
    };
    const activeHouseTypes = Object.entries(houseTypeMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      activeHouseTypes.length > 0 &&
      !activeHouseTypes.includes(card.house_type?.toLowerCase?.() || '')
    ) {
      return false;
    }

    const liftsMap: Record<string, string> = {
      'button-6-0': 'есть',
      'button-6-1': 'нету',
    };
    const activeLifts = Object.entries(liftsMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (activeLifts.includes('есть') && card.lifts < 1) {
      return false;
    }
    if (activeLifts.includes('нету') && !card.freight_lifts) {
      return false;
    }

    const ceilingHeightMap: Record<string, number> = {
      'button-7-0': 2,
      'button-7-1': 2.5,
      'button-7-2': 2.7,
      'button-7-3': 3,
      'button-7-4': 3.5,
    };
    const activeCeilingHeights = Object.entries(ceilingHeightMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (activeCeilingHeights.length > 0) {
      const cardCeilingHeight = card.ceiling_height || 0;
      const isValidHeight = activeCeilingHeights.some(maxHeight => cardCeilingHeight <= maxHeight);
      if (!isValidHeight) {
        return false;
      }
    }

    const bathroomTypeMap: Record<string, string> = {
      'button-8-0': '1',
      'button-8-1': '2',
      'button-8-2': 'более 2',
    };

    const activeBathroomTypes = Object.entries(bathroomTypeMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      activeBathroomTypes.length > 0 &&
      !activeBathroomTypes.includes(card.bathroom?.toLowerCase?.() || '')
    ) {
      return false;
    }
    const ParkingPlace: Record<string, string> = {
      'button-9-0': 'наземная',
      'button-9-1': 'многоуровневая',
      'button-9-2': 'подземная',
    };
    const activeParkingPlace = Object.entries(ParkingPlace)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      activeParkingPlace.length > 0 &&
      !activeParkingPlace.includes(card.parking?.toLowerCase?.() || '')
    ) {
      return false;
    }
    const sellConditionsMap: Record<string, string> = {
      'button-11-0': 'возможна ипотека',
    };

    const activeSellConditions = Object.entries(sellConditionsMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      activeSellConditions.length > 0 &&
      !activeSellConditions.includes(card.sell_conditions?.toLowerCase?.() || '')
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-[50px]">
      {filteredCards.length > 0 ? (
        filteredCards.map(card => (
          <FavoritesCard key={card.id} adverts={card} onDelete={() => onDelete(Number(card.id))} />
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-[200px] my-[50px]">
          <div className="flex flex-col items-center text-center">
            <svg
              className="h-16 w-16 text-[#0164EB] animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path fill="none" stroke="#0164EB" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-[#0164EB] text-sm sm:text-lg font-semibold mt-2">
              Вы ещё не добавили ничего в избранное
            </span>
            <p className="text-black text-xs sm:text-sm mt-2">
              Добавьте понравившиеся объекты, чтобы видеть их здесь.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { FilteredFavCards };

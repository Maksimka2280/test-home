import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '../Card/Card';
import { RootState } from '@/store/store';
import { useFilter } from '@/components/Context/FromandToYersContext/FromandToYersContext';
import { usePublicationDate } from '@/components/Context/PublicationDateContext/PublicationDateContext';
import { useFloor } from '@/components/Context/FloorsContext/FloorsContext';
import { CardType } from '@/types/Card';
import { useKitchenAreaFilter } from '@/components/Context/ChickenContext/ChickenContext';
import { useTotalAreaFilter } from '@/components/Context/TotakContext/TotakContext';
import { useLivingArea } from '@/components/Context/LiveAreaContext/LiveAreaContext';

interface FilteredCardsProps {
  cards: CardType[];
  favoriteGroups: number[];
  comparisonGroups: number[];
  isAuthenticated: boolean;
}

const FilteredCards: FC<FilteredCardsProps> = ({
  cards,
  favoriteGroups,
  comparisonGroups,
  isAuthenticated,
}) => {
  const selectedFilters = useSelector((state: RootState) => state.filters.selectedFilters);
  const { yearFrom, yearTo } = useFilter();
  const { publicationDate } = usePublicationDate();
  const { minTotalArea, maxTotalArea } = useTotalAreaFilter();
  const { minKitchenArea, maxKitchenArea } = useKitchenAreaFilter();
  const { minLivingArea, maxLivingArea } = useLivingArea();
  const { floorFrom, floorTo } = useFloor();
  const CardProduct = memo(Card);
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

    if (selectedFilters.includes('button-0-0') && card.time_on_foot_to_subway >= 10) {
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

    const sellerTip: Record<string, string> = {
      'button-15-0': 'собственник',
      'button-15-1': 'агент',
      'button-15-2': 'застройщик',
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
      'button-4-0': 'без ремонта',
      'button-4-1': 'косметический',
      'button-4-2': 'евроремонт',
      'button-4-3': 'дизайн',
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

    const windowViewMap = {
      'button-12-0': 'во двор',
      'button-12-1': 'на улицу',
    };
    const activeWindowViews = Object.entries(windowViewMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, val]) => val);

    if (
      activeWindowViews.length > 0 &&
      !activeWindowViews.includes(card.window_view?.toLowerCase?.() || '')
    )
      return false;

    const balconyTypeMap: Record<string, string> = {
      'button-6-0': 'балкон',
      'button-6-1': 'лоджия',
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
      'button-5-0': 'кирпичный',
      'button-5-1': 'панельный',
      'button-5-2': 'деревянный',
      'button-5-3': 'монолитный',
      'button-5-4': 'блочный',
      'button-5-5': 'кирпично-монолитный',
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
      'button-7-0': 'есть любой',
      'button-7-1': 'есть грузовой',
    };
    const activeLifts = Object.entries(liftsMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (activeLifts.includes('есть любой') && card.lifts < 1) {
      return false;
    }
    if (activeLifts.includes('есть грузовой') && !card.freight_lifts) {
      return false;
    }

    const kitchenFurnitureTypeMap: Record<string, string> = {
      'button-8-0': 'Газовая',
      'button-8-1': 'Электрическая',
    };
    const activeKitchenFurnitureTypes = Object.entries(kitchenFurnitureTypeMap)
      .filter(([id]) => selectedFilters.includes(id))
      .map(([, value]) => value);

    if (
      activeKitchenFurnitureTypes.length > 0 &&
      !activeKitchenFurnitureTypes.includes(card.kitchen_furniture_type)
    ) {
      return false;
    }

    const ceilingHeightMap: Record<string, number> = {
      'button-10-0': 2,
      'button-10-1': 2.5,
      'button-10-2': 2.7,
      'button-10-3': 3,
      'button-10-4': 3.5,
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
      'button-11-0': 'совмещенный',
      'button-11-1': 'раздельный',
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
      'button-14-0': 'наземная',
      'button-14-1': 'многоуровневая',
      'button-14-2': 'подземная',
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
      'button-16-0': 'возможна ипотека',
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
    <div className="flex flex-wrap gap-[20px] max-w-[1400px] 2xl:max-w-[1870px] justify-center">
      {filteredCards.length > 0 ? (
        filteredCards.map(card => (
          <CardProduct
            key={card.id}
            {...card}
            cardId={card.id}
            isFavorite={favoriteGroups.includes(Number(card.id))}
            isCompared={comparisonGroups.includes(Number(card.id))}
            isAuthenticated={isAuthenticated}
          />
        ))
      ) : (
        <div className="flex justify-center items-center w-full h-[200px] text-center my-[50px]">
          <div className="flex flex-col items-center">
            <svg
              className="h-16 w-16 text-[#0164EB] animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path fill="none" stroke="#0164EB" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sm:ml-4 text-[#0164EB] text-sm sm:text-lg font-semibold">
              Упс, ничего не найдено!
            </span>
            <p className="text-black sm:text-sm text-xs mt-2">
              Попробуйте изменить фильтры или ищите что-то другое.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { FilteredCards };

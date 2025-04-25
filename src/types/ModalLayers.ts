export interface ModalCard {
  id: string;
  address?: string;
  price?: number;
  roomCount?: number;
  area?: number;
  floor?: number;
  totalFloors?: number;
  metroDistance?: string;
  mortgage?: boolean;
  renovation?: string;
  year?: number;
  buildingType?: string;
  balcony?: boolean;
  elevator?: boolean;
  stove?: string;
  bathroomCount?: number;
  view?: string;
  seller?: string;
  sellerRating?: number;
  [key: string]: any;
}

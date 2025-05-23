export interface CardType {
  id: string;
  title: string;
  city: string;
  street: string;
  address: string;
  description: string;
  total_area: number;
  living_area: number;
  kitchen_area: number;
  floor: number;
  ceiling_height: number;
  bathroom: string;
  balcony: string;
  renovation: string;
  layout: string;
  rooms: number;
  is_apartment: boolean;
  window_view: string;
  total_floors: number;
  build_year: number;
  construction_series: string;
  chute: string;
  lifts: number;
  freight_lifts: boolean;
  passenger_lifts: boolean;
  house_type: string;
  type_of_floors: string;
  parking: string;
  entrances: number;
  heating: string;
  accidence: string;
  gas_supply: string;
  fridge: boolean;
  washer: boolean;
  shower_cabin: boolean;
  room_furniture: boolean;
  dishwasher: boolean;
  conditioner: boolean;
  kitchen_furniture: boolean;
  kitchen_furniture_type: string;
  internet: boolean;
  tv: boolean;
  price: number;
  utility_payments: string;
  deposit: string;
  fee: string;
  prepayment: string;
  tenancy: string;
  rent_type: string;
  lat: number;
  lon: number;
  time_on_foot_to_subway: number;
  time_on_transport_to_subway: number;
  seller: string;
  sell_conditions: string;
  favorite_groups: any[];
  comments: any[];
  created_at: Date;
}

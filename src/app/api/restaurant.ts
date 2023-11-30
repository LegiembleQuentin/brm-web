export enum CountryList {
  US = "United States",
  CA = "Canada",
  FR = "France",
  DE = "Germany",
  JP = "Japan",
  IT = "Italy",
  UK = "United Kingdom",
  ES = "Spain",
  AU = "Australia",
  BR = "Brazil",
  IN = "India",
  CN = "China",
  RU = "Russia",
  ZA = "South Africa",
  MX = "Mexico",
  AR = "Argentina",
  EG = "Egypt",
  NG = "Nigeria",
  SA = "Saudi Arabia",
  KR = "South Korea",
  ID = "Indonesia",
  TR = "Turkey",
  TH = "Thailand",
  SE = "Sweden",
  CH = "Switzerland",
  NL = "Netherlands",
  BE = "Belgium",
  AT = "Austria",
  PT = "Portugal",
  GR = "Greece",
  NO = "Norway",
  FI = "Finland",
  DK = "Denmark",
  IE = "Ireland",
  NZ = "New Zealand",
  SG = "Singapore",
  MY = "Malaysia",
  PH = "Philippines",
  PL = "Poland",
  HU = "Hungary",
  CZ = "Czech Republic",
  RO = "Romania",
  BG = "Bulgaria",
  HR = "Croatia",
  SI = "Slovenia",
  SK = "Slovakia",
  LT = "Lithuania",
  LV = "Latvia",
  EE = "Estonia",
  CY = "Cyprus",
  MT = "Malta",
  IS = "Iceland",
  LU = "Luxembourg",
  LI = "Liechtenstein",
}
export interface Restaurant {
  id?: string;
  name?: string;
  adress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
  openDate?: Date;
  operatingHours?: string;
  rating?: number;
  creationDate?: Date;
  closeDate?: Date;
  enabled?: boolean;
}

export function mapApiDataToRestaurant(apiData: any): Restaurant {
  return {
    id: apiData.id,
    name: apiData.name,
    adress: apiData.adress,
    postalCode: apiData.postal_code,
    city: apiData.city,
    country: apiData.country,
    email: apiData.email,
    phone: apiData.phone,
    openDate: apiData.open_date,
    operatingHours: apiData.operating_hours,
    rating: apiData.rating ? Number(apiData.rating) : undefined,
    creationDate: apiData.creation_date ? new Date(apiData.creation_date) : undefined,
    closeDate: apiData.close_date ? new Date(apiData.close_date) : undefined,
    enabled: apiData.enabled,
  };
}

export function mapRestaurantToApiData(restaurant: Restaurant): any {
  return {
    id: restaurant.id,
    name: restaurant.name,
    adress: restaurant.adress,
    postal_code: restaurant.postalCode,
    city: restaurant.city,
    country: restaurant.country,
    email: restaurant.email,
    phone: restaurant.phone,
    operating_hours: restaurant.operatingHours,
    rating: restaurant.rating !== undefined ? restaurant.rating.toString() : null,
    creation_date: restaurant.creationDate ? restaurant.creationDate.toISOString() : null,
    close_date: restaurant.closeDate ? restaurant.closeDate.toISOString() : null,
    enabled: restaurant.enabled,
  };


}

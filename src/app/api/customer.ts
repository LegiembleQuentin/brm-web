export interface Customer {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  adress?: string;
  city?: string;
  postalCode?: number;
  country?: string;
  createdAt?: Date;
  lastCommand?: Date;
  fidelityPoints?: string;
}

export function mapApiDataToCustomer(apiData: any): Customer {
  return {
    id: apiData.id,
    firstname: apiData.firstname,
    lastname: apiData.lastname,
    email: apiData.email,
    phone: apiData.phone,
    adress: apiData.adress,
    city: apiData.city,
    postalCode: apiData.postal_code,
    country: apiData.country,
    createdAt: apiData.created_at,
    lastCommand: apiData.last_command ? new Date(apiData.last_command) : undefined,
    fidelityPoints: apiData.fidelity_points
  };
}

export function mapCustomerToApiData(customer: Customer): any {
  return {
    id: customer.id,
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    phone: customer.phone,
    adress: customer.adress,
    city: customer.city,
    postalCode: customer.postalCode,
    country: customer.country,
    createdAt: customer.createdAt,
    lastCommand: customer.lastCommand ? new Date(customer.lastCommand) : undefined,
    fidelityPoints: customer.fidelityPoints
  };
}

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

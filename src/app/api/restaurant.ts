export interface Restaurant {
  id?: string;
  name?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
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
    postalCode: apiData.postal_code,
    city: apiData.city,
    country: apiData.country,
    email: apiData.email,
    phone: apiData.phone,
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
    postal_code: restaurant.postalCode,
    city: restaurant.city,
    country: restaurant.country,
    email: restaurant.email,
    phone: restaurant.phone,
    operating_hours: restaurant.operatingHours,
    rating: restaurant.rating !== undefined ? restaurant.rating.toString() : null,
    creation_date: restaurant.creationDate ? restaurant.creationDate.toISOString().split('.')[0] + '+00:00' : null,
    close_date: restaurant.closeDate ? restaurant.closeDate.toISOString().split('.')[0] + '+00:00' : null,
    enabled: restaurant.enabled,
  };
}

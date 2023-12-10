import {mapApiDataToRestaurant, mapRestaurantToApiData, Restaurant} from "./restaurant";
import {DateService} from "../service/date/date.service";


export interface Stock {
  id?: string;
  name?: string;
  quantity?:number;
  unit?:string;
  lastRestockDate?:Date;
  stockLevelAlert?:number;
  createdAt?:Date;
  restaurant?: Restaurant;
}

export function mapStockToApiData(stock: Stock): any {
  return {
    id: stock.id,
    name: stock.name,
    quantity: stock.quantity,
    unit: stock.unit,
    last_restock_date: DateService.formatDateToApiFormat(stock.lastRestockDate),
    stock_level_alert: stock.stockLevelAlert,
    created_at: DateService.formatDateToApiFormat(stock.createdAt),
    restaurant: stock.restaurant ? mapRestaurantToApiData(stock.restaurant) : null,
  };
}

export function mapApiDataToStock(apiData: any): Stock {
  return {
    id: apiData.id,
    name: apiData.name,
    quantity: apiData.quantity,
    unit: apiData.unit,
    lastRestockDate: apiData.last_restock_date ? new Date(apiData.last_restock_date) : undefined,
    stockLevelAlert: apiData.stock_level_alert,
    createdAt: apiData.created_at ? new Date(apiData.created_at) : undefined,
    restaurant: apiData.restaurant ? mapApiDataToRestaurant(apiData.restaurant) : undefined,
  };
}

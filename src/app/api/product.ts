import {mapApiDataToStock, mapStockToApiData, Stock} from "./stock";
import {DateService} from "../service/date/date.service";

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?:number;
  createdAt?:Date;
  stock?: Stock[];
}

export function mapApiDataToProduct(apiData: any): Product {
  return {
    id: apiData.id,
    name: apiData.name,
    description: apiData.description,
    price: apiData.price,
    createdAt: apiData.created_at ? new Date(apiData.created_at) : undefined,
    stock: apiData.productStocks ? apiData.productStocks.map((productStock: any) => productStock.stock) : []
  };
}

export function mapProductToApiData(product: Product): any {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    created_at: DateService.formatDateToApiFormat(product.createdAt),
    productStocks: product.stock ? product.stock.map(stockItem => ({ stock: mapStockToApiData(stockItem) })) : []
  };
}

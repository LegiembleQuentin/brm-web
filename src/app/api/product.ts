import {mapApiDataToStock, mapStockToApiData, Stock} from "./stock";
import {DateService} from "../service/date/date.service";

export interface ProductStock {
  id: string;
  stock_quantity: number;
  unit: string;
  stock: Stock;
}

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  createdAt?: Date;
  stock?: Stock[];
  productStocks?: ProductStock[];
}

export function mapApiDataToProduct(apiData: any): Product {
  return {
    id: apiData.id,
    name: apiData.name,
    description: apiData.description,
    price: apiData.price,
    createdAt: apiData.created_at ? new Date(apiData.created_at) : undefined,
    stock: apiData.productStocks ? apiData.productStocks.map((productStock: any) => productStock.stock) : [],
    productStocks: apiData.productStocks ? apiData.productStocks.map((productStock: any) => ({
      id: productStock.id,
      stock_quantity: parseFloat(productStock.stock_quantity),
      unit: productStock.unit,
      stock: mapApiDataToStock(productStock.stock),
    })) : []
  };
}

export function mapProductToApiData(product: Product): any {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    created_at: DateService.formatDateToApiFormat(product.createdAt),
    stock: product.stock ? product.stock.map(stockItem => ({ stock: mapStockToApiData(stockItem) })) : [],
    productStocks: product.productStocks ? product.productStocks.map(ps => ({
      id: ps.id,
      stock_quantity: ps.stock_quantity,
      unit: ps.unit,
      stock: mapStockToApiData(ps.stock)
    })) : []
  };
}


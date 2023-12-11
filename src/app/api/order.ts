import {mapApiDataToProduct, Product} from "./product";
import {Customer, mapApiDataToCustomer} from "./customer";

export interface OrderProduct {
  id?: string;
  quantity?:number;
  product?: Product;
}


export interface Order {
  id?: string;
  date?: Date;
  status?: string;
  price?: number;
  orderProducts?: OrderProduct[];
  customer?: Customer;
}

export function mapApiDataToOrder(apiData: any): Order {
  return {
    id: apiData.id,
    date: apiData.date ? new Date(apiData.date) : undefined,
    price: apiData.price,
    status: apiData.status,
    customer: apiData.customer ? mapApiDataToCustomer(apiData.customer) : undefined,
    orderProducts: apiData.order_products ? apiData.order_products.map((orderProduct: any) => ({
      id: orderProduct.id,
      quantity: orderProduct.quantity,
      product: orderProduct.product ? mapApiDataToProduct(orderProduct.product) : undefined,
    })) : []
  };
}

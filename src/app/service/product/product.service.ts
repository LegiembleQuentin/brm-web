import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {mapProductToApiData, Product} from "../../api/product";
import {mapStockToApiData, Stock} from "../../api/stock";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getProducts(filters: any): Promise<any> {
    let params = new HttpParams({ fromObject: filters });
    return this.http.get<Product[]>(this.url + '/products', {params} ).toPromise();
  }

  saveProduct(product: Product) : Promise<any> {
    product = mapProductToApiData(product);
    return this.http.post(this.url + '/product', {body: product}).toPromise();
  }

  updateProduct(product:Product):Promise<any>{
    product = mapProductToApiData(product);
    return this.http.put(this.url + '/product', {body: product}).toPromise();
  }

  getProduct(id: string): Promise<Product> {
    return this.http.get<any>(this.url + '/product/' + id).toPromise()
  }

  getProductsSmall() {
    return this.http.get<any>(this.url + '/products-small').toPromise();
  }
}

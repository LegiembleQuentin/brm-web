import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {mapStockToApiData, Stock} from "../../api/stock";
import {Employee} from "../../api/employee";

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getStocks(filters: any): Promise<any> {
    let params = new HttpParams({ fromObject: filters });
    return this.http.get<Stock[]>(this.url + '/stocks', {params} ).toPromise();
  }

    saveStock(stock: Stock) : Promise<any> {
        stock = mapStockToApiData(stock);
        return this.http.post(this.url + '/stock', {body: stock}).toPromise();
    }

    updateStock(stock:Stock):Promise<any>{
        stock = mapStockToApiData(stock);
        return this.http.put(this.url + '/stock', {body: stock}).toPromise();
    }

    deleteStock(stock: Stock) :Promise<any> {
        return this.http.delete(this.url + '/stock/' + stock.id, { body: stock.id }).toPromise();
    }

    getStock(id: string): Promise<Stock> {
        return this.http.get<any>(this.url + '/stock/' + id).toPromise()
    }

  getStocksSmall() {
    return this.http.get<any>(this.url + '/stocks-small').toPromise();
  }
}

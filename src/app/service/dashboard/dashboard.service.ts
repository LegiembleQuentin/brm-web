import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }


  getProductSalesDatas() {
    return this.http.get<any>(this.url + '/dashboard/product-sales').toPromise();
  }

  getSalesDatas() {
    return this.http.get<any>(this.url + '/dashboard/sales').toPromise();
  }
}

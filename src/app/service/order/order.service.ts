import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../../api/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getOrders(filters: any): Promise<any> {
    let params = new HttpParams({ fromObject: filters });
    return this.http.get<Order[]>(this.url + '/orders', {params} ).toPromise();
  }


}

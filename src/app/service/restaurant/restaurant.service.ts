import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getRestaurants(): Promise<any> {
    return this.http.get<any>(this.url + '/restaurants').toPromise();
  }

  getRestaurantsSmall() {
    return this.http.get<any>(this.url + '/restaurants-small').toPromise();
  }

}

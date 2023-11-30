import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Restaurant } from 'src/app/api/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getRestaurants(): Promise<any> {
    return this.http.get<any>(this.url + '/restaurants').toPromise();
  }

  getRestaurant(id: string): Promise<Restaurant> {
    return this.http.get<any>(this.url + '/restaurant/' + id).toPromise()
  }

  saveRestaurant(restaurant: Restaurant): Promise<any> {
    console.log(restaurant);
    return this.http.post(this.url + '/restaurant', { body: restaurant }).toPromise();
  }
}

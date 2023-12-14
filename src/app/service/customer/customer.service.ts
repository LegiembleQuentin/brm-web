import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, mapCustomerToApiData } from 'src/app/api/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getCustomers(): Promise<any> {

    return this.http.get<Customer[]>(this.url + '/customers').toPromise();
  }
  getCustomer(id: string): Promise<Customer> {
    return this.http.get<any>(this.url + '/customer/' + id).toPromise()
  }
  getCustomersSmall() {
    return this.http.get<any>(this.url + '/customers-small').toPromise();
  }
  updateCustomer(customer: Customer): Promise<any> {
    customer = mapCustomerToApiData(customer);
    return this.http.post(this.url + '/customer', { body: customer }).toPromise();
  }
  saveCustomer(customer: Customer): Promise<any> {
    customer = mapCustomerToApiData(customer);
    return this.http.post(this.url + '/customer', { body: customer }).toPromise();
  }
}

import { Injectable } from '@angular/core';
import {Employee, mapEmployeeToApiData} from "../../api/employee";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // getEmployeesSmall() {
  //   return this.http.get<any>(this.url + '/employees')
  //     .toPromise()
  //     .then(res => res.data as Employee[])
  //     .then(data => data);
  // }

  deleteEmployee(employee: Employee) {
    return this.http.delete(this.url + '/employees/' + employee.id, { body: employee.id });
  }

  saveEmployee(employee: Employee) : Promise<any> {
    console.log(employee);
    return this.http.post(this.url + '/employee', {body: employee}).toPromise();
  }

  // searchEmployees(filter: any): Promise<any> {
  //   let params = new HttpParams({ fromObject: criteria });
  //   return this.http.get<Employee[]>(`${this.apiUrl}/search`, { params });
  // }

  getEmployees(filters: any): Promise<any> {
    let params = new HttpParams({ fromObject: filters });

    return this.http.get<Employee[]>(this.url + '/employees', { params }).toPromise();
  }

  getEmployee(id: string): Promise<Employee> {
    return this.http.get<any>(this.url + '/employee/' + id).toPromise()
  }

  // getProductsMixed() {
  //   return this.http.get<any>('assets/demo/data/products-mixed.json')
  //     .toPromise()
  //     .then(res => res.data as Product[])
  //     .then(data => data);
  // }

  // getEmployeesWithOrdersSmall() {
  //   return this.http.get<any>('assets/demo/data/products-orders-small.json')
  //     .toPromise()
  //     .then(res => res.data as Employee[])
  //     .then(data => data);
  // }
}

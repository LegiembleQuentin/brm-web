import { Injectable } from '@angular/core';
import { Employee, mapEmployeeToApiData } from "../../api/employee";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  // deleteEmployee(employee: Employee) :Promise<any> {
  //   console.log(employee);
  //   return this.http.delete(this.url + '/employee/' + employee.id, { body: employee.id }).toPromise();
  // }

  saveEmployee(employee: Employee): Promise<any> {
    employee = mapEmployeeToApiData(employee);
    return this.http.post(this.url + '/employee', { body: employee }).toPromise();
  }

  updateEmployee(employee: Employee): Promise<any> {
    employee = mapEmployeeToApiData(employee);
    return this.http.put(this.url + '/employee', { body: employee }).toPromise();
  }

  getEmployees(): Promise<any> {
    return this.http.get<Employee[]>(this.url + '/employees').toPromise();
  }

  getEmployee(id: string): Promise<Employee> {
    return this.http.get<any>(this.url + '/employee/' + id).toPromise()
  }

  getEmployeesSmall() {
    return this.http.get<any>(this.url + '/employees-small').toPromise();
  }
}

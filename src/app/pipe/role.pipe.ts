import { Pipe, PipeTransform } from '@angular/core';
import {ContractType, EmployeeRole} from "../api/employee";

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: EmployeeRole): string {
    switch (value) {
      case EmployeeRole.EMPLOYEE:
        return "Employé";
      case EmployeeRole.DIRECTOR:
        return "Directeur";
      case EmployeeRole.MANAGER:
        return "Manager";
      default:
        return value;
    }
  }

}

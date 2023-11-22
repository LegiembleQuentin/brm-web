import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmployeeService} from "../../../service/employee/employee.service";
import {Employee, mapApiDataToEmployee} from "../../../api/employee";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  employeeId: string | null | undefined;
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId)
        .then(employeeData => {
          if (employeeData) {
            this.employee = mapApiDataToEmployee(employeeData);
            console.log(this.employee);
          } else {
            // Aucun employee retourné => messageService => erreur api

          }
        })
        .catch(error => {
          // messageService => erreur api (=> redirection?)

        });
    } else {
      // Redirection ou erreur si l'ID de l'employé est manquant (404?)

    }
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmployeeService} from "../../../service/employee/employee.service";
import {Employee, mapApiDataToEmployee} from "../../../api/employee";
import {EmployeeDialogComponent} from "../employee-dialog/employee-dialog.component";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  @ViewChild(EmployeeDialogComponent) employeeDialog!: EmployeeDialogComponent;

  employeeId: string | null | undefined;
  employee!: Employee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
   this.loadEmployee();
  }

  loadEmployee() {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeeService.getEmployee(this.employeeId)
        .then(employeeData => {
          if (employeeData) {
            this.employee = mapApiDataToEmployee(employeeData);
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

  openEdit() {
    this.employeeDialog.showDialog(this.employee);
  }

}

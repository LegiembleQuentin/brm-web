import {Component, ViewChild} from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeService } from "../../../service/employee/employee.service";
import { RestaurantService } from "../../../service/restaurant/restaurant.service";
import {ContractType, EmployeeRole, EmployeeSexe, Employee, mapApiDataToEmployee} from "../../../api/employee";
import {Restaurant, mapApiDataToRestaurant} from "../../../api/restaurant";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeDialogComponent} from "../employee-dialog/employee-dialog.component";

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.scss']
})
export class EmployeeListingComponent {
  @ViewChild(EmployeeDialogComponent) employeeDialog!: EmployeeDialogComponent;

  filters: any = {
    search: null,
    restaurant: null,
    role: null,
    contractType: null,
    enabled: null,
  };

  employees: Employee[] = [];

  restaurants: Restaurant[] = [];

  employee: Employee = {};

  selectedEmployees: Employee[] = [];

  cols: any[] = [];

  employeeRole = [
    { label: 'Employé', value: EmployeeRole.EMPLOYEE },
    { label: 'Manager', value: EmployeeRole.MANAGER },
    { label: 'Directeur', value: EmployeeRole.DIRECTOR },
  ];

  contractType = [
    { label: 'Temps complet', value: ContractType.FULL_TIME},
    { label: 'Temps partiel', value: ContractType.PART_TIME},
    { label: 'Temporaire', value: ContractType.TEMPORARY},
    { label: 'Période probatoire', value: ContractType.PROBATION},
  ]

  employeeSexe = [
    { label: 'M', value: EmployeeSexe.M },
    { label: 'F', value: EmployeeSexe.F },
  ]

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private restaurantService: RestaurantService,
    private messageService: MessageService,) { }

  ngOnInit() {
    this.defineRouteParams();

    Promise.all([this.loadEmployees(), this.loadRestaurants()]).then(() => {
      this.defineRouteParams();
    });

    this.cols = [
      { field: 'Employee', header: 'Employee' },
      { field: 'id', header: 'id' },
      { field: 'name', header: 'Name' },
      { field: 'firstname', header: 'Firstname' },
      { field: 'hireDate', header: 'HireDate' },
      { field: 'contractType', header: 'ContractType' },
      { field: 'enabled', header: 'enabled' },
    ];
  }

  async loadEmployees() {
    try {
      const response = await this.employeeService.getEmployees(this.filters);
      this.employees = response.map((employeeData: any) => mapApiDataToEmployee(employeeData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des employés '
      });
    }
  }

  async loadRestaurants() {
    try {
      const response = await this.restaurantService.getRestaurants();
      this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des restaurants '
      });
    }
  }

  openNew() {
    this.employee = {};
    this.employeeDialog.showDialog({});
  }

  openEdit(employee: Employee) {
    this.employee = employee;
    this.employeeDialog.showDialog(this.employee);
  }

  // deleteEmployee(employee: Employee) {
  //   this.deleteEmployeeDialog = true;
  //   this.employee = { ...employee };
  // }

  // confirmDelete(employee: Employee) {
  //   this.deleteEmployeeDialog = false;
  //   this.employeeService.deleteEmployee(employee);
  //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'L\'Employé' + employee.id + 'a bien été supprimé', life: 3000 });
  //   this.employee = {};
  // }

  search() {
    this.transition();
  }

  transition() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.loadEmployees();
    this.defineRouteParams();
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        search: params['search'],
        contractType: params['contractType'],
        restaurant: params['restaurant'] ? +params['restaurant'] : null,
        role: params['role'],
        enabled: params['enabled'] == 'true',
      }
    });
  }

  getRolesWithNoneOption() {
    return [{ label: '--', value: null }, ...this.employeeRole];
  }

  getRestaurantsWithNoneOption() {
    return [{ name: '--', id: null}, ...this.restaurants];
  }

  getContractTypeWithNoneOption() {
    return [{ label: '--', value: null}, ...this.contractType];
  }
}

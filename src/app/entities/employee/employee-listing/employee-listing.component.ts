import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmployeeService } from "../../../service/employee/employee.service";
import { RestaurantService } from "../../../service/restaurant/restaurant.service";
import {ContractType, EmployeeRole, EmployeeSexe, Employee, mapApiDataToEmployee} from "../../../api/employee";
import {Restaurant, mapApiDataToRestaurant} from "../../../api/restaurant";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../service/validation/validation.service";

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.scss']
})
export class EmployeeListingComponent {
  employeeDialog: boolean = false;

  deleteEmployeeDialog: boolean = false;

  deleteEmployeesDialog: boolean = false;

  employees: Employee[] = [];

  restaurants: Restaurant[] = [];

  employee: Employee = {};

  selectedEmployees: Employee[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  employeeForm = new FormGroup({
    restaurant: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
    sexe: new FormControl('', Validators.required),
    birthdate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
    hireDate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
    phone: new FormControl('', [Validators.required, ValidationService.phoneValidator()]),
    address: new FormControl(''),
    postalCode: new FormControl('', [ValidationService.postalCodeValidator()]),
    socialSecurityNumber: new FormControl('', [ValidationService.socialSecurityNumberValidator()]),
    contractType: new FormControl('', Validators.required),
    contractEndDate: new FormControl('', [ValidationService.dateValidator()]),
    disability: new FormControl(''),
    disabilityDesc: new FormControl(''),
    enabled: new FormControl(''),
  })

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
    private employeeService: EmployeeService,
    private restaurantService: RestaurantService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.employeeService.getEmployees().then(response => {
      this.employees = response.map((employeeData: any) => mapApiDataToEmployee(employeeData));
    });

    this.restaurantService.getRestaurants().then(response => {
      this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
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

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  deleteSelectedEmployees() {
    this.deleteEmployeesDialog = true;
  }

  editProduct(product: Employee) {
    this.employee = { ...product };
    this.employeeDialog = true;
  }

  deleteProduct(employee: Employee) {
    this.deleteEmployeeDialog = true;
    this.employee = { ...employee };
  }

  confirmDeleteSelected() {
    this.deleteEmployeesDialog = false;
    this.employees = this.employees.filter(val => !this.selectedEmployees.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedEmployees = [];
  }

  confirmDelete(employee: Employee) {
    this.deleteEmployeeDialog = false;
    this.employeeService.deleteEmployee(employee);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'L\'Employé' + employee.id + 'a bien été supprimé', life: 3000 });
    this.employee = {};
  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }

  saveEmployee() {
    this.submitted = true;

    if (this.employeeForm.valid) {
      //@ts-ignore
      this.employee = {
        ...this.employee,
        ...this.employeeForm.value
      };

      if (this.employee.id) {
        // update


      } else {
        this.employeeService.saveEmployee(this.employee)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Employé enregistré avec succès.'
            });


          })
          .catch(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de l\'enregistrement de l\'employé: ' + error.message
            });
          });
      }
    }
  }



      // if (this.product.id) {
      //   // @ts-ignore
      //   this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
      //   this.products[this.findIndexById(this.product.id)] = this.product;
      //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      // } else {
      //   this.product.id = this.createId();
      //   this.product.code = this.createId();
      //   this.product.image = 'product-placeholder.svg';
      //   // @ts-ignore
      //   this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
      //   this.products.push(this.product);
      //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      // }
      //
      // this.products = [...this.products];
      // this.productDialog = false;
      // this.product = {};
      // }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.employees.length; i++) {
  //     if (this.employees[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }
  //
  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (let i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }

  // onGlobalFilter(table: Table, event: Event) {
  //   table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  // }
}

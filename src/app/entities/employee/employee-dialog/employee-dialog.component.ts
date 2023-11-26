import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../service/validation/validation.service";
import {ContractType, Employee, EmployeeRole, EmployeeSexe} from "../../../api/employee";
import {EmployeeService} from "../../../service/employee/employee.service";
import {MessageService} from "primeng/api";
import {mapApiDataToRestaurant, Restaurant} from "../../../api/restaurant";
import {RestaurantService} from "../../../service/restaurant/restaurant.service";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent {
  @Input() employee!: Employee;
  @Output() saveSuccess = new EventEmitter<void>();

  display: boolean = false;

  restaurants: Restaurant[] = [];

  submitted: boolean = false;

  employeeSexe = [
    { label: 'M', value: EmployeeSexe.M },
    { label: 'F', value: EmployeeSexe.F },
  ];

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
  ];

  employeeForm: any;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.loadRestaurants();
  }

  initForm() {
    if (this.employee.id){
      this.employeeForm = new FormGroup({
        restaurant: new FormControl(this.restaurants.find(r => r.id === this.employee.restaurant!.id), Validators.required),
        name: new FormControl(this.employee.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        firstname: new FormControl(this.employee.firstname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        email: new FormControl(this.employee.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        role: new FormControl(this.employee.role, Validators.required),
        sexe: new FormControl(this.employee.sexe, Validators.required),
        birthdate: new FormControl(this.employee.birthdate, [Validators.required, ValidationService.dateValidator()]),
        hireDate: new FormControl(this.employee.hireDate, [Validators.required, ValidationService.dateValidator()]),
        phone: new FormControl(this.employee.phone, [Validators.required, ValidationService.phoneValidator()]),
        address: new FormControl(this.employee.address, [
          Validators.minLength(5),
          Validators.maxLength(1000)
        ]),
        postalCode: new FormControl(this.employee.postalCode, [ValidationService.postalCodeValidator()]),
        socialSecurityNumber: new FormControl(this.employee.socialSecurityNumber, [ValidationService.socialSecurityNumberValidator()]),
        contractType: new FormControl(this.employee.contractType, Validators.required),
        contractEndDate: new FormControl(this.employee.contractEndDate, [ValidationService.dateValidator()]),
        disability: new FormControl(this.employee.disability),
        disabilityDesc: new FormControl(this.employee.disabilityDesc, [
          Validators.minLength(5),
          Validators.maxLength(1000)
        ]),
        enabled: new FormControl(this.employee.enabled),
      });


    }else {
      this.employeeForm = new FormGroup({
        restaurant: new FormControl('', Validators.required),
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        firstname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        role: new FormControl('', Validators.required),
        sexe: new FormControl('', Validators.required),
        birthdate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
        hireDate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
        phone: new FormControl('', [Validators.required, ValidationService.phoneValidator()]),
        address: new FormControl('', [
          Validators.minLength(5),
          Validators.maxLength(1000)
        ]),
        postalCode: new FormControl('', [ValidationService.postalCodeValidator()]),
        socialSecurityNumber: new FormControl('', [ValidationService.socialSecurityNumberValidator()]),
        contractType: new FormControl('', Validators.required),
        contractEndDate: new FormControl('', [ValidationService.dateValidator()]),
        disability: new FormControl(''),
        disabilityDesc: new FormControl('',[
          Validators.minLength(5),
          Validators.maxLength(5000)
        ]),
        enabled: new FormControl(''),
      });
    }
  }

  test() {
    console.log(this.employee);
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants()
      .then(response => {
        this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des restaurants'
        });
      });
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
        this.employeeService.updateEmployee(this.employee)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Employé modifié avec succès.'
            });
            this.saveSuccess.emit();
            this.hideDialog();

          })
          .catch(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la modification de l\'employé: ' + error.message
            })
          });

      } else {
        this.employeeService.saveEmployee(this.employee)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Employé enregistré avec succès.'
            });
            this.saveSuccess.emit();
            this.hideDialog();

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

  showDialog(employee: Employee) {
    this.display = true;
    this.employee = employee;
    this.initForm();
  }

  hideDialog() {
    this.display = false;
    this.employeeForm.reset();
  }

}

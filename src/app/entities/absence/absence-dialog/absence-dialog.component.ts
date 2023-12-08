import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Absence} from "../../../api/absence";
import {Employee, mapApiDataToEmployee} from "../../../api/employee";
import {EmployeeService} from "../../../service/employee/employee.service";
import {MessageService} from "primeng/api";
import {AbsenceService} from "../../../service/absence/absence.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../service/validation/validation.service";

@Component({
  selector: 'app-absence-dialog',
  templateUrl: './absence-dialog.component.html',
  styleUrls: ['./absence-dialog.component.scss']
})
export class AbsenceDialogComponent {
  @Input() absence!: Absence;
  @Output() saveSuccess = new EventEmitter<void>();

  display: boolean = false;

  submitted: boolean = false;

  absenceForm: any;

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private absenceService: AbsenceService,
    private messageService: MessageService) { }

  ngOnInit(){

  }

  async loadEmployees() {
    try {
      const response = await this.employeeService.getEmployeesSmall();
      this.employees = response.map((employeeData: any) => mapApiDataToEmployee(employeeData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des employés '
      });
    }
  }

  saveAbsence(){
    this.submitted = true;

    if (this.absenceForm.valid) {
      //@ts-ignore
      this.absence = {
        ...this.absence,
        ...this.absenceForm.value
      };

      if (this.absence.id) {
        this.absenceService.updateAbsence(this.absence)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Absence modifié avec succès.'
            });
            this.saveSuccess.emit();
            this.hideDialog();

          })
          .catch(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la modification de l\'absence: ' + error.message
            })
          });

      } else {
        this.absenceService.saveAbsence(this.absence)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Absence enregistrée avec succès.'
            });
            this.saveSuccess.emit();
            this.submitted = false;
            this.hideDialog();

          })
          .catch(error => {
            this.submitted = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de l\'enregistrement de l\'absence: ' + error.message
            });
          });
      }
    }
  }

  initForm() {
    if (this.absence.id){
      this.absenceForm = new FormGroup({
        startDate: new FormControl(this.absence.startDate, [Validators.required, ValidationService.dateValidator()]),
        endDate: new FormControl(this.absence.endDate, [Validators.required, ValidationService.dateValidator()]),
        reason: new FormControl(this.absence.reason, [
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        type: new FormControl(this.absence.type, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        approved: new FormControl(this.absence.approved),
        employee: new FormControl(this.employees.find(e => e.id === this.absence.employee?.id) ?? '', [Validators.required])
      });


    }else {
      this.absenceForm = new FormGroup({
        startDate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
        endDate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
        reason: new FormControl('', [
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        type: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        approved: new FormControl(''),
        employee: new FormControl('')
      });
    }
  }

  saveFeedback(){
    this.submitted = true;


    this.saveSuccess.emit();
    this.hideDialog();
  }

  showDialog(absence: Absence) {
    this.display = true;
    this.absence = absence;
    this.loadEmployees();
    this.initForm();
  }

  hideDialog() {
    this.display = false;
    this.absenceForm.reset();
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Feedback} from "../../../api/feedback";
import {Employee, mapApiDataToEmployee} from "../../../api/employee";
import {EmployeeService} from "../../../service/employee/employee.service";
import {MessageService} from "primeng/api";
import {FeedbackService} from "../../../service/feedback/feedback.service";

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent {
  @Input() feedback!: Feedback;
  @Output() saveSuccess = new EventEmitter<void>();

  display: boolean = false;

  submitted: boolean = false;

  feedbackForm: any;

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private feedbackService: FeedbackService,
    private messageService: MessageService) { }

  ngOnInit(){
    this.loadEmployees();
  }

  initForm() {
    if (this.feedback.id){
      this.feedbackForm = new FormGroup({
        content: new FormControl(this.feedback.content, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5000)
        ]),
        warning: new FormControl(this.feedback.warning),
        employee: new FormControl(this.employees.find(e => e.id === this.feedback.employee?.id) ?? '')
      });


    }else {
      this.feedbackForm = new FormGroup({
        content: new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5000)
        ]),
        warning: new FormControl(false),
        employee: new FormControl('')
      });
    }
  }

  //permet de rendre le employee obligatoire seulement si warning est true
  updateEmployeeValidators() {
    if (this.feedbackForm.get('warning').value) {
      this.feedbackForm.get('employee').setValidators([Validators.required]);
    } else {
      this.feedbackForm.get('employee').clearValidators();
    }
    this.feedbackForm.get('employee').updateValueAndValidity();
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

  saveFeedback(){
    this.submitted = true;

    if (this.feedbackForm.valid) {
      //@ts-ignore
      this.feedback = {
        ...this.feedback,
        ...this.feedbackForm.value
      };

      if (this.feedback.id) {
        console.log('edit');

      } else {
        this.feedbackService.saveFeedback(this.feedback)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Feedback enregistré avec succès.'
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
              detail: 'Erreur lors de l\'enregistrement du feedback: ' + error.message
            });
          });
      }
    }
  }

  showDialog(feedback: Feedback) {
    this.display = true;
    this.feedback = feedback;
    this.initForm();
    this.updateEmployeeValidators();
  }

  hideDialog() {
    this.display = false;
    this.feedbackForm.reset();
  }
}

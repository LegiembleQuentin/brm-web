import {Component, ViewChild} from '@angular/core';
import {Feedback, mapApiDataToFeedback} from "../../../api/feedback";
import {Employee, mapApiDataToEmployee} from "../../../api/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee/employee.service";
import {MessageService} from "primeng/api";
import {FeedbackService} from "../../../service/feedback/feedback.service";
import {DateService} from "../../../service/date/date.service";
import {FeedbackDialogComponent} from "../feedback-dialog/feedback-dialog.component";

@Component({
  selector: 'app-feedback-listing',
  templateUrl: './feedback-listing.component.html',
  styleUrls: ['./feedback-listing.component.scss']
})
export class FeedbackListingComponent {
  @ViewChild(FeedbackDialogComponent) feedbackDialog!: FeedbackDialogComponent;

  feedbacks: Feedback[] = [];

  feedback: Feedback = {};

  cols: any[] = [];

  employees: Employee[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private employeeService: EmployeeService,
    private messageService: MessageService,) { }

  filters: any = {
    warning: null,
    date: null,
    employee: null,
    author: null,
  };

  test(){
    console.log(this.filters.date);
  }

  ngOnInit() {
    this.defineRouteParams();

    Promise.all([this.loadEmployees(), this.loadFeedbacks()]).then(() => {
      this.defineRouteParams();
    });

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'warning', header: 'warning' },
      { field: 'content', header: 'content' },
      { field: 'createdAt', header: 'createdAt' },
      { field: 'author', header: 'author' },
      { field: 'employee', header: 'employee' },
    ];
  }

  async loadFeedbacks() {
    try {
      const response = await this.feedbackService.getFeedbacks(this.filters);
      this.feedbacks = response.map((feedbackData: any) => mapApiDataToFeedback(feedbackData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des feedbacks '
      });
    }
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

  search() {
    this.transition();
  }

  transition() {
    this.loadFeedbacks();
    this.filters.date = DateService.formatDateToDDMMYYYY(this.filters.date);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.defineRouteParams();
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      let urlDateString = params['date'] ? DateService.formatDDMMYYYYToDate(params['date']) : null;
      this.filters = {
        date: urlDateString,
        employee: params['employee'] ? +params['employee'] : null,
        author: params['author'] ? +params['author'] : null,
        warning: params['warning'] == 'true',
      }
    });
  }

  getEmployeeWithNoneOption() {
    return [{ name: '--', id: null}, ...this.employees];
  }

  openNew() {
    this.feedback = {};
    this.feedbackDialog.showDialog({});
  }

  openEdit(feedback: Feedback) {
    this.feedback = feedback;
    this.feedbackDialog.showDialog(this.feedback);
  }

}

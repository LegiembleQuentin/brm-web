import {Component, ViewChild} from '@angular/core';
import {Employee, mapApiDataToEmployee} from "../../../api/employee";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee/employee.service";
import {MessageService} from "primeng/api";
import {Absence, mapApiDataToAbsence} from "../../../api/absence";
import {mapApiDataToRestaurant, Restaurant} from "../../../api/restaurant";
import {DateService} from "../../../service/date/date.service";
import {RestaurantService} from "../../../service/restaurant/restaurant.service";
import {AbsenceService} from "../../../service/absence/absence.service";
import {AbsenceDialogComponent} from "../absence-dialog/absence-dialog.component";
import {Feedback} from "../../../api/feedback";

@Component({
  selector: 'app-absence-listing',
  templateUrl: './absence-listing.component.html',
  styleUrls: ['./absence-listing.component.scss']
})
export class AbsenceListingComponent {
  @ViewChild(AbsenceDialogComponent) absenceDialog!: AbsenceDialogComponent;

  deleteAbsenceDialog = false;
  isDeleting: boolean = false;
  isLoading: boolean = false;

  absences: Absence[] = [];
  absence: Absence = {};

  cols: any[] = [];

  employees: Employee[] = [];
  restaurants: Restaurant[] = [];

  filters: any = {
    date: null,
    employee: null,
    restaurant: null,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private absenceService: AbsenceService,
    private restaurantService: RestaurantService,
    private messageService: MessageService,) { }

  ngOnInit() {
    this.defineRouteParams();

    Promise.all([this.loadEmployees(),this.loadRestaurants(), this.loadAbsences()]).then(() => {
      this.defineRouteParams();
    });

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'approved', header: 'approved' },
      { field: 'startDate', header: 'startDate' },
      { field: 'endDate', header: 'endDate' },
      { field: 'createdAt', header: 'createdAt' },
      { field: 'employee', header: 'employee' },
    ];
  }

  async loadAbsences() {
    this.isLoading = true;
    try {
      const response = await this.absenceService.getAbsences(this.filters);
      this.absences = response.map((absenceData: any) => mapApiDataToAbsence(absenceData));
      this.isLoading = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des feedbacks '
      });
      this.isLoading = false;
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

  async loadRestaurants() {
    try {
      const response = await this.restaurantService.getRestaurantsSmall();
      this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des restaurants '
      });
    }
  }

  getEmployeeWithNoneOption() {
    return [{ name: '--', id: null}, ...this.employees];
  }

  getRestaurantsWithNoneOption() {
    return [{ name: '--', id: null}, ...this.restaurants];
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      let urlDateString = params['date'] ? DateService.formatDDMMYYYYToDate(params['date']) : null;
      this.filters = {
        date: urlDateString,
        employee: params['employee'] ? +params['employee'] : null,
        restaurant: params['restaurant'] ? +params['restaurant'] : null,
      }
    });
  }

  deleteAbsence(absence: Absence) {
    this.absence = { ...absence };
    this.deleteAbsenceDialog = true;
  }

  confirmDelete(absence: Absence) {
    this.isDeleting = true;
    this.absenceService.deleteAbsence(absence)
      .then(response => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Absence supprimé avec succès.'
        });
        this.deleteAbsenceDialog = false;
        this.isDeleting = false;
        this.absence = {};
        this.loadAbsences();
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors de la suppression du absence: ' + error.message
        })
        this.isDeleting = false;
      });
  }

  search() {
    this.transition();
  }

  transition() {
    this.loadAbsences();
    this.filters.date = DateService.formatDateToDDMMYYYY(this.filters.date);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.defineRouteParams();
  }

  openNew() {
    this.absence = {};
    this.absenceDialog.showDialog({});
  }

  openEdit(absence: Absence) {
    this.absence = absence;
    this.absenceDialog.showDialog(this.absence);
  }
}

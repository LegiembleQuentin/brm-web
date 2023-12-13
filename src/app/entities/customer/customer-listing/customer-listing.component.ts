import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Customer, mapApiDataToCustomer } from 'src/app/api/customer';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})


export class CustomerListingComponent {
  @ViewChild(CustomerDialogComponent) customerDialog!: CustomerDialogComponent;

  customers: Customer[] = [];

  customer: Customer = {};

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  filters: any = {
    search: null,
  };

  transition() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.loadCustomers();
    this.defineRouteParams();
  }

  search() {
    this.transition();
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        search: params['search'],
      }
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private messageService: MessageService,
  ) { }


  ngOnInit() {

    this.defineRouteParams();

    Promise.all([this.loadCustomers()]).then(() => {
      this.defineRouteParams();
    });

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'Name' },
      { field: 'adress', header: 'Adress' },
      { field: 'city', header: 'City' },
      { field: 'phone', header: 'Tel' },
      { field: 'email', header: 'Email' },
      { field: 'lastCommand', header: 'LastCommand' },
    ];
  }

  async loadCustomers() {
    try {
      const response = await this.customerService.getCustomers();
      this.customers = response.map((customerData: any) => mapApiDataToCustomer(customerData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des clients '
      });
    }
  }
  openNew() {
    this.customer = {};
    this.customerDialog.showDialog({});
  }

  openEdit(customer: Customer) {
    this.customer = customer;
    this.customerDialog.showDialog(this.customer);
  }

}


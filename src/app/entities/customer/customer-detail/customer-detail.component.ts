import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, mapApiDataToCustomer } from 'src/app/api/customer';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  @ViewChild(CustomerDialogComponent) customerDialog!: CustomerDialogComponent;


  customerId: string | null | undefined;
  customer!: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.customerService.getCustomer(this.customerId)
        .then(customerData => {
          if (customerData) {
            this.customer = mapApiDataToCustomer(customerData);
          } else {
            this.router.navigate(['/404']);
          }
        })
        .catch(error => {
          this.router.navigate(['/404']);
        });
    } else {
      this.router.navigate(['/404']);
    }
  }

  openEdit() {
    this.customerDialog.showDialog(this.customer);
  }

}

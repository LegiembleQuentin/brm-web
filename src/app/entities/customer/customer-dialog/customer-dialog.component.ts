import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Customer, mapApiDataToCustomer } from 'src/app/api/customer';
import { CountryList } from 'src/app/api/restaurant';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { ValidationService } from 'src/app/service/validation/validation.service';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.scss']
})
export class CustomerDialogComponent {
  @Input() customer!: Customer;
  @Output() saveSuccess = new EventEmitter<void>();

  constructor(
    private messageService: MessageService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers()
      .then(response => {
        this.customers = response.map((customersData: any) => mapApiDataToCustomer(customersData));
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des clients'
        });
      });
  }


  customers: Customer[] = [];

  submitted: boolean = false;

  display: boolean = false;

  customerForm: any;

  initForm() {
    if (this.customer.id) {
      this.customerForm = new FormGroup({
        firstname: new FormControl(this.customer.firstname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        lastname: new FormControl(this.customer.lastname, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        email: new FormControl(this.customer.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        adress: new FormControl(this.customer.adress, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000)
        ]),
        phone: new FormControl(this.customer.phone, [Validators.required, ValidationService.phoneValidator()]),
        country: new FormControl(this.customer.country, Validators.required),
        city: new FormControl(this.customer.city, Validators.required),
        postalCode: new FormControl(this.customer.postalCode, [Validators.required, ValidationService.postalCodeValidator()]),
        lastCommand: new FormControl(this.customer.lastCommand, [Validators.required, ValidationService.dateValidator()]),
        fidelityPoints: new FormControl(this.customer.fidelityPoints, Validators.required)
      })

    } else {
      this.customerForm = new FormGroup({
        firstname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        lastname: new FormControl('', [
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
        adress: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000)
        ]),
        phone: new FormControl('', [Validators.required, ValidationService.phoneValidator()]),
        country: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        postalCode: new FormControl('', [Validators.required, ValidationService.postalCodeValidator()]),
        lastCommand: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
        fidelityPoints: new FormControl('', Validators.required)
      })
    }
  }

  test() { console.log(this.customerForm) }

  saveCustomer() {
    this.submitted = true;

    if (this.customerForm.valid) {
      //@ts-ignore
      this.customer = {
        ...this.customer,
        ...this.customerForm.value
      };

      if (this.customer.id) {

        this.customerService.updateCustomer(this.customer)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Client modifié avec succès.'
            });
            this.saveSuccess.emit();
            this.hideDialog();

          })
          .catch(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la modification du client: ' + error.message
            })
          });

      } else {
        this.customerService.saveCustomer(this.customer)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Client enregistré avec succès.'
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
              detail: 'Erreur lors de l\'enregistrement du Client: ' + error.message
            });
          });
      }
    }
  }


  showDialog(customer: Customer) {
    this.display = true;
    this.customer = customer;
    this.initForm();
  }

  hideDialog() {
    this.display = false;
    this.customerForm.reset();
  }

  countriesList = [
    { label: 'United States', value: CountryList.US },
    { label: 'Canada', value: CountryList.CA },
    { label: 'France', value: CountryList.FR },
    { label: 'Germany', value: CountryList.DE },
    { label: 'Japan', value: CountryList.JP },
    { label: 'Italy', value: CountryList.IT },
    { label: 'United Kingdom', value: CountryList.UK },
    { label: 'Spain', value: CountryList.ES },
    { label: 'Australia', value: CountryList.AU },
    { label: 'Brazil', value: CountryList.BR },
    { label: 'India', value: CountryList.IN },
    { label: 'China', value: CountryList.CN },
    { label: 'Russia', value: CountryList.RU },
    { label: 'South Africa', value: CountryList.ZA },
    { label: 'Mexico', value: CountryList.MX },
    { label: 'Argentina', value: CountryList.AR },
    { label: 'Egypt', value: CountryList.EG },
    { label: 'Nigeria', value: CountryList.NG },
    { label: 'Saudi Arabia', value: CountryList.SA },
    { label: 'South Korea', value: CountryList.KR },
    { label: 'Indonesia', value: CountryList.ID },
    { label: 'Turkey', value: CountryList.TR },
    { label: 'Thailand', value: CountryList.TH },
    { label: 'Sweden', value: CountryList.SE },
    { label: 'Switzerland', value: CountryList.CH },
    { label: 'Netherlands', value: CountryList.NL },
    { label: 'Belgium', value: CountryList.BE },
    { label: 'Austria', value: CountryList.AT },
    { label: 'Portugal', value: CountryList.PT },
    { label: 'Greece', value: CountryList.GR },
    { label: 'Norway', value: CountryList.NO },
    { label: 'Finland', value: CountryList.FI },
    { label: 'Denmark', value: CountryList.DK },
    { label: 'Ireland', value: CountryList.IE },
    { label: 'New Zealand', value: CountryList.NZ },
    { label: 'Singapore', value: CountryList.SG },
    { label: 'Malaysia', value: CountryList.MY },
    { label: 'Philippines', value: CountryList.PH },
    { label: 'Poland', value: CountryList.PL },
    { label: 'Hungary', value: CountryList.HU },
    { label: 'Czech Republic', value: CountryList.CZ },
    { label: 'Romania', value: CountryList.RO },
    { label: 'Bulgaria', value: CountryList.BG },
    { label: 'Croatia', value: CountryList.HR },
    { label: 'Slovenia', value: CountryList.SI },
    { label: 'Slovakia', value: CountryList.SK },
    { label: 'Lithuania', value: CountryList.LT },
    { label: 'Latvia', value: CountryList.LV },
    { label: 'Estonia', value: CountryList.EE },
    { label: 'Cyprus', value: CountryList.CY },
    { label: 'Malta', value: CountryList.MT },
    { label: 'Iceland', value: CountryList.IS },
    { label: 'Luxembourg', value: CountryList.LU },
    { label: 'Liechtenstein', value: CountryList.LI },
  ];

}

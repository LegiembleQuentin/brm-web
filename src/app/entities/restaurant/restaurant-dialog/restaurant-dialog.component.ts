import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { ValidationService } from 'src/app/service/validation/validation.service';
import { CountryList, Restaurant, mapApiDataToRestaurant } from 'src/app/api/restaurant';

@Component({
  selector: 'app-restaurant-dialog',
  templateUrl: './restaurant-dialog.component.html',
  styleUrls: ['./restaurant-dialog.component.scss']
})

export class RestaurantDialogComponent {
  @Input() restaurant!: Restaurant;
  @Output() saveSuccess = new EventEmitter<void>();

  constructor(
    private messageService: MessageService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().then(response => {
      this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
    });
  }

  restaurantDialog: boolean = false;

  restaurants: Restaurant[] = [];

  submitted: boolean = false;

  display: boolean = false;

  restaurantForm: any;

  closeRestaurant() {
    this.restaurantDialog = false;
  }

  initForm() {
    if (this.restaurant.id) {
      this.restaurantForm = new FormGroup({
        name: new FormControl(this.restaurant.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        adress: new FormControl(this.restaurant.adress, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000)
        ]),
        postalCode: new FormControl(this.restaurant.postalCode, [Validators.required, ValidationService.postalCodeValidator()]),
        city: new FormControl(this.restaurant.city, Validators.required),
        country: new FormControl(this.restaurant.country, Validators.required),
        email: new FormControl(this.restaurant.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        phone: new FormControl(this.restaurant.phone, [Validators.required, ValidationService.phoneValidator()]),
        operatingHours: new FormControl(this.restaurant.operatingHours, Validators.required),
        rating: new FormControl(this.restaurant.rating),
        openDate: new FormControl(this.restaurant.openDate, [Validators.required, ValidationService.dateValidator()]),
        enabled: new FormControl(this.restaurant.enabled)
      })

    } else {
      this.restaurantForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        adress: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(1000)
        ]),
        postalCode: new FormControl('', [Validators.required, ValidationService.postalCodeValidator()]),
        city: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        phone: new FormControl('', [Validators.required, ValidationService.phoneValidator()]),
        operatingHours: new FormControl('', Validators.required),
        rating: new FormControl(''),
        openDate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
        enabled: new FormControl(''),
      })
    }
  }


  editRestaurant(restaurant: Restaurant) {
    this.restaurant = { ...restaurant };
    this.restaurantDialog = true;
  }

  test() { console.log(this.restaurantForm) }

  saveRestaurant() {
    this.submitted = true;

    if (this.restaurantForm.valid) {
      //@ts-ignore
      this.restaurant = {
        ...this.restaurant,
        ...this.restaurantForm.value
      };

      if (this.restaurant.id) {

        this.restaurantService.updateRestaurant(this.restaurant)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Restaurant modifié avec succès.'
            });
            this.saveSuccess.emit();
            this.hideDialog();

          })
          .catch(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la modification du restaurant: ' + error.message
            })
          });

      } else {
        this.restaurantService.saveRestaurant(this.restaurant)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Restaurant enregistré avec succès.'
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
              detail: 'Erreur lors de l\'enregistrement du Restaurant: ' + error.message
            });
          });
      }
    }
  }


  showDialog(restaurant: Restaurant) {
    this.display = true;
    this.restaurant = restaurant;
    this.initForm();
  }

  hideDialog() {
    this.display = false;
    this.restaurantForm.reset();
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

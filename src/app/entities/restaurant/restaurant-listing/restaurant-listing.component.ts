import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CountryList, Restaurant, mapApiDataToRestaurant } from 'src/app/api/restaurant';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { ValidationService } from 'src/app/service/validation/validation.service';


@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.scss']
})


export class RestaurantListingComponent {

  restaurantDialog: boolean = false;

  restaurants: Restaurant[] = [];

  restaurant: Restaurant = {};

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  filters: any = {
    search: null,
    rating: null,
  };

  transition() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.loadRestaurants();
    this.defineRouteParams();
  }

  search() {
    this.transition();
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        search: params['search'],
        rating: params['rating'],
      }
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private messageService: MessageService) { }


  ngOnInit() {

    this.loadRestaurants();

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'Name' },
      { field: 'adress', header: 'Adress' },
      { field: 'city', header: 'City' },
      { field: 'rating', header: 'Rating' },
      { field: 'enabled', header: 'enabled' },
    ];
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().then(response => {
      this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
    });
  }

  editRestaurant(restaurant: Restaurant) {
    this.restaurant = { ...restaurant };
    this.restaurantDialog = true;
  }

  closeRestaurant() {
    this.restaurantDialog = false;
  }

  restaurantForm = new FormGroup({
    name: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    postalCode: new FormControl('', [Validators.required, ValidationService.postalCodeValidator()]),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, ValidationService.phoneValidator()]),
    operatingHours: new FormControl('', Validators.required),
    rating: new FormControl(''),
    openDate: new FormControl('', [Validators.required, ValidationService.dateValidator()]),
    enabled: new FormControl(''),
  })

  saveRestaurant() {
    this.submitted = true;

    if (this.restaurantForm.valid) {
      //@ts-ignore
      this.restaurant = {
        ...this.restaurant,
        ...this.restaurantForm.value
      };

      if (this.restaurant.id) {
        // update


      } else {
        this.restaurantService.saveRestaurant(this.restaurant)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Restaurant enregistré avec succès.'
            });


          })
          .catch(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de l\'enregistrement du Restaurant: ' + error.message
            });
          });
      }
    }
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

  openNew() {
    this.restaurant = {};
    this.submitted = false;
    this.restaurantDialog = true;
  }



}

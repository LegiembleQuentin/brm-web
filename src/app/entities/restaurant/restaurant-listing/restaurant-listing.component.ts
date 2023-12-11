import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CountryList, Restaurant, mapApiDataToRestaurant } from 'src/app/api/restaurant';
import { RestaurantService } from 'src/app/service/restaurant/restaurant.service';
import { RestaurantDialogComponent } from '../restaurant-dialog/restaurant-dialog.component';


@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.scss']
})


export class RestaurantListingComponent {
  @ViewChild(RestaurantDialogComponent) restaurantDialog!: RestaurantDialogComponent;

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
  ) { }


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

  openNew() {
    this.restaurant = {};
    this.restaurantDialog.showDialog({});
  }

  openEdit(restaurant: Restaurant) {
    this.restaurant = restaurant;
    this.restaurantDialog.showDialog(this.restaurant);
  }
}

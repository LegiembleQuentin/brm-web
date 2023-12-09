import { Component } from '@angular/core';
import {mapApiDataToStock, Stock} from "../../../api/stock";
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../../service/employee/employee.service";
import {AbsenceService} from "../../../service/absence/absence.service";
import {RestaurantService} from "../../../service/restaurant/restaurant.service";
import {MessageService} from "primeng/api";
import {StockService} from "../../../service/stock/stock.service";
import {mapApiDataToRestaurant, Restaurant} from "../../../api/restaurant";
import {mapApiDataToAbsence} from "../../../api/absence";
import {DateService} from "../../../service/date/date.service";

@Component({
  selector: 'app-stock-listing',
  templateUrl: './stock-listing.component.html',
  styleUrls: ['./stock-listing.component.scss']
})
export class StockListingComponent {

  isLoading: boolean = false;

  stocks: Stock[] = [];
  stock: Stock = {};

  restaurants: Restaurant[] = [];

  cols: any[] = [];

  filters: any = {
    search: null,
    restaurant: null,
    alert: false
  }

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private stockService: StockService,
      private restaurantService: RestaurantService,
      private messageService: MessageService,) { }

  ngOnInit() {
    this.defineRouteParams();

    Promise.all([this.loadRestaurants(), this.loadStocks()]).then(() => {
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

  async loadStocks() {
    this.isLoading = true;
    try {
      const response = await this.stockService.getStocks(this.filters);
      this.stocks = response.map((stockData: any) => mapApiDataToStock(stockData));
      this.isLoading = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des stocks '
      });
      this.isLoading = false;
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

  getRestaurantsWithNoneOption() {
    return [{ name: '--', id: null}, ...this.restaurants];
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        search: params['search'],
        alert: params['alert'] == 'true',
        restaurant: params['restaurant'] ? +params['restaurant'] : null,
      }
    });
  }

  search() {
    this.transition();
  }

  transition() {
    this.loadStocks();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.defineRouteParams();
  }
}

import {Component, ViewChild} from '@angular/core';
import {mapApiDataToProduct, Product} from "../../../api/product";
import {mapApiDataToOrder, Order} from "../../../api/order";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product/product.service";
import {MessageService} from "primeng/api";
import {OrderService} from "../../../service/order/order.service";
import {Employee} from "../../../api/employee";
import {mapApiDataToRestaurant, Restaurant} from "../../../api/restaurant";
import {RestaurantService} from "../../../service/restaurant/restaurant.service";
import {DateService} from "../../../service/date/date.service";
import {OrderDetailComponent} from "../order-detail/order-detail.component";
import {Absence} from "../../../api/absence";


@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss']
})
export class OrderListingComponent {
  @ViewChild(OrderDetailComponent) orderDetail!: OrderDetailComponent;


  isLoading: boolean = false;

  orders: Order[] = [];
  order: Order = {};

  cols: any[] = [];

  employees: Employee[] = [];
  restaurants: Restaurant[] = [];
  products: Product[] = [];

  filters: any = {
    date: null,
    customer: null,
    product: null,
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private restaurantService: RestaurantService,
    private orderService: OrderService,
    private messageService: MessageService,) { }

  ngOnInit() {
    this.defineRouteParams();

    Promise.all([this.loadOrders(), this.loadRestaurants(), this.loadProducts()]).then(() => {
      this.defineRouteParams();
    });

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'date', header: 'date' },
      { field: 'price', header: 'price' },
      { field: 'status', header: 'status' },
      { field: 'customer', header: 'customer' },
    ];
  }

  async loadRestaurants() {
    try {
      const response = await this.restaurantService.getRestaurantsSmall();
      this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
      this.isLoading = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des restaurants'
      });
    }
  }


  async loadProducts() {
    try {
      const response = await this.productService.getProductsSmall();
      this.products = response.map((productData: any) => mapApiDataToProduct(productData));
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des produits'
      });
    }
  }

  async loadOrders() {
    this.isLoading = true;
    try {
      const response = await this.orderService.getOrders(this.filters);
      this.orders = response.map((orderData: any) => mapApiDataToOrder(orderData));
      console.log(this.orders);
      this.isLoading = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des commandes '
      });
      this.isLoading = false;
    }
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      let urlDateString = params['date'] ? DateService.formatDDMMYYYYToDate(params['date']) : null;
      this.filters = {
        date: urlDateString,
        product: params['product'] ? +params['product'] : null,
        customer: params['customer'] ? +params['customer'] : null,
      }
    });
  }

  getEmployeeWithNoneOption() {
    return [{ name: '--', id: null}, ...this.employees];
  }

  getProductsWithNoneOption() {
    return [{ name: '--', id: null}, ...this.products];
  }

  getRestaurantsWithNoneOption() {
    return [{ name: '--', id: null}, ...this.restaurants];
  }

  search() {
    this.transition();
  }

  transition() {
    this.loadOrders();
    this.filters.date = DateService.formatDateToDDMMYYYY(this.filters.date);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.defineRouteParams();
  }

  openDetail(order: Order) : void
  {
    this.order = order;
    this.orderDetail.showDetail(this.order);
  }
}

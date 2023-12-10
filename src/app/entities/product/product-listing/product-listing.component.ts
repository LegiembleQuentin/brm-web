import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ProductService} from "../../../service/product/product.service";
import {mapApiDataToProduct, Product} from "../../../api/product";

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {

  // deleteProductDialog: boolean = false;
  // isDeleting: boolean = false;
  isLoading: boolean = false;

  products: Product[] = [];
  product: Product = {};

  cols: any[] = [];

  filters: any = {
    search: null,
    category: null,
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService,) { }

  ngOnInit() {
    this.defineRouteParams();

    Promise.all([this.loadProducts()]).then(() => {
      this.defineRouteParams();
      console.log(this.products);
    });

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'name' },
      { field: 'description', header: 'description' },
      { field: 'price', header: 'price' },
      { field: 'createdAt', header: 'createdAt' },
    ];
  }

  async loadProducts() {
    this.isLoading = true;
    try {
      const response = await this.productService.getProducts(this.filters);
      this.products = response.map((productData: any) => mapApiDataToProduct(productData));
      this.isLoading = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des produits '
      });
      this.isLoading = false;
    }
  }

  defineRouteParams() {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        search: params['search'],
      }
    });
  }

  search() {
    this.transition();
  }

  transition() {
    this.loadProducts();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.filters,
      queryParamsHandling: '',
      replaceUrl: true
    });
    this.defineRouteParams();
  }

  // openNew() {
  //   this.product = {};
  //   this.productDialog.showDialog({});
  // }
  //
  // openEdit(product: Product) {
  //   this.product = product;
  //   this.productDialog.showDialog(this.product);
  // }
}


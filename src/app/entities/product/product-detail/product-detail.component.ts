import {Component, ViewChild} from '@angular/core';
import {ProductDialogComponent} from "../product-dialog/product-dialog.component";
import {mapApiDataToProduct, Product} from "../../../api/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../service/product/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @ViewChild(ProductDialogComponent) productDialog!: ProductDialogComponent;

  productId: string | null | undefined;
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProduct(this.productId )
        .then(productData => {
          if (productData) {
            this.product = mapApiDataToProduct(productData);
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
    this.productDialog.showDialog(this.product);
  }

}

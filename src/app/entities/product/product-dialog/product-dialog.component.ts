import {Component, EventEmitter, Input, Output} from '@angular/core';
import {mapApiDataToStock, Stock} from "../../../api/stock";
import {Product} from "../../../api/product";
import {StockService} from "../../../service/stock/stock.service";
import {MessageService} from "primeng/api";
import {ProductService} from "../../../service/product/product.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  @Input() product!: Product;
  @Output() saveSuccess = new EventEmitter<void>();

  display: boolean = false;

  submitted: boolean = false;

  productForm: any;

  stocks: Stock[] = [];

  constructor(
    private productService: ProductService,
    private stockService: StockService,
    private messageService: MessageService,
    private fb: FormBuilder,) { }

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getStocksSmall()
      .then(response => {
        this.stocks = response.map((stockData: any) => mapApiDataToStock(stockData));
      })
      .catch(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Erreur lors du chargement des restaurants'
        });
      });
  }

  initForm() {
    if (this.product.id){
      this.productForm = this.fb.group({
        name: new FormControl(this.product.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        description: new FormControl(this.product.description, [
          Validators.maxLength(2000)
        ]),
        price: new FormControl(this.product.price, [
          Validators.required,
        ]),
        productStocks: this.fb.array([])
      });
      const productStocksArray = this.product.productStocks?.map(ps => {
        return new FormGroup({
          stock: new FormControl(ps.stock || '', Validators.required),
          stock_quantity: new FormControl(ps.stock_quantity || '', Validators.required)
        });
      });

      // @ts-ignore
      this.productForm.setControl('productStocks', new FormArray(productStocksArray));

    }else {
      this.productForm = this.fb.group({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        description: new FormControl('', [
          Validators.maxLength(2000)
        ]),
        price: new FormControl('', [
          Validators.required,
        ]),
        productStocks: this.fb.array([])
      });
    }
  }

  get productStocks(): FormArray {
    return this.productForm.get('productStocks') as FormArray;
  }

  addStock(stock?: Stock): void {
    const stockGroup = this.fb.group({
      stock: [stock?.id || '', Validators.required],
      stock_quantity: [stock?.quantity || '', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]]
    });

    this.productStocks.push(stockGroup);
  }

  removeStock(index: number): void {
    this.productStocks.removeAt(index);
  }

  saveStock(){
    this.submitted = true;

    if (this.productForm.valid) {
      //@ts-ignore
      this.product = {
        ...this.product,
        ...this.productForm.value
      };

      if (this.product.id) {
        this.productService.updateProduct(this.product)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Produit modifié avec succès.'
            });
            this.saveSuccess.emit();
            this.hideDialog();

          })
          .catch(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la modification du produit: ' + error.message
            })
          });

      } else {
        this.productService.saveProduct(this.product)
          .then(response => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Produit enregistré avec succès.'
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
              detail: 'Erreur lors de l\'enregistrement du produit: ' + error.message
            });
          });
      }
    }
  }

  showDialog(product: Product) {
    this.display = true;
    this.product = product;
    this.initForm();
  }

  hideDialog() {
    this.productForm.reset();
    while (this.productStocks.length !== 0) {
      this.productStocks.removeAt(0);
    }
    this.display = false;
  }
}

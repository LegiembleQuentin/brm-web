import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Stock} from "../../../api/stock";
import {mapApiDataToRestaurant, Restaurant} from "../../../api/restaurant";
import {MessageService} from "primeng/api";
import {RestaurantService} from "../../../service/restaurant/restaurant.service";
import {StockService} from "../../../service/stock/stock.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../service/validation/validation.service";

@Component({
  selector: 'app-stock-dialog',
  templateUrl: './stock-dialog.component.html',
  styleUrls: ['./stock-dialog.component.scss']
})
export class StockDialogComponent {
  @Input() stock!: Stock;
  @Output() saveSuccess = new EventEmitter<void>();

  display: boolean = false;

  submitted: boolean = false;

  stockForm: any;

  restaurants: Restaurant[] = [];

  constructor(
      private restaurantService: RestaurantService,
      private stockService: StockService,
      private messageService: MessageService) { }

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurantsSmall()
        .then(response => {
          this.restaurants = response.map((restaurantData: any) => mapApiDataToRestaurant(restaurantData));
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
    if (this.stock.id){
      this.stockForm = new FormGroup({
        name: new FormControl(this.stock.name, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        quantity: new FormControl(this.stock.quantity, [
          Validators.required,
          Validators.maxLength(20)
        ]),
        unit: new FormControl(this.stock.unit, [
          Validators.required,
        ]),
        lastRestockDate: new FormControl(this.stock.lastRestockDate, [
          Validators.required,
          ValidationService.dateValidator()
        ]),
        stockLevelAlert: new FormControl(this.stock.stockLevelAlert),
        restaurant: new FormControl(this.restaurants.find(r => r.id === this.stock.restaurant?.id) ?? '')
      });


    }else {
      this.stockForm = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255)
        ]),
        quantity: new FormControl('', [
          Validators.required,
          Validators.maxLength(20)
        ]),
        unit: new FormControl('', [
          Validators.required,
        ]),
        lastRestockDate: new FormControl('', [
          Validators.required,
          ValidationService.dateValidator()
        ]),
        stockLevelAlert: new FormControl(''),
        restaurant: new FormControl('', Validators.required),
      });
    }
  }

  saveStock(){
    this.submitted = true;

    if (this.stockForm.valid) {
      //@ts-ignore
      this.stock = {
        ...this.stock,
        ...this.stockForm.value
      };

      if (this.stock.id) {
        this.stockService.updateStock(this.stock)
            .then(response => {
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Stock modifié avec succès.'
              });
              this.saveSuccess.emit();
              this.hideDialog();

            })
            .catch(error => {
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Erreur lors de la modification du stock: ' + error.message
              })
            });

      } else {
        this.stockService.saveStock(this.stock)
            .then(response => {
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Stock enregistré avec succès.'
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
                detail: 'Erreur lors de l\'enregistrement du stock: ' + error.message
              });
            });
      }
    }
  }

  showDialog(stock: Stock) {
    this.display = true;
    this.stock = stock;
    this.initForm();
  }

  hideDialog() {
    this.stockForm.reset();
    this.display = false;
  }
}

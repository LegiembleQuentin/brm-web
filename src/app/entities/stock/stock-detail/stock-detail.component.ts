import {Component, ViewChild} from '@angular/core';
import {StockDialogComponent} from "../stock-dialog/stock-dialog.component";
import {Employee, mapApiDataToEmployee} from "../../../api/employee";
import {mapApiDataToStock, Stock} from "../../../api/stock";
import {ActivatedRoute, Router} from "@angular/router";
import {StockService} from "../../../service/stock/stock.service";

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent {
  @ViewChild(StockDialogComponent) stockDialog!: StockDialogComponent;

  stockId: string | null | undefined;
  stock!: Stock;

  constructor(
      private route: ActivatedRoute,
      private stockService: StockService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStock();
  }

  loadStock() {
    this.stockId = this.route.snapshot.paramMap.get('id');
    if (this.stockId) {
      this.stockService.getStock(this.stockId )
          .then(stockData => {
            if (stockData) {
              this.stock = mapApiDataToStock(stockData);
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
        this.stockDialog.showDialog(this.stock);
    }
}

import {Component} from '@angular/core';
import {MessageService} from "primeng/api";
import {DashboardService} from "../../service/dashboard/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public loaded : boolean = false;

  public chartProductSales : any = null;
  public chartProductSalesData : any = null;
  public chartProductSalesOption : any = null;

  public sales : any = null;

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,) { }

  ngOnInit() {


    this.initCharts();
  }

  initCharts(){
    Promise.all([this.loadProductSales(), this.loadSales()]).then(() => {
      this.adaptChartProductSales();
      this.loaded = true;
    });
  }

  async loadProductSales() {
    try {
      this.chartProductSales = await this.dashboardService.getProductSalesDatas()
      console.log(this.chartProductSales);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des ventes des produits '
      });
    }
  }

  async loadSales() {
    try {
      this.sales = await this.dashboardService.getSalesDatas()
      console.log(this.sales);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des chiffre d\'affaires'
      });
    }
  }


  adaptChartProductSales() {
    this.chartProductSalesData = {
      labels: this.chartProductSales.map((item: { productName: any; }) => item.productName),
      datasets: [
        {
          label: "Nombre de produit vendus",
          borderColor: "red",
          data: this.chartProductSales.map((item: { salesQuantity: any; }) => item.salesQuantity),
          backgroundColor: [
            "#FF6384",
          ]
        },
        {
          label: "Prix",
          borderColor: "red",
          data: this.chartProductSales.map((item: { price: any; }) => item.price),
          backgroundColor: [
            "#36A2EB",
          ]
        }
      ]
    };

    this.chartProductSalesOption = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      },
    }
  }
}

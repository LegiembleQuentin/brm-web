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
  public chartProductSalesPieData : any = null;
  public chartProductSalesPieOption : any = null;

  public chartSalesPerMonthData : any = null;
  public chartSalesPerMonthOption : any = null;


  public absencesData : any = null;
  public chartAbsencesData : any = null;
  public chartAbsencesOption : any = null;

  public colorVariants : any = {
    brightPink: '#FF6384',
    celestialBlue: '#36A2EB',
    slateBlue: '#6465D9',
    puce: '#C57E8D',
    steelPink: '#CE2FD6',
    slateBlue2: '#7350C1'
  };

  public sales : any = null;

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,) { }

  ngOnInit() {
    Promise.all([this.loadProductSales(), this.loadSales(), this.loadAbsences()]).then(() => {
      this.initCharts();
      this.loaded = true;
    });
  }

  initCharts(){
    this.adaptChartProductSales();
    this.adaptChartProductSalesPie();
    this.adaptChartSalesPerMonth();
    this.adaptChartAbsences();
  }

  async loadProductSales() {
    try {
      this.chartProductSales = await this.dashboardService.getProductSalesDatas()
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
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des chiffre d\'affaires'
      });
    }
  }

  async loadAbsences() {
    try {
      this.absencesData = await this.dashboardService.getAbsencesData();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Erreur lors du chargement des absences'
      });
    }
  }

  adaptChartAbsences() {
    this.chartAbsencesData = {
      labels: this.absencesData.map((item: { restaurant: string; }) => item.restaurant),
      datasets: [
        {
          type: 'bar',
          label: 'Justifiées',
          backgroundColor: '#36A2EB',
          data: this.absencesData.map((item: { dailyApprovedAbsences: number; }) => item.dailyApprovedAbsences)
        },
        {
          type: 'bar',
          label: 'Injustifiées',
          backgroundColor: '#FF6384',
          data: this.absencesData.map((item: { dailyUnapprovedAbsences: number; }) => item.dailyUnapprovedAbsences)
        },
      ]
    }
  }

  adaptChartSalesPerMonth() {
    this.chartSalesPerMonthData = {
      labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      datasets: [
        {
          label: 'Chiffre d\'affaire',
          data: this.extractSalesData(this.sales),
          fill: false,
          borderColor: "#36A2EB",
          tension: 0.4
        },
      ]
    }

    this.chartSalesPerMonthOption = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: "white"
          }
        }
      },
    }
  }

  adaptChartProductSalesPie() {
    //generer les couleurs en fonction du nombre d'item
    const backgroundColors = this.chartProductSales.map((item: any, index: any) => {
      const colorKeys = Object.keys(this.colorVariants);
      const color = this.colorVariants[colorKeys[index % colorKeys.length]];
      return this.lightenColor(color);
    });

    this.chartProductSalesPieData = {
      labels: this.chartProductSales.map((item: { productName: any; }) => item.productName),
      datasets: [
        {
          data: this.chartProductSales.map((item: { price: any; }) => item.price),
          backgroundColor: backgroundColors,
        }
      ],
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

  lightenColor(hexColor: string) {
    let color = hexColor.substring(1);
    let rgb = parseInt(color, 16);
    let r = (rgb >> 16) + 32;
    let g = (rgb >> 8 & 0x00FF) + 32;
    let b = (rgb & 0x0000FF) + 32;

    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
  }

  extractSalesData(salesData: any) {
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    return months.map(month => parseFloat(salesData.salesPerMonth[month]));
  }


}

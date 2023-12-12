import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public chartProductSells : any = null;
  public chartProductSellsData : any = null;
  public chartProductSellsOption : any = null;

  ngOnInit() {
    this.chartProductSellsData = {
      labels: ['Steakhouse', 'Frittes', 'Glaces', 'Whopper', 'Jsp', 'Ta grand mere', 'Test', 'Big king', 'Fries'],
      datasets: [
        {
          label: "produits",
          borderColor: "red",
          data: [100, 500, 90, 50, 600, 150, 930, 15, 24],
          backgroundColor: [
            "#FF6384",
          ]
        }
      ]
    };

    this.chartProductSellsOption = {
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

  // public adaptChart(livret: any) {
  //   let expense = livret.initialBalance - this.getBalance(livret);
  //   this.chart1Data = {
  //     labels: ['Dépenses', 'Restant'],
  //     datasets: [
  //       {
  //         data: [expense, this.getBalance(livret)],
  //         backgroundColor: [
  //           "#FF6384",
  //           "#36A2EB"
  //         ]
  //       }
  //     ]
  //   };
  // }
}

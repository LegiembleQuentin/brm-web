import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CustomSharedModule} from "../shared.module";
import {ChartModule} from "primeng/chart";



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    CustomSharedModule,
    ChartModule
  ]
})
export class DashboardModule { }

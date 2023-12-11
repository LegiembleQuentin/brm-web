import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { AppLayoutModule } from "./layout/app.layout.module";
import { EmployeeService } from "./service/employee/employee.service";
import { EmployeeModule } from "./entities/employee/employee.module";
import {FeedbackModule} from "./entities/feedback/feedback.module";
import {RestaurantModule} from "./entities/restaurant/restaurant.module";
import {CustomSharedModule} from "./shared.module";
import {AbsenceModule} from "./entities/absence/absence.module";
import {StockModule} from "./entities/stock/stock.module";
import {NotFoundModule} from "./not-found/not-found.module";
import {ProductModule} from "./entities/product/product.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    EmployeeModule,
    FeedbackModule,
    RestaurantModule,
    AbsenceModule,
    StockModule,
    ProductModule,
    NotFoundModule,
    CustomSharedModule
  ],
  providers: [
    EmployeeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

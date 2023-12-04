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
    CustomSharedModule
  ],
  providers: [
    EmployeeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

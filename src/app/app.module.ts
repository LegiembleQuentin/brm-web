import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from "./layout/app.layout.module";
import { EmployeeService } from "./service/employee/employee.service";
import { EmployeeModule } from "./entities/employee/employee.module";
import { FeedbackModule } from "./entities/feedback/feedback.module";
import { RestaurantModule } from "./entities/restaurant/restaurant.module";
import { CustomSharedModule } from "./shared.module";
import { AbsenceModule } from "./entities/absence/absence.module";
import { StockModule } from "./entities/stock/stock.module";
import { NotFoundModule } from "./not-found/not-found.module";
import { ProductModule } from "./entities/product/product.module";
import { RestaurantService } from './service/restaurant/restaurant.service';
import {OrderModule} from "./entities/order/order.module";
import {VerifyTokenComponent} from "./verify-token/verify-token.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptorService} from "./service/auth-interceptor/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    VerifyTokenComponent,
    LoginComponent
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
    OrderModule,
    NotFoundModule,
    CustomSharedModule
  ],
  providers: [
    EmployeeService,
    RestaurantService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

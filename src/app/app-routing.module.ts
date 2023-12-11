import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { EmployeeListingComponent } from "./entities/employee/employee-listing/employee-listing.component";
import { EmployeeDetailComponent } from "./entities/employee/employee-detail/employee-detail.component";
import { FeedbackListingComponent } from "./entities/feedback/feedback-listing/feedback-listing.component";
import { AbsenceListingComponent } from "./entities/absence/absence-listing/absence-listing.component";
import { StockListingComponent } from "./entities/stock/stock-listing/stock-listing.component";
import { StockDetailComponent } from "./entities/stock/stock-detail/stock-detail.component";
import { NotFoundComponent } from "./not-found/not-found/not-found.component";
import { ProductListingComponent } from "./entities/product/product-listing/product-listing.component";
import { ProductDetailComponent } from "./entities/product/product-detail/product-detail.component";
import { RestaurantListingComponent } from './entities/restaurant/restaurant-listing/restaurant-listing.component';
import { RestaurantDetailComponent } from './entities/restaurant/restaurant-detail/restaurant-detail.component';
import {OrderListingComponent} from "./entities/order/order-listing/order-listing.component";
import {VerifyTokenComponent} from "./verify-token/verify-token.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: 'employee',
        children: [
          { path: '', component: EmployeeListingComponent },
          { path: ':id', component: EmployeeDetailComponent }
        ]
      },
      {
        path: 'feedback',
        children: [
          { path: '', component: FeedbackListingComponent },
        ]
      },
      {
        path: 'restaurant',
        children: [
          { path: '', component: RestaurantListingComponent },
          { path: ':id', component: RestaurantDetailComponent }
        ]
      },
      {
        path: 'absence',
        children: [
          { path: '', component: AbsenceListingComponent },
        ]
      },
      {
        path: 'stock',
        children: [
          { path: '', component: StockListingComponent },
          { path: ':id', component: StockDetailComponent }
        ]
      },
      {
        path: 'product',
        children: [
          { path: '', component: ProductListingComponent },
          { path: ':id', component: ProductDetailComponent },
        ]
      },
      {
        path: 'order',
        children: [
          { path: '', component: OrderListingComponent },
          // { path: ':id', component: ProductDetailComponent },
        ]
      },
      { path: 'verify-token', component: VerifyTokenComponent },
      { path: 'login', component: LoginComponent },




      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

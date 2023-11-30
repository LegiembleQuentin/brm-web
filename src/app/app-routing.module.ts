import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { EmployeeListingComponent } from "./entities/employee/employee-listing/employee-listing.component";
import { EmployeeDetailComponent } from "./entities/employee/employee-detail/employee-detail.component";
import { RestaurantListingComponent } from './entities/restaurant/restaurant-listing/restaurant-listing.component';
import { RestaurantDetailComponent } from './entities/restaurant/restaurant-detail/restaurant-detail.component';

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
        path: 'restaurant',
        children: [
          { path: '', component: RestaurantListingComponent },
          { path: ':id', component: RestaurantDetailComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

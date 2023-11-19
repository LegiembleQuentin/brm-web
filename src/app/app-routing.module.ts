import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {EmployeeListingComponent} from "./entities/employee/employee-listing/employee-listing.component";
import {EmployeeDetailComponent} from "./entities/employee/employee-detail/employee-detail.component";

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

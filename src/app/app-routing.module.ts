import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {EmployeeListingComponent} from "./entities/employee/employee-listing/employee-listing.component";
import {EmployeeDetailComponent} from "./entities/employee/employee-detail/employee-detail.component";
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

      { path: 'verify-token', component: VerifyTokenComponent },
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

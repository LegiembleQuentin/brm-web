import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {EmployeeListingComponent} from "./entities/employee/employee-listing/employee-listing.component";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {//pour l'instant page d'accueil
        path: '', component: EmployeeListingComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { AppLayoutModule } from "./layout/app.layout.module";
import { EmployeeService } from "./service/employee/employee.service";
import { TableModule } from "primeng/table";
import { EmployeeModule } from "./entities/employee/employee.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    TableModule,
    EmployeeModule,
  ],
  providers: [
    EmployeeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

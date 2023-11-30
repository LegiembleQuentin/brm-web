import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from "./layout/app.layout.module";
import { EmployeeService } from "./service/employee/employee.service";
import { TableModule } from "primeng/table";
import { EmployeeModule } from "./entities/employee/employee.module";
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RouterLink } from '@angular/router';
import { RestaurantService } from './service/restaurant/restaurant.service';
import { RestaurantListingComponent } from './entities/restaurant/restaurant-listing/restaurant-listing.component';
import { RestaurantDetailComponent } from './entities/restaurant/restaurant-detail/restaurant-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    RestaurantListingComponent,
    RestaurantDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppLayoutModule,
    TableModule,
    EmployeeModule,
    CommonModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
    InputSwitchModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  providers: [
    EmployeeService,
    RestaurantService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

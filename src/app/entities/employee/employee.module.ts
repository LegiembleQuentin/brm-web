import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { EmployeeListingComponent } from "./employee-listing/employee-listing.component";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import {CheckboxModule} from "primeng/checkbox";
import {InputSwitchModule} from "primeng/inputswitch";
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import {RouterLink} from "@angular/router";
import {ToggleButtonModule} from "primeng/togglebutton";
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import {CustomSharedModule} from "../../shared.module";


@NgModule({
  declarations: [
    EmployeeListingComponent,
    EmployeeDetailComponent,
    EmployeeDialogComponent
  ],
  imports: [
    CustomSharedModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    CheckboxModule,
    InputSwitchModule,
    ReactiveFormsModule,
    RouterLink,
    ToggleButtonModule,
  ],
  providers: [MessageService]
})
export class EmployeeModule { }

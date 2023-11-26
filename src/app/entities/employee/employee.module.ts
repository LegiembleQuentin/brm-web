import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeListingComponent } from "./employee-listing/employee-listing.component";
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
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
import { MessageService } from 'primeng/api';
import { ContractTypeDisplayPipe } from "../../pipe/contract-type-display.pipe";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {InputSwitchModule} from "primeng/inputswitch";
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import {RouterLink} from "@angular/router";
import {ToggleButtonModule} from "primeng/togglebutton";
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import {AgePipe} from "../../pipe/age.pipe";
import {RolePipe} from "../../pipe/role.pipe";


@NgModule({
  declarations: [
    EmployeeListingComponent,
    ContractTypeDisplayPipe,
    AgePipe,
    RolePipe,
    EmployeeDetailComponent,
    EmployeeDialogComponent
  ],
    imports: [
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
        ToggleButtonModule,
    ],
  providers: [MessageService]
})
export class EmployeeModule { }

import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ContractTypeDisplayPipe} from "./pipe/contract-type-display.pipe";
import {AgePipe} from "./pipe/age.pipe";
import {RolePipe} from "./pipe/role.pipe";
import {TruncatePipe} from "./pipe/truncate.pipe";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {ToggleButtonModule} from "primeng/togglebutton";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  declarations: [
    ContractTypeDisplayPipe,
    AgePipe,
    RolePipe,
    TruncatePipe],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    RippleModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    ToggleButtonModule,
    CalendarModule,
  ],
  exports: [
    ContractTypeDisplayPipe,
    DatePipe,
    AgePipe,
    DatePipe,
    RolePipe,
    TruncatePipe, CommonModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    RippleModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    ToggleButtonModule,
    CalendarModule,
  ]
})
export class CustomSharedModule { }

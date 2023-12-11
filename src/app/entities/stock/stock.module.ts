import { NgModule } from '@angular/core';
import { StockListingComponent } from './stock-listing/stock-listing.component';
import {CustomSharedModule} from "../../shared.module";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {ToggleButtonModule} from "primeng/togglebutton";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RouterLink} from "@angular/router";
import { StockDialogComponent } from './stock-dialog/stock-dialog.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';



@NgModule({
  declarations: [
    StockListingComponent,
    StockDialogComponent,
    StockDetailComponent
  ],
  imports: [
    CustomSharedModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    RippleModule,
    TableModule,
    ToolbarModule,
    DropdownModule,
    ToggleButtonModule,
    CalendarModule,
    ReactiveFormsModule,
    DialogModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    RouterLink,
  ]
})
export class StockModule { }

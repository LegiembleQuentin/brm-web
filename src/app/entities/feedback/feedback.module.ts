import { NgModule } from '@angular/core';
import { FeedbackListingComponent } from './feedback-listing/feedback-listing.component';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {DropdownModule} from "primeng/dropdown";
import {ToggleButtonModule} from "primeng/togglebutton";
import {CalendarModule} from "primeng/calendar";
import {CustomSharedModule} from "../../shared.module";



@NgModule({
  declarations: [
    FeedbackListingComponent,
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
  ]
})
export class FeedbackModule { }

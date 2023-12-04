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
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import {DialogModule} from "primeng/dialog";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    FeedbackListingComponent,
    FeedbackDialogComponent,
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
export class FeedbackModule { }

import { NgModule } from '@angular/core';
import { AbsenceListingComponent } from './absence-listing/absence-listing.component';
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {CustomSharedModule} from "../../shared.module";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputSwitchModule} from "primeng/inputswitch";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RouterLink} from "@angular/router";
import { AbsenceDialogComponent } from './absence-dialog/absence-dialog.component';

@NgModule({
  declarations: [
    AbsenceListingComponent,
    AbsenceDialogComponent
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
export class AbsenceModule { }

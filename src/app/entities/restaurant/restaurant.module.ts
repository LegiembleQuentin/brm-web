import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { InputSwitchModule } from "primeng/inputswitch";
import { RouterLink } from "@angular/router";
import { ToggleButtonModule } from "primeng/togglebutton";
import {CustomSharedModule} from "../../shared.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CustomSharedModule,
    InputNumberModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    CheckboxModule,
    InputSwitchModule,
    ReactiveFormsModule,
    RouterLink,
    ToggleButtonModule,
    RadioButtonModule,
  ],
  providers: [MessageService]
})
export class RestaurantModule { }

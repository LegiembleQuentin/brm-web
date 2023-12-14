import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { CustomSharedModule } from 'src/app/shared.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';



@NgModule({
  declarations: [
    CustomerListingComponent,
    CustomerDialogComponent,
    CustomerDetailComponent
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
export class CustomerModule { }

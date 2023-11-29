import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackListingComponent } from './feedback-listing/feedback-listing.component';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";



@NgModule({
  declarations: [
    FeedbackListingComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    RippleModule,
    TableModule,
    ToolbarModule
  ]
})
export class FeedbackModule { }

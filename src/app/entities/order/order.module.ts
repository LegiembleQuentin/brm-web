import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListingComponent } from './order-listing/order-listing.component';
import {ButtonModule} from "primeng/button";
import {CustomSharedModule} from "../../shared.module";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {DialogModule} from "primeng/dialog";



@NgModule({
  declarations: [
    OrderListingComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CustomSharedModule,
    PaginatorModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule
  ]
})
export class OrderModule { }

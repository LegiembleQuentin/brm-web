import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from './product-listing/product-listing.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ToolbarModule} from "primeng/toolbar";
import {CustomSharedModule} from "../../shared.module";



@NgModule({
  declarations: [
    ProductListingComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    PaginatorModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    CustomSharedModule
  ]
})
export class ProductModule { }

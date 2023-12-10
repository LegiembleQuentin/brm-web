import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import {RouterModule} from "@angular/router";
import {CustomSharedModule} from "../shared.module";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    NotFoundComponent
  ],
    imports: [
        CommonModule,
        CustomSharedModule,
        RouterModule,
    ]
})
export class NotFoundModule { }

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {AuthService} from "../service/auth/auth.service";
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})

export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private auth : AuthService, public router : Router) { }

    isLog() {
     return  this.auth.isLog();
    }
    logoutClick() {
      sessionStorage.removeItem('JWT');
      this.router.navigate(['/login']);
    }


  ngOnInit(){

  }
}

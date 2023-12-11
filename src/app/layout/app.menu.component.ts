import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {ActivatedRoute, IsActiveMatchOptions, Router} from "@angular/router";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    openedMenuIndex: number | null = null;

    toggleMenu(index: number): void {
      this.openedMenuIndex = this.openedMenuIndex === index ? null : index;
    }

  constructor(public layoutService: LayoutService, private router: Router, private activatedRoute: ActivatedRoute) { }

  isMenuItemActive(menu: { items: any[]; }): boolean {
    const exactMatchOptions: IsActiveMatchOptions = {
      paths: 'exact',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored'
    };
    return menu.items.some(item => this.router.isActive(item.routerLink[0], exactMatchOptions));
  }

    ngOnInit() {
        this.model = [
          {
            label: 'Gestion client',
            items: [
              { label: 'Clients', icon: 'pi pi-fw pi-users', routerLink: ['/sdfgsdfg'] },
              { label: 'Retours', icon: 'pi pi-fw pi-users', routerLink: ['/dsgsdfgsdg'] },
            ]
          },
          {
            label: 'Management',
            items: [
                { label: 'Employés', icon: 'pi pi-fw pi-users', routerLink: ['employee'] },
                { label: 'Absences', icon: 'pi pi-fw pi-users', routerLink: ['/absence'] },
                { label: 'Planning', icon: 'pi pi-fw pi-users', routerLink: ['/fdsfsdfdf'] },
                { label: 'Feedback', icon: 'pi pi-fw pi-users', routerLink: ['/feedback'] },
            ]
          },
          {
            label: 'Gestion des stocks',
            items: [
              { label: 'Stock', icon: 'pi pi-fw pi-users', routerLink: ['/stock'] },
              { label: 'Commandes en cours', icon: 'pi pi-fw pi-users', routerLink: ['/sqfdsfq'] },
              { label: 'Historique des commandes', icon: 'pi pi-fw pi-users', routerLink: ['/sdfsdqf'] },
              { label: 'Produits', icon: 'pi pi-fw pi-users', routerLink: ['/product'] },
              { label: 'Pertes', icon: 'pi pi-fw pi-users', routerLink: ['/sqdfsdff'] },
            ]
          },
          {
            label: 'Marketing',
            items: [
              { label: 'Publicités', icon: 'pi pi-fw pi-users', routerLink: ['/sdfsffdf'] },
              { label: 'Campagnes publicitaires', icon: 'pi pi-fw pi-users', routerLink: ['/sqdfsf'] },
              { label: 'Promotions', icon: 'pi pi-fw pi-users', routerLink: ['/sqdffsdqf'] },
              { label: 'Tendances', icon: 'pi pi-fw pi-users', routerLink: ['/qsfsdfqf'] },
              { label: 'Promotions', icon: 'pi pi-fw pi-users', routerLink: ['/sqffdsqfsd'] },
            ]
          },
          {
            label: 'Restaurants',
            items: [
              { label: 'Restaurants', icon: 'pi pi-fw pi-users', routerLink: ['/sfsdffdq'] },
            ]
          },
          {
            label: 'Gestion des chiffres',
            items: [
              { label: 'Ventes', icon: 'pi pi-fw pi-users', routerLink: ['/sqdsdfsqdff'] },
            ]
          },
        ];
        for (let i = 0; i < this.model.length; i++) {
          if (this.isMenuItemActive(this.model[i])) {
            this.openedMenuIndex = i;
            break;
          }
        }
    }
}

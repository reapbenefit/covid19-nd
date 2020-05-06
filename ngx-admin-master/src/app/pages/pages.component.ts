import { Component } from '@angular/core';
import {UserRoleService} from '../user-role.service'
import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu:any;
  constructor(private userroleservice:UserRoleService)
  {

  }
  ngOnInit()
  {
    var UserRole=this.userroleservice.getUserRole();
    if(UserRole=="admin")
    {
      this.menu=[
        {
          title: 'Home',
          icon: 'shopping-cart-outline',
          link: '/pages/dashboard',
          home: true,
        },
        {
          title: 'Volunteer',
          icon: 'home-outline',
          link: '/pages/VolunteerForm',
        },
      
        {
          title: 'NGO',
          icon: 'home-outline',
          link: '/pages/NGOTable',
        }
       
      ];
    }
    else if(UserRole=="supadmin")
    {
      this.menu=[
        {
          title: 'Home',
          icon: 'shopping-cart-outline',
          link: '/pages/dashboard',
          home: true,
        },
        {
          title: 'Volunteer',
          icon: 'home-outline',
          link: '/pages/VolunteerForm',
        },
      
        {
          title: 'NGO',
          icon: 'home-outline',
          link: '/pages/NGOTable',
        }
       
      ];
    }
    if(UserRole=="user")
    {
      this.menu=[
        {
          title: 'Home',
          icon: 'shopping-cart-outline',
          link: '/pages/dashboard',
          home: true,
        },
        {
          title: 'Volunteer',
          icon: 'home-outline',
          link: '/pages/VolunteerForm',
        },
      ];
    }
  }
}

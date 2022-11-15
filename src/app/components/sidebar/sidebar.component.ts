import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user', title: 'My Profile ',  icon:'person', class: '' },
    { path: '/my-requests', title: 'My Requests',  icon:'inbox', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/assets', title: 'Assets',  icon:'content_paste', class: '', },
    { path: '/asset-types', title: 'Asset Types',  icon:'content_paste', class: '', },
    { path: '/suppliers', title: 'Suppliers',  icon:'people', class: '' },
    { path: '/helpdesk-requests', title: 'HelpDesk Requests',  icon:'inbox', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      return $(window).width() <= 991;

  };
}

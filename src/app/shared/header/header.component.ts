import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { ROUTER_UTILS } from '../../core/utils/router.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showBackButton = false;

  constructor(private router: Router, private location: Location) {}

  ngOnInit() {
    this.showBackButton = this.router.url !== '/';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showBackButton = this.router.url !== '/';
      }
    });
  }

  goToDashboard() {
    this.router.navigate([ROUTER_UTILS.base.root, ROUTER_UTILS.dashboard.root]);
  }

  goToSettings() {
    this.router.navigate([ROUTER_UTILS.base.root, ROUTER_UTILS.settings.root]);
  }

  goBack() {
    this.location.back();
  }
}

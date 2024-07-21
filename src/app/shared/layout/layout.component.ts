import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ROUTER_UTILS } from '../../core/utils/router.utils';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showWelcomeMessage = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showWelcomeMessage = this.router.url === '/';
      }
    });

    this.showWelcomeMessage = this.router.url === '/';
  }

  goToDashboard() {
    this.router.navigate([ROUTER_UTILS.base.root, ROUTER_UTILS.dashboard.root]);
  }
}

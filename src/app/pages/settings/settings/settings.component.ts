import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../core/utils/router.utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  constructor(private router: Router) {}

  goToDashboard() {
    this.router.navigate([ROUTER_UTILS.base.root, ROUTER_UTILS.dashboard.root]);
  }
}

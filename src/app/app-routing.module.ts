import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from './core/utils/router.utils';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: ROUTER_UTILS.base.root,
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ROUTER_UTILS.dashboard.root,
        loadChildren: async () =>
          await (
            await import('./pages/dashboard/dashboard.module')
          ).DashboardModule,
        canActivate: [],
      },
      {
        path: ROUTER_UTILS.settings.root,
        loadChildren: async () =>
          await (
            await import('./pages/settings/settings.module')
          ).SettingsModule,
        canActivate: [],
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [HomeComponent, DetailsComponent],
  imports: [CommonModule, DashboardRoutingModule],
  providers: [DashboardService],
})
export class DashboardModule {}

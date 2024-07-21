import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, fromEvent } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { HomeData } from '../models/home.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  photos$: HomeData[] = [];
  isLoading = false;
  private page = 1;
  private readonly pageSize = 20;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadPhotos();
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }
  }

  private loadPhotos(): void {
    this.isLoading = true;
    this.dashboardService.getPhotos(this.page, this.pageSize).subscribe({
      next: (data) => {
        this.photos$ = [...this.photos$, ...data];
        this.page++;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('error', err);
        this.isLoading = false;
      },
    });
  }

  private setupScrollListener(): void {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight &&
          !this.isLoading
        ) {
          this.loadPhotos();
        }
      });
  }

  trackById(index: number, item: HomeData): number {
    return item.id;
  }

  goToDetails(item: HomeData) {
    this.router.navigate(['details', item.id]);
  }
}

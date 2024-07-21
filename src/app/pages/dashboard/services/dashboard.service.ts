import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { apiUrls } from '../../../core/config/config';
import { HomeData } from '../models/home.model';

@Injectable()
export class DashboardService {
  private apiUrl = `${apiUrls.dashbpardUrl}photos`;

  constructor(private http: HttpClient) {}

  getPhotos(page: number, pageSize: number): Observable<HomeData[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', pageSize.toString());

    return this.http.get<HomeData[]>(this.apiUrl, { params }).pipe(
      map((res) => res),
      catchError((err) => throwError(() => err))
    );
  }

  getPhoto(id: string): Observable<HomeData> {
    return this.http.get<HomeData>(`${this.apiUrl}/${id}`);
  }
}

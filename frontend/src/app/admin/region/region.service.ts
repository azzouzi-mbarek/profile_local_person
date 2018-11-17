import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Region } from './region.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  url = environment.baseUrl;
  private baseUrl = this.url + '/regions/';

  constructor(private _http: HttpClient) { }

  getRegions(): Observable<Region[]> {
    return this._http
      .get<Region[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }
  deleteRegion(id: Number): Observable<Region> {
    return this._http
      .delete<Region>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  getRegion(id: Number): Observable<Region> {
    return this._http
      .get<Region>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  save(region: FormData): Observable<Region> {
    return this._http
      .post<Region>(this.baseUrl, region)
      .pipe(catchError(this.errorHandler));
  }
  update(region: Region) {
    return this._http
      .put<Region>(this.baseUrl + region.id, region)
      .pipe(catchError(this.errorHandler));
  }
}

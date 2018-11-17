import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Country } from '../../models/country.model';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  url = environment.baseUrl;
  private baseUrl = this.url + '/countries/';

  constructor(private _http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this._http
      .get<Country[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }
  deleteCountry(id: Number): Observable<Country> {
    return this._http
      .delete<Country>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  getCountry(id: Number): Observable<Country> {
    return this._http
      .get<Country>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  // save(country: Country): Observable<Country> {
  //   return this._http.post<Country>(this.baseUrl, country)
  //     .pipe(catchError(this.errorHandler));

  // }

  save(country: any): Observable<Country> {
    return this._http
      .post<Country>(this.baseUrl, country)
      .pipe(catchError(this.errorHandler));
  }
  update(country: Country) {
    return this._http
      .put<Country>(this.baseUrl + country.id, country)
      .pipe(catchError(this.errorHandler));
  }
}

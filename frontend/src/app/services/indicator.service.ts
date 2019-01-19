import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  url = environment.baseUrl;
  levels = [];
  constructor(private _http: HttpClient) { }



  getData(indicatorTerm): Observable<any[]> {
    const baseUrl = this.url + '/indicator/' + indicatorTerm;
    return this._http.get<any[]>(baseUrl)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

import { environment } from '../../environments/environment';
import { Level } from '../models/level.model';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  url = environment.baseUrl;

  // private baseUrl = this.url + "/" + this.country_id + "/levels/";

  constructor(private _http: HttpClient) { }

  save(level: FormData): Observable<Level> {
    const url = this.url + '/countries/' + level.get('country_id') + '/levels';

    return this._http
      .post<Level>(url, level)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  getLevels(country_id, level_id = null): Observable<Level[]> {
    let url = null;
    if (level_id !== null) {

      url = this.url + '/countries/' + country_id + '/levels?id=' + level_id;

    } else {

      url = this.url + '/countries/' + country_id + '/levels';
    }
    return this._http.get<Level[]>(url).pipe(catchError(this.errorHandler));
  }

  getLevel(country_id, level_id = null): Observable<Level> {

    const url = this.url + '/countries/' + country_id + '/levels/' + level_id;

    return this._http.get<Level>(url).pipe(catchError(this.errorHandler));
  }
}

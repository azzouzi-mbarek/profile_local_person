import { AcademicLevel } from './../models/academicLevel.model';

import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class AcademicLevelService {
  url = environment.baseUrl;
  private baseUrl = this.url + '/academic_levels/';

  constructor(private _http: HttpClient) { }

  getAcademicLevels(): Observable<AcademicLevel[]> {
    return this._http
      .get<AcademicLevel[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }
  deleteAcademicLevel(id: Number): Observable<AcademicLevel> {
    return this._http
      .delete<AcademicLevel>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  getAcademicLevel(id: Number): Observable<AcademicLevel> {
    return this._http
      .get<AcademicLevel>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  save(academicLevel: FormData): Observable<AcademicLevel> {
    return this._http
      .post<AcademicLevel>(this.baseUrl, academicLevel)
      .pipe(catchError(this.errorHandler));
  }
  update(academicLevel: AcademicLevel) {
    return this._http
      .put<AcademicLevel>(this.baseUrl + academicLevel.id, academicLevel)
      .pipe(catchError(this.errorHandler));
  }
}

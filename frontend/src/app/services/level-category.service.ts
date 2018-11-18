import { LevelCategory } from './../models/levelCategory.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class LevelCategoryService {
  url = environment.baseUrl;
  private baseUrl = this.url + '/levelCategory/';

  constructor(private _http: HttpClient) { }

  getLevelCategories(): Observable<LevelCategory[]> {
    return this._http
      .get<LevelCategory[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }
  deleteLevelCategory(id: Number): Observable<LevelCategory> {
    return this._http
      .delete<LevelCategory>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  getLevelCategory(id: Number): Observable<LevelCategory> {
    return this._http
      .get<LevelCategory>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  save(levelCategory: FormData): Observable<LevelCategory> {
    return this._http
      .post<LevelCategory>(this.baseUrl, levelCategory)
      .pipe(catchError(this.errorHandler));
  }
  update(levelCategory: LevelCategory) {
    return this._http
      .put<LevelCategory>(this.baseUrl + levelCategory.id, levelCategory)
      .pipe(catchError(this.errorHandler));
  }
}

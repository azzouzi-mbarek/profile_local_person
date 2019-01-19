import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from 'selenium-webdriver/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryLevel } from '../models/categoryLevel.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryLevelService {
  url = environment.baseUrl;
  private baseUrl = this.url + '/category_level/';

  constructor() { }





}

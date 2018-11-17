import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = environment.baseUrl;

  // private baseUrl = this.url + "/" + this.country_id + "/levels/";

  constructor(private _http: HttpClient) { }

  save(person: FormData): Observable<Person> {
    const url = this.url + '/countries/' + person.get('country_id') + '/persons';

    return this._http
      .post<Person>(url, person)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  getPersons(country_id): Observable<Person[]> {
    const url = this.url + '/countries/' + country_id + '/persons';
    return this._http.get<Person[]>(url).pipe(catchError(this.errorHandler));
  }
}

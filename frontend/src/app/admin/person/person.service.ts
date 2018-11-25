import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url = environment.baseUrl;

  // private baseUrl = this.url + "/" + this.country_id + "/levels/";

  constructor(private _http: HttpClient) { }

  // save(person: FormData): Observable<Person> {
  //   const url = this.url + '/countries/' + person.get('country_id') + '/persons';

  //   return this._http
  //     .post<Person>(url, person)
  //     .pipe(catchError(this.errorHandler));
  // }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  getPersons(): Observable<Person[]> {
    const url = this.url +'/persons';
    return this._http.get<Person[]>(url).pipe(catchError(this.errorHandler));
  }
  deletePerson(id: Number): Observable<Person> {
    const url = this.url +'/persons';
    return this._http
      .delete<Person>(url + '/'+id)
      .pipe(catchError(this.errorHandler));
  }
  save(person: any): Observable<Person> {
    const url = this.url +'/persons';
    return this._http
      .post<Person>(url, person)
      .pipe(catchError(this.errorHandler));
  }
  update(person: Person) {
    const url = this.url +'/persons';
    return this._http
      .put<Person>(url + person.id, person)
      .pipe(catchError(this.errorHandler));
  }

  getPerson(id: Number): Observable<Person> {
    const url = this.url +'/persons';
    return this._http
      .get<Person>(url + '/'+ id)
      .pipe(catchError(this.errorHandler));
  }

  // getPersonLevel(country_id=null,level_id=null,person_id=null): Observable<Person[]> {
  //   const url = this.url + '/countries/' + country_id +'/levels/'+level_id+ '/persons/'+person_id;
  //   return this._http.get<Person[]>(url).pipe(catchError(this.errorHandler));
  // }
}

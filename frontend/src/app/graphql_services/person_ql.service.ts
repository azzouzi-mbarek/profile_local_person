import { variable } from '@angular/compiler/src/output/output_ast';
import { query } from '@angular/animations';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PersonQlService {


  restApiUrl = environment.baseUrl;
  private restBaseUrl = this.restApiUrl + '/countries/';

  constructor(private _apollo: Apollo,
    private _http: HttpClient) { }


  //  http request
  uploadLogo(form: FormData) {
    return this._http.post(this.restBaseUrl, form)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


  // tslint:disable-next-line:no-shadowed-variable
  getPersons(query) {
    return this._apollo.watchQuery({
      query: query
    });
  }


  // tslint:disable-next-line:no-shadowed-variable
  getPerson(query, id: number) {
    return this._apollo.watchQuery({
      query: query,
      variables: {
        id: id
      }
    });
  }


  save(mutation, person) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        first_name: person.first_name
      }
    });

  }

  update(mutation, person) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        id: person.id,
        first_name: person.first_name
      }
    });
  }


  delete(mutation, person) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        id: person.id
      }
    });
  }

  personMutation(mutation, person) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        id: person.id,
        first_name: person.first_name,
        last_name: person.last_name,
        image_url: person.image_url,
        sex: person.sex,
        birthday: person.birthday,
        profession: person.profession,
        nationality: person.nationality,
        study_area: person.study_area,
        short_biography: person.short_biography,
        email: person.email,
        number_phone: person.number_phone,
        academic_level_id: person.academic_level_id,

      }
    });

  }

}
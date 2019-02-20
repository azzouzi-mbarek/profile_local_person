import { variable } from '@angular/compiler/src/output/output_ast';
import { query } from '@angular/animations';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AcademicLevelQlService {

  constructor(private _apollo: Apollo) { }


  // tslint:disable-next-line:no-shadowed-variable
  getAcademicLevels(query) {
    return this._apollo.watchQuery({
      query: query
    });
  }


  // tslint:disable-next-line:no-shadowed-variable
  getAcademicLevel(query, id: number) {
    return this._apollo.watchQuery({
      query: query,
      variables: {
        id: id
      }
    });
  }


  save(mutation, academic_Level) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        name: academic_Level.name
      }
    });

  }

  update(mutation, academic_Level) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        id: academic_Level.id,
        name: academic_Level.name
      }
    });
  }


  delete(mutation, academic_Level) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        id: academic_Level.id
      }
    });
  }

  academiqueLevelMutation(mutation, academic_Level) {
    return this._apollo.mutate({
      mutation: mutation,
      variables: {
        id: academic_Level.id,
        name: academic_Level.name
      }
    });

  }

}
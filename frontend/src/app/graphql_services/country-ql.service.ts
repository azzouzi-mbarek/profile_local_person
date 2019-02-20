import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CountryQlService {

  countriesQuery = gql`
  query countries {
    countries {
    id
    name
    geom
  }
  }
`;




  countries = []

  constructor(private apollo: Apollo) { }


  getCountries() {
    return this.apollo.watchQuery({
      query: this.countriesQuery
    })
  }





}

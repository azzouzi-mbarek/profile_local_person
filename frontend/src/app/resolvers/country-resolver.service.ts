import { Country } from './../models/country.model';
import { Observable } from 'rxjs/internal/Observable';
import { ResolvedCountryList } from './resolved-countryList.model';
import { CountryService } from './../services/country.service';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class CountryListResolverService implements Resolve<Country[] | any> {

    constructor(private _countryService: CountryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[] | any> {
        return this._countryService.getCountries().pipe(
            catchError((err: any) => of(err))
        );
    }

}

import { Country } from './../models/country.model';


export class ResolvedCountryList {
    constructor(public countryList: Country[], public error: any = null) { }
}

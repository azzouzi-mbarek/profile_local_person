import { Country } from './../../models/country.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { FormCountryComponent } from './form-country/form-country.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries = [];
  country = new Country();
  filtredCountries = [];
  errors = [];
  p = 1;
  bsModalRef: BsModalRef;
  // dtTrigger: Subject = new Subject();
  @ViewChild('CountryForm')
  public RegionForm: NgForm;

  private _searchTerm: String;

  get searchTerm(): String {
    return this._searchTerm;
  }
  set searchTerm(value: String) {
    this._searchTerm = value;
    this.filtredCountries = this.filterCountries(value);
  }

  filterCountries(searchString: String) {
    if (searchString === null) {
      this.filtredCountries = this.countries;
    } else {
      return this.countries.filter(
        country =>
          country.properties.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      );
    }
  }
  constructor(
    private _countryService: CountryService,
    private _modalService: BsModalService,

    private _router: Router,
    private _route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.getCountries();
  }
  gotoCountryDetails(id) {
    this._router.navigate([id], {
      relativeTo: this._route
    });
  }
  getCountries() {
    this._countryService.getCountries().subscribe(
      (countriesApi: any) => {
        this.countries = countriesApi.data;
        this.filtredCountries = this.countries;
      },
      error => {
        this.errors = error;
      }
    );
  }

  createCountry() {
    this.openModalFormCountry(false);
  }

  editCountry() {
    this.openModalFormCountry(true);
  }

  openModalFormCountry(edit: boolean) {
    const initialState = {
      title: edit ? 'Edit Country' : 'New Country',
      country: edit ? this.country : new Country(),
      edit: edit,
      errors: this.errors
    };
    this.bsModalRef = this._modalService.show(FormCountryComponent, {
      initialState,
      class: 'modal-lg'
    });

    if (edit === false) {
      this.bsModalRef.content.onClose.subscribe(data => {
        this._countryService.save(data).subscribe(
          countryApi => {

            this.getCountries();
            this.country = new Country();
            this.errors = [];
            this.bsModalRef.content.errors = this.errors;
            this.bsModalRef.content.country = this.country;
            this.bsModalRef.hide();
          },
          error => {
            this.errors = error.error.errors;
            this.bsModalRef.content.errors = this.errors;
            this.errors = [];
          }
        );
      });
    } else {
      this.bsModalRef.content.onClose.subscribe(data =>
        this._countryService.update(data).subscribe(
          countryData => {

            this.getCountries();

            this.country = new Country();
            this.errors = [];
            this.bsModalRef.content.errors = this.errors;
            this.bsModalRef.content.country = this.country;
            this.bsModalRef.hide();
          },
          error => {
            this.errors = error.error.errors;
            this.bsModalRef.content.errors = this.errors;
            this.errors = [];
          }
        )
      );
    }
  }
}

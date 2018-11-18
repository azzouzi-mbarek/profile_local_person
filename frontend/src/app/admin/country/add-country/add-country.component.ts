
import { Country } from './../../../models/country.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';


import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
  geoJsonFile: any;
  mapHeight = 900;
  geojsonUrl: string;
  fileToUpload: File = null;
  public country = new Country();
  countries = [];
  errors = [];
  private _id: Number;
  private _searchTerm: String;
  public filteredCountries = [];
  showFormAddJson = true;
  changeFileFlag = '';
  math = Math;
  errorFile = null;
  enableSubmitForm = false;

  get searchTerm(): String {
    return this._searchTerm;
  }

  set searchTerm(value: String) {
    this._searchTerm = value;
    this.filteredCountries = this.filtreCountries(value);
  }

  @ViewChild('CountryForm')
  public CountryForm: NgForm;

  constructor(
    private _countryService: CountryService,
    private _modalService: BsModalService,

    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  bsModalRef: BsModalRef;

  ngOnInit() {
    this.getCountries();
  }

  creatCountry() {
    this.openModalFormCountry(false);
  }

  onEditCountry(id: Number) {
    this._countryService.getCountry(id).subscribe(
      (countryData: any) => {
        // @ts-ignore
        this.country = countryData.data;
        this.openModalFormCountry(true);
      },
      error => {
        this.errors = error;
      }
    );
  }

  onDeleteCountry(id: Number) {
    this._countryService.deleteCountry(id).subscribe(
      data => {
        this.getCountries();
        const i = this.filteredCountries.findIndex(e => e.id === id);
        if (i !== -1) {
          this.filteredCountries.splice(i, 1);

        }
      },
      error => console.log(error)
    );
  }

  openModalFormCountry(edit: boolean) {
    const initialState = {
      title: edit ? 'Edit Country' : 'New Country',
      country: edit ? this.country : new Country(),
      edit: edit,
      errors: this.errors
    };
    // this.bsModalRef = this._modalService.show(FormCountryComponent, {
    //   initialState
    // });
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

  getCountries() {
    return this._countryService.getCountries().subscribe(
      countryApi => {
        // @ts-ignore
        this.countrys = countryApi.data;
        if (this.countries.length !== 0) {
          this.showFormAddJson = true;
        }
        if (this._route.snapshot.queryParamMap.has('searchTerm')) {
          this.searchTerm = this._route.snapshot.queryParamMap.get(
            'searchTerm'
          );
        } else if (this.searchTerm) {
          this.filteredCountries = this.filtreCountries(this.searchTerm);
        } else {
          this.filteredCountries = this.countries;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  filtreCountries(searchString: String) {
    if (searchString === null) {
      this.filteredCountries = this.countries;
    } else {
      return this.countries.filter(
        country =>
          country.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      );
    }
  }

  OnSubmit() {
    const formData = new FormData();

    formData.append('geojson', this.fileToUpload, this.fileToUpload.name);

    this._countryService.save(formData).subscribe(
      data => {
        console.log('data uploaded');
        this.enableSubmitForm = true;
        this._router.navigate(['administrateur/countries']);
      },
      error => {
        console.log(error);
      }
    );
  }

  handleFileInput(file: FileList) {
    // get file form event
    this.fileToUpload = file.item(0);
    // get extension of uploaded file
    const extension = this.fileToUpload.name.split('.')[1].toLocaleLowerCase();
    // test file extension
    if (extension === 'json' || extension === 'geojson') {
      this.enableSubmitForm = true;
      // create a reader
      const reader = new FileReader();
      // read uploaded file as Text
      reader.readAsText(this.fileToUpload);
      // get JSON file on load to use ot before save it
      reader.onload = (event: any) => {
        // get Result and parse JSON FORMAT
        this.geoJsonFile = event.target.result;
        this.geoJsonFile = JSON.parse(this.geoJsonFile);
        // turn error to null
        this.errorFile = null;
      };
    } else {
      this.errorFile = 'File Uploaded not json/geojson';
      this.enableSubmitForm = false;
      this.geoJsonFile = null;
    }
  }
}

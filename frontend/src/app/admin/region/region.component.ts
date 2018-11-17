import { Component, OnInit, ViewChild } from '@angular/core';
import { RegionService } from './region.service';
import { Region } from './region.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormRegionComponent } from './form-region/form-region.component';

import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],

})
export class RegionComponent implements OnInit {
  geoJsonFile: any;
  geojsonUrl: string;
  fileToUpload: File = null;
  public region = new Region();
  regions = [];
  errors = [];
  private _id: Number;
  private _searchTerm: String;
  public filteredRegions = [];
  showFormAddJson = true;
  changeFileFlag = '';
  math = Math;
  errorFile = null;
  hideButtonSubmit = false;

  get searchTerm(): String {
    return this._searchTerm;
  }

  set searchTerm(value: String) {
    this._searchTerm = value;
    this.filteredRegions = this.filtreRegions(value);
  }


  @ViewChild('RegionForm') public RegionForm: NgForm;


  constructor(private _regionService: RegionService,
    private _modalService: BsModalService,

    private _router: Router,
    private _route: ActivatedRoute,

  ) { }

  bsModalRef: BsModalRef;


  ngOnInit() {
    this.getRegions();

  }

  creatRegion() {
    this.openModalFormRegion(false);
  }

  onEditRegion(id: Number) {
    this._regionService.getRegion(id).subscribe(
      (regionData: any) => {
        // @ts-ignore
        this.region = regionData.data;
        this.openModalFormRegion(true);

      },
      error => {
        this.errors = error;
      },
    );
  }

  onDeleteRegion(id: Number) {
    this._regionService.deleteRegion(id).subscribe(
      (data) => {

        this.getRegions();
        const i = this.filteredRegions.findIndex(e => e.id === id);
        if (i !== -1) {
          this.filteredRegions.splice(i, 1);

        }
      },
      error => console.log(error)
    );


  }


  openModalFormRegion(edit: boolean) {
    const initialState = {
      title: edit ? 'Edit Region' : 'New Region',
      region: edit ? this.region : new Region(),
      edit: edit,
      errors: this.errors,
    };
    this.bsModalRef = this._modalService.show(FormRegionComponent, { initialState });
    if (edit === false) {
      this.bsModalRef.content.onClose.subscribe(
        (data) => {
          this._regionService.save(data)
            .subscribe(
              regionApi => {


                this.getRegions();
                this.region = new Region();
                this.errors = [];
                this.bsModalRef.content.errors = this.errors;
                this.bsModalRef.content.region = this.region;
                this.bsModalRef.hide();


              },
              (error) => {
                this.errors = error.error.errors;
                this.bsModalRef.content.errors = this.errors;
                this.errors = [];

              }
            );


        }
      );
    } else {


      this.bsModalRef.content.onClose.subscribe(
        data => this._regionService.update(data)
          .subscribe(
            (regionData) => {

              this.getRegions();

              this.region = new Region();
              this.errors = [];
              this.bsModalRef.content.errors = this.errors;
              this.bsModalRef.content.region = this.region;
              this.bsModalRef.hide();
            },
            (error) => {
              this.errors = error.error.errors;
              this.bsModalRef.content.errors = this.errors;
              this.errors = [];
            }
          )
      );


    }

  }


  getRegions() {
    return this._regionService.getRegions().subscribe(
      (regionApi) => {
        // @ts-ignore
        this.regions = regionApi.data;
        if (this.regions.length !== 0) {
          this.showFormAddJson = true;
        }
        if (this._route.snapshot.queryParamMap.has('searchTerm')) {
          this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');

        } else if (this.searchTerm) {

          this.filteredRegions = this.filtreRegions(this.searchTerm);

        } else {
          this.filteredRegions = this.regions;

        }


      },
      (error) => {
        console.log(error);
      }
    );
  }

  filtreRegions(searchString: String) {
    if (searchString === null) {
      this.filteredRegions = this.regions;
    } else {

      return this.regions.filter(region =>
        region.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
    }

  }


  OnSubmit() {
    const formData = new FormData();

    formData.append('geojson', this.fileToUpload, this.fileToUpload.name);


    this._regionService.save(formData).subscribe(
      (data) => {
        console.log('data uploaded');
        this.hideButtonSubmit = true;
      },
      (error) => { console.log(error); }
    );

  }

  handleFileInput(file: FileList) {


    this.fileToUpload = file.item(0);
    const extension = this.fileToUpload.name.split('.')[1].toLocaleLowerCase();

    if (extension === 'json' || extension === 'geojson') {
      const reader = new FileReader();

      reader.readAsText(this.fileToUpload);
      reader.onload = (event: any) => {
        this.geoJsonFile = event.target.result;
        this.geoJsonFile = JSON.parse(this.geoJsonFile);
        this.errorFile = null;
        this.hideButtonSubmit = true;

      };
    } else {
      this.errorFile = 'File Uploaded not json/geojson';
      this.hideButtonSubmit = false;
    }


    // reader.readAsDataURL(this.fileToUpload);
  }

}

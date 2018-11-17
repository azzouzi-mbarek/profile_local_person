import { Level } from './../../../models/level.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from '../../../services/level.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-level-by-file',
  templateUrl: './add-level-by-file.component.html',
  styleUrls: ['./add-level-by-file.component.css']
})
export class AddLevelByFileComponent implements OnInit {
  errorFile = null;
  fileToUpload: File;
  enableSubmitForm = false;
  geoJsonFile: any;
  country_id = null;
  level_id = null;
  level = Level;
  level_stage = null;
  constructor(
    private _levelService: LevelService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      // this.level_id = +params.get('id');
      this.country_id = +params.get('id');
      this.level_stage = +params.get('level');
      // console.log(this.country_id);
    });
    this._route.queryParamMap.subscribe(params => {
      if (params.has('c')) {
        this.country_id = +params.get('c');
        this.level_id = +params.get('id');
        console.log(this.country_id);

      }

    });
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
      // get JSON file on load to use it before save it
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
  OnSubmit() {
    const formData = new FormData();

    formData.append('geojson', this.fileToUpload, this.fileToUpload.name);

    formData.append('level_id', this.level_id);
    // this._levelService.getLevel
    formData.append('country_id', this.country_id);
    formData.append('level_stage', this.level_stage);
    // formData.append("single_shape", "false");

    this._levelService.save(formData).subscribe(
      data => {
        console.log('data uploaded');
        this.enableSubmitForm = true;
        this._router.navigate(['administrateur/countries', this.country_id]);
      },
      error => {
        console.log(error);
      }
    );
  }
}

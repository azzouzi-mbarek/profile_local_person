import { Country } from "./../../../models/country.model";
import { Component, OnInit } from "@angular/core";
import { CountryService } from "../country.service";
import { ActivatedRoute, Router } from "@angular/router";
declare let $;
@Component({
  selector: "app-form-country",
  templateUrl: "./form-country.component.html",
  styleUrls: ["./form-country.component.css"]
})
export class FormCountryComponent implements OnInit {
  country = new Country();
  errors = [];
  title = "Create Country";
  fileToUpload: File;
  geoJsonFile: any;
  errorFile: any;
  errorFlag: any;
  flag: any;
  imageUrl: string = "/assets/default-image.png";
  imageToUpload: File;
  constructor(
    private _countryService: CountryService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.inputCustom();
  }

  onSubmit() {
    const formData = new FormData();

    const props = Object.keys(this.country);
    const values = Object.values(this.country);

    formData.append("single_shape", "true");
    for (var i = 1; i < values.length; i++) {
      formData.append(props[i], values[i]);
    }
    if (this.fileToUpload) {
      formData.append("geojson", this.fileToUpload, this.fileToUpload.name);
    }
    if (this.imageToUpload) {
      formData.append("flag_url", this.imageToUpload, this.imageToUpload.name);
    }

    this._countryService.save(formData).subscribe(
      data => {
        console.log("data uploaded");

        this._router.navigate(["administrateur/countries"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  handleFlagInput(file: FileList) {
    this.imageToUpload = file.item(0);
    const extension = this.imageToUpload.name.split(".")[1].toLocaleLowerCase();

    if (["jpg", "png", "jpeg"].includes(extension.toLowerCase())) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(this.imageToUpload);
      this.errorFlag = null;
    } else {
      this.errorFlag = "Choose file with JPEG - JPG - PNG Fromat !";
    }
  }

  handleGeojsonFileInput(file: FileList) {
    // get file form event
    this.fileToUpload = file.item(0);
    // get extension of uploaded file
    const extension = this.fileToUpload.name.split(".")[1].toLocaleLowerCase();
    // test file extension
    if (extension === "json" || extension === "geojson") {
      // create a reader
      const reader = new FileReader();
      // read uploaded file as Text
      reader.readAsText(this.fileToUpload);
      // get JSON file on load to use ot before save it
      reader.onload = (event: any) => {
        //get Result and parse JSON FORMAT
        this.geoJsonFile = event.target.result;
        this.geoJsonFile = JSON.parse(this.geoJsonFile);
        // turn error to null
        this.errorFile = null;
      };
    } else {
      this.errorFile = "File Uploaded not json/geojson";
      this.errorFile = "Choose valid GeoJson/json File";
      this.geoJsonFile = null;
    }
  }

  inputCustom() {
    $(".custom-file-input").on("change", function() {
      let fileName = $(this)
        .val()
        .split("\\")
        .pop();
      $(this)
        .next(".custom-file-label")
        .addClass("selected")
        .html(fileName);
    });
  }
}

import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DirectoryService } from 'src/app/services/directory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  results = [];
  levelsResults = [];
  personsResults = [];
  resultsCounts = false;
  counts: number = null;
  searchTerm = null;

  // get searchTerm(): String {
  //   return this._searchTerm;
  // }
  // set searchTerm(value: String) {
  //   this._searchTerm = value;
  //   this.search();
  // }


  constructor(
    private http: HttpClient,
    private _directoryService: DirectoryService,
    private _router: Router) { }

  ngOnInit() {
  }

  search() {

    this._directoryService.getData(this.searchTerm).subscribe(
      (data: any) => {
        this.results = data.data;

        this.levelsResults = this.results['levels'];
        console.log(this.levelsResults);
        this.personsResults = this.results['persons'];

        if (this.levelsResults.length > 0 || this.personsResults.length > 0) {
          this.resultsCounts = true;
          this.counts = this.levelsResults.length + this.personsResults.length;
        } else if (this.levelsResults.length < 0 && this.personsResults.length < 0) {
          this.resultsCounts = false;
        }


      },
      (error) => { console.log(error); }
    );
  }


  goToPersonProfil(id) {
    this._router.navigate(['landing/profile-person', id]);

  }


  goToLevelProfil(id) {
    this._router.navigate(['landing/profile-local-government', id]);
  }


}

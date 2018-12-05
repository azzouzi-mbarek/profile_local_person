import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DirectoryService } from 'src/app/services/directory.service';
import { INgxSelectOption } from 'ngx-select-ex';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  isCollapsed1 = false;
  isCollapsed2 = true;
  isCollapsed3 = true;


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


// input elements
  public itemsProfil:string[]=['directeur','Maire','secretaire','adjoint','Technicien'];
  public itemsRegion: string[] = ['Afrique du nord',
    'Afrique de l\'est',
    'Afrique centrale',
    'Afrique occidentale',
    'Afrique du sud'];
    public itemsPays: string[] = [];
    public itemsCategoryLevel: string[] = ['province','region','commun'];
// public ngxValue: any = [];
public ngxDisabled = false;




// filtredCategory= [];
// private _Category: String;

//   get Category(): String {
//     return this._Category;
//   }
//   set Category(value: String) {
//     this._Category = value;
//    this.filtredCategory = this.filterbyCategory(value);
//   }
//   filterbyCategory(searchString: String) {
//     if (searchString === null) {
//       this.filtredCategory = this.results['levels'];
//     } else {
//       return this.results['levels'].filter(
//         levels =>
//           levels.properties.category.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
//       );
//     }
//   }




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

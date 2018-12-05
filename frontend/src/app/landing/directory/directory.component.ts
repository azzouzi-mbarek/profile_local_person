import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DirectoryService } from 'src/app/services/directory.service';
import { INgxSelectOption } from 'ngx-select-ex';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  results = [];
  levelsResults = [];
  personsResults = [];

  counts = 0;
  searchTerm: string;



// input elements
  public itemsRegion: string[] = ['Afrique du nord',
    'Afrique de l\'est',
    'Afrique centrale',
    'Afrique occidentale',
    'Afrique du sud'];
    public itemsPays: string[] = [];
    public itemsCategoryLevel: string[] = ['province','region','commun'];
// public ngxValue: any = [];
public ngxDisabled = false;




filtredCategory= [];
private _Category: String;

  get Category(): String {
    return this._Category;
  }
  set Category(value: String) {
    this._Category = value;
   this.filtredCategory = this.filterbyCategory(value);
  }
  filterbyCategory(searchString: String) {
    if (searchString === null) {
      this.filtredCategory = this.results['levels'];
    } else {
      return this.results['levels'].filter(
        levels =>
          levels.properties.category.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      );
    }
  }




  constructor(
    private http: HttpClient,
    private _directoryService: DirectoryService) { }

  ngOnInit() {
  }

  search() {
    this._directoryService.getData(this.searchTerm).subscribe(
      (data: any) => {
        this.results = data.data;
        console.log(this.levelsResults = this.results['levels']);
        console.log(this.personsResults = this.results['persons']);


      },
      (error) => { console.log(error); }
    );
  }


  gotPersonProfil(id) {

  }



}

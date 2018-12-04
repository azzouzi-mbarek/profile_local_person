import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { DirectoryService } from 'src/app/services/directory.service';

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

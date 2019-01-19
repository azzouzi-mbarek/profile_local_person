import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {IndicatorService} from 'src/app/services/indicator.service';
import {TrancparencyMapsComponent} from "../../maps/trancparency-maps/trancparency-maps.component";

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.css']
})
export class TransparencyComponent implements OnInit, OnChanges {
  tabHover = 'tab1';
  layerObject = null;
  results = [];
  levelsResults = [];
  searchIndicator = 'Rapport annuel disponible';

  



  constructor(private http: HttpClient,
              private _indicatorService: IndicatorService,
              private _router: Router) {
  }

  // getOnclickObject($event) {
  //   this.layerObject = $event;
  // }

  onSelect() {
// console.log('onselect',this.searchIndicator);
    this.search();

  }

  onMouseOver(id) {
    this.tabHover = id;
  }

  ngOnChanges(changes: SimpleChanges): void {


    //  console.log('changes',changes);

  }

  ngOnInit() {
    this.search();
  }

  search() {

    this._indicatorService.getData(this.searchIndicator).subscribe(
      (data: any) => {
        console.log(this.searchIndicator)
        this.results = data.data;

        console.log('indicator results', this.results);


      },
      (error) => {
        console.log(error);
      }
    );
  }

}

import { Level } from './../../models/level.model';
import { LevelService } from './../../services/level.service';
import { MapService } from './../../maps/map.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  levels = [];
  level: any;
  filtredLevels = [];
  errors = [];
  country_id = null;
  level_id = null;
  p = 1;
  level_stage: number;

  private _searchTerm: String;

  get searchTerm(): String {
    return this._searchTerm;
  }
  set searchTerm(value: String) {
    this._searchTerm = value;
    this.filtredLevels = this.filterLevels(value);
  }
  filterLevels(searchString: String) {
    if (searchString === null) {
      this.filtredLevels = this.levels;
    } else {
      return this.levels.filter(
        level =>
          level.properties.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      );
    }
  }
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _mapService: MapService,
    private _levelService: LevelService) { }

  ngOnInit() {

    this._route.queryParamMap.subscribe(paramsQ => {

      if (paramsQ.has('s')) {
        this.level_stage = +paramsQ.get('s');
        this._route.paramMap.subscribe(paramsM => {
          this.country_id = +paramsM.get('id');
          this.level_id = +paramsM.get('l_id');
          this._levelService.getLevels(this.country_id, this.level_id).subscribe(
            (levelsApi: any) => {
              this.levels = levelsApi.data;
              this.filtredLevels = this.levels;
            },
            error => console.log(error)
          );
        });
        // console.log(this.country_id, this.level_id);
      } else {
        this._route.paramMap.subscribe(
          params => {
            this.country_id = +params.get('id');
            this._levelService.getLevels(this.country_id).subscribe(
              (levelsApi: any) => {
                this.levels = levelsApi.data;
                this.filtredLevels = this.levels;
              },
              error => console.log(error)
            );
          });
      }
    });





  }


  gotoLevelDetails(level) {
    this._router.navigate(['administrateur/countries', level.properties.country_id, 'levels', level.properties.id], {

      queryParams: { s: level.properties.stage + 1 }
    });
  }
  gotoLevelDektails(level) {
    // console.log(level.properties.stage);
    // if (level.properties.stage > 1) {
    //   this._route.navigate('l', {
    //     relativeTo: this._route,
    //     queryParams: { s: level.properties.stage + 1 }
    //   });
    // }
    // this._router.navigate([level.properties.id], {
    //   relativeTo: this._route
    // });
  }


}

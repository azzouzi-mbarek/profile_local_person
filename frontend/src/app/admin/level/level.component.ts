import { Level } from './../../models/level.model';
import { LevelService } from './../../services/level.service';
import { MapService } from './../../maps/map.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';

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
          level.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1
      );
    }
  }
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _mapService: MapService,
    private _levelService: LevelService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => this.level_stage = +params.get('level'));
    if (this.level_stage === 1) {

      console.log('ok');
      this._route.paramMap.subscribe(
        params => {
          this.country_id = +params.get('id');


          this._levelService.getLevels(this.country_id).subscribe(
            (levelsApi: any) => {
              this.levels = levelsApi.data;
              this.filtredLevels = this.levels;
              console.log(this.levels);
            },
            error => console.log(error)
          );
        }
      );
    } else {
      this._route.queryParamMap.subscribe(params => this.country_id = +params.get('c'));
      this._route.paramMap.subscribe(params => { this.level_id = +params.get('id'); });
      this._levelService.getLevel(this.country_id, this.level_id).subscribe(
        (level: any) => {
          this.level = level.data;
          this.levels = this.level.levels;
          this.filtredLevels = this.levels;
          console.log(this.levels);
        },
        (error) => { console.log(error); }
      )

    }


  }

  gotoLevelDetails(id) {
    this._router.navigate([id], {
      relativeTo: this._route
    });
  }


}

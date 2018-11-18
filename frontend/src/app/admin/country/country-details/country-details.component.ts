
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { CountryService } from '../../../services/country.service';
import { PersonService } from '../../../services/person.service';
import { MapService } from './../../../maps/map.service';
import { Country } from './../../../models/country.model';
import { LevelService } from './../../../services/level.service';


@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  public dtOptions: DataTables.Settings = {};
  dtTriggerLevels: Subject<any> = new Subject();
  dtTriggerPersons: Subject<any> = new Subject();
  title = 'Level 1';
  levelCategoryName = 'level';

  optionsSurface = {
    view: [],
    label: 'Total',
    totalValue: null,
    animations: true,
    tooltipDisabled: false,
    tooltipTemplate: null,
    colorScheme: { domain: [] },
    data: null
  };

  optionsPopulation = {
    view: [],
    label: 'Total',
    totalValue: null,
    animations: true,
    tooltipDisabled: false,
    tooltipTemplate: null,
    colorScheme: { domain: [] },
    data: null
  };

  dataGraphe = [];

  private _id: number;
  country: any;
  levels = [];
  persons = [];
  constructor(
    private _route: ActivatedRoute,
    private _countryService: CountryService,
    private _personService: PersonService,
    private _levelService: LevelService,
    private _router: Router,
    private _mapService: MapService
  ) { }



  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._id = +params.get('id');
      this._countryService.getCountry(this._id).subscribe(
        (countryApi: any) => {
          this.country = countryApi.data;
          // this.persons = this.country.persons;
          // this.dtTriggerPersons.next();
          this.title = this.country.properties.name + ' Levels 1';
          this.getGraphSurface(this.country);
          this.getGraphPopulation(this.country);
        },
        error => {
          console.log(error);
        }
      );
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getLevels(this._id);
    this.getPersons(this._id);


  }
  getPersons(country_id) {
    this._personService.getPersons(country_id).subscribe(
      (personApi: any) => {

        this.persons = personApi.data;
        this.dtTriggerPersons.next();
      },
      error => {
        console.log(error);
      }
    );
  }

  getLevels(country_id) {
    this._levelService.getLevels(country_id).subscribe(
      (levelApi: any) => {

        this.levels = levelApi.data;
        this.levelCategoryName = this.levels[0].properties.category;

        this.dtTriggerLevels.next();

      },
      error => {
        console.log(error);
      }

    );
  }

  getGraphSurface(country: any) {
    this.optionsSurface.view = [200, 200];
    this.optionsSurface.label = 'Area';
    this.optionsSurface.totalValue = 30370000;
    this.optionsSurface.tooltipDisabled = false;
    this.optionsSurface.colorScheme.domain = [
      '#01a48f',
      '#00cbc6',
      '#41e6e1',
      '#b6f3f5'
    ];
    this.optionsSurface.tooltipTemplate = () => {
      return '<ng-template>' + this.country.properties.area + ' km2' + '</ng-template>';
    };
    this.optionsSurface.data = [{ name: country.properties.name, value: this._mapService.getSurface(country.geometry) }];
  }

  getGraphPopulation(country: any) {
    this.optionsPopulation.view = [200, 200];
    this.optionsPopulation.label = 'Population ' + country.properties.population_year;
    this.optionsPopulation.totalValue = 1216000000;
    this.optionsPopulation.tooltipDisabled = false;
    this.optionsPopulation.colorScheme.domain = [
      '#00b9ee',

      '#b6f3f5'
    ];
    this.optionsPopulation.tooltipTemplate = () => {
      return '<ng-template>' + this.country.properties.population + ' ' + country.properties.population_year + '</ng-template>';
    };
    this.optionsPopulation.data = [{ name: country.properties.name, value: country.properties.population }];
  }

  gotoAddLevelByFile(id) {
    this._router.navigate([id], {
      relativeTo: this._route
    });
  }


  goToLevels1() {
    this._router.navigate(['levels'], {
      relativeTo: this._route
    });
  }
}

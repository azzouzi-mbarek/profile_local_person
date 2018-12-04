import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelService } from 'src/app/services/level.service';
import { PersonService } from 'src/app/services/person.service';
import { CountryService } from 'src/app/services/country.service';
import { MapService } from 'src/app/maps/map.service';
import { single, singleType, singleDomaine, singleSiege } from './dataProfile';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-profile-local',
  templateUrl: './profile-local.component.html',
  styleUrls: ['./profile-local.component.css']
})
export class ProfileLocalComponent implements OnInit {
  @ViewChild(DataTableDirective) dtElementLevel: DataTableDirective;
  single = [];
  public dtOptions: DataTables.Settings = {};
  dtTriggerLevels: Subject<any> = new Subject();
  dtTriggerPersons: Subject<any> = new Subject();
  // title = 'Level 2';

  legendPosition = ['right', 'below'];
  colorSchemeEL = {
    domain: ['#DE7A22', '#20948B', '#6AB187', '#F4CC70', '#f1f1f2']
  };
  colorScheme = {
    domain: ['#125f75', '#1995ad', '#a1d6e2', '#bcbabe', '#f1f1f2']
  };
  colorSchemeCL = {
    domain: ['#125f75', '#1995ad', '#a1d6e2', '#bcbabe', '#f1f1f2']
  };
  colorSchemePopulation = {
    domain: ['#1F1F26', '#283655', '#4d648d', '#8799bb', '#d0e1f9']
  };
  animations = true;
  doughnut = false;

  view: any[] = [400, 200];
  //  domaine d’interventions
  xAxisLabeldomaine = 'Nombre';
  yAxisLabeldomaine = ' domaine d’interventions';
  // Par type d’institutions
  xAxisLabelinst = ' type d’institutions ';
  yAxisLabelinst = 'Nombre';

  // bar chart Population
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegendBarChart = false;
  showXAxisLabel = true;
  xAxisLabel = 'Population';
  showYAxisLabel = true;
  yAxisLabel = 'Region';

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
  singleParite = [];
  country_id: number;
  level: any;
  levels = [];
  persons = [];
  level_id: number;
  country: any;
  level_stage = null;
  levelHoverName = null;
  constructor(
    private _route: ActivatedRoute,
    private _levelService: LevelService,
    private _personService: PersonService,
    private _countryService: CountryService,

    private _router: Router,
    private _mapService: MapService
  ) {
    Object.assign(this, { singleType, singleDomaine, singleSiege });
  }

  gotToLevelDetails(id) {


    this._router.navigate(['landing/profile-local-government', id]);
    // this._router.navigate(['landing/profile-local-government', props.id], { queryParams: { c: props.country_id } });

  }
  rerenderTablesLevels(): void {


    this.dtElementLevel.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTriggerLevels.next();
    });

  }

  ngOnInit() {



    this._route.paramMap.subscribe(params => {
      this.level_id = +params.get('id');
      this._levelService.getLevel(this.country_id, this.level_id).subscribe(
        (levelApi: any) => {
          this.level = levelApi.data;
          this.getLevels(this.level.properties.country_id, this.level_id);
          this.getPersons(this.level.properties.country_id, this.level_id);

        },
        error => { console.log(error); }
      );

    });


    // parite genre
    this.singleParite = [{
      name: 'Hommes',
      value: 10
    },
    {
      name: 'Femmes',
      value: 9
    }];
    this.single = [{
      name: 'Nombre de collectivités inclus ',
      value: 66
    },
    {
      name: 'Nombre de partenaires',
      value: 18
    },
    {
      name: 'Nombres d’associations Nationales',
      value: 33
    }
    ];




    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log(data);
          // self.someClickHandler(data);
        });
        return row;
      }
    };



  }

  getPersons(country_id, level_id) {
    this._personService.getPersonsLevel(country_id, level_id).subscribe(
      (personApi: any) => {

        this.persons = personApi.data;
        this.rerenderTablesLevels();
        this.dtTriggerPersons.next();
      },
      error => {
        console.log(error);
      }
    );
  }

  getLevels(country_id, level_id) {
    this._levelService.getLevels(country_id, level_id).subscribe(
      (levelApi: any) => {

        this.levels = levelApi.data;
        this.rerenderTablesLevels();
        this.dtTriggerLevels.next();
        // this.dtTriggerPersons.next();
      },
      error => {
        console.log(error);
      }

    );
  }

  getGraphSurface(level: any, country_id) {
    const surface_country = this._mapService.getSurface(this.country.geometry);
    this.optionsSurface.view = [200, 200];
    this.optionsSurface.label = 'Area';
    this.optionsSurface.totalValue = surface_country;
    this.optionsSurface.tooltipDisabled = false;
    this.optionsSurface.colorScheme.domain = [
      '#01a48f',
      '#00cbc6',
      '#41e6e1',
      '#b6f3f5'
    ];
    this.optionsSurface.tooltipTemplate = () => {
      return '<ng-template>' + this.level.properties.area + ' km2' + '</ng-template>';
    };
    this.optionsSurface.data = [{ name: level.properties.name, value: this._mapService.getSurface(level.geometry) }];
  }

  getGraphPopulation(level: any, country) {
    this.optionsPopulation.view = [200, 200];
    this.optionsPopulation.label = 'Population ' + level.properties.population_year;
    this.optionsPopulation.totalValue = 1216000000;
    this.optionsPopulation.tooltipDisabled = false;
    this.optionsPopulation.colorScheme.domain = [
      '#00b9ee',

      '#b6f3f5'
    ];
    this.optionsPopulation.tooltipTemplate = () => {
      return '<ng-template>' + this.country.properties.population + ' ' + level.properties.population_year + '</ng-template>';
    };
    this.optionsPopulation.data = [{ name: level.properties.name, value: level.properties.population }];
  }

  gotoAddLevelByFile(id) {
    this._router.navigate([id], {
      relativeTo: this._route
    });
  }




  onMouseEnterTR(name, i) {

    this.levelHoverName = name;

  }

  onMouseLeaveTR(country) {
    this.levelHoverName = null;

  }
  onSelect(id) {
    const country_id = this.level.properties.country_id;
    const level_id = this.level_id;
    // console.log('profil local', id, level_id, country_id);
    this._router.navigate(['landing/profile-person', id], { queryParams: { c: country_id, l: level_id } });

  }
}

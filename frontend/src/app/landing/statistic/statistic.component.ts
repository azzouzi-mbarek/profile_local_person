import {CountryService} from './../../services/country.service';
import {Component, OnInit, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {singleCL, singleEL, singleSiege, singleDomaine, singleType} from './data';
import {RegionService} from 'src/app/services/region.service';
import {StatistcMapComponent} from 'src/app/maps/statistc-map/statistc-map.component';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  countries = [];
  singleCL: any[];
  singleEL: any[];
  singlePOP = [];
  singleParite = [];
  singleCollectivites = [];
  singleStatut = [];
  singleGenaral = [];
  singleNiveau = [];
  multi: any[];
  tabHover = 'tab1';
  regions = [];
  layerObject = null;

  @ViewChild(StatistcMapComponent) child;

  legendPosition = ['right', 'below'];
  // options
  showLegend = true;
  colorSchemeCollectivite = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  colorSchemeCL = {
    domain: ['#125f75', '#1995ad', '#a1d6e2', '#bcbabe', '#f1f1f2']
  };

  colorSchemeEL = {
    domain: ['#DE7A22', '#20948B', '#6AB187', '#F4CC70', '#f1f1f2']
  };

  animations = true;

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  view: any[] = [400, 200];
  //  domaine d’interventions
  xAxisLabeldomaine = 'Nombre';
  yAxisLabeldomaine = ' domaine d’interventions';
  // Par type d’institutions 
  xAxisLabelinst = ' type d’institutions ';
  yAxisLabelinst = 'Nombre';
  // bar chart Niveau académique 
  xAxisLabelNiveau = ' Nombre';
  yAxisLabelNiveau = 'Niveau académique';


  // bar chart Population
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegendBarChart = true;
  showXAxisLabel = true;
  xAxisLabel = 'Population';
  showYAxisLabel = true;
  yAxisLabel = 'Region';

  colorSchemePopulation = {
    domain: ['#1F1F26', '#283655', '#4d648d', '#8799bb', '#d0e1f9']
  };

  constructor(private _countriesService: CountryService, private _regionsService: RegionService) {
    Object.assign(this, {singleCL, singleEL, singleSiege, singleDomaine, singleType});
  }


  getOnclickObject($event) {
    this.layerObject = $event;
// parite genre 
    this.singleParite = [{
      name: 'male',
      value: this.layerObject.partie_genre_male
    },
      {
        name: 'female',
        value: this.layerObject.partie_genre_female
      }];
// elus locaux par genre
    this.singleStatut = [{
      name: 'Elu',
      value: this.layerObject.N_of_person_elu
    },
      {
        name: 'Nomme',
        value: this.layerObject.N_of_person_nomme
      }];
// statistique generals
    this.singleGenaral = [{
      name: 'Nombre de collectivités inclus',
      value: this.layerObject.levels_count
    },
      {
        name: 'Nombre d’élus locaux ',
        value: this.layerObject.N_of_person_elu
      },
      {
        name: 'Nombre de ministères ',
        value: this.layerObject.N_de_Ministres
      },
      {
        name: 'Nombre de partenaires',
        value: this.layerObject.N_de_Ministres
      },
      {
        name: 'Nombres d’associations Nationales',
        value: this.layerObject.N_de_Ministres
      }
    ]

    // Niveau acadimique
    this.singleNiveau = [{
      name: 'bac+8',
      value: this.layerObject.N_academic.bac_8
    },
      {
        name: 'bac+5',
        value: this.layerObject.N_academic.bac_5
      },
      {
        name: 'bac+3',
        value: this.layerObject.N_academic.bac_3
      },
      {
        name: 'bac+2',
        value: this.layerObject.N_academic.bac_2
      },
      {
        name: 'sans bac',
        value: this.layerObject.N_academic.sans_bac
      }]
//Collectivites locales 
    this.singleCollectivites = [{
      name: 'Population ',
      value: '97245252 Hbt'
    },
      {
        name: 'Superficie ',
        value: '54534533 Ha'
      },
      {
        name: 'Nombre de conseillers communaux ',
        value: 30
      },
      {
        name: 'Nombre de collectivités avec Maire élu ',
        value: 20
      },
      {
        name: 'Finances (Budget) ',
        value: '4564563 dh'
      },
      {
        name: 'Pourcentage Par outils de communication développés ',
        value: 10
      }]
  }

  ngOnInit() {

    this._regionsService.getRegions().subscribe(
      (regionsApi: any) => {
        this.regions = regionsApi.data;
        this.singlePOP = this.getPopulationData(this.regions);
        // this.singleParite = this.getParite(this.region);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getParite(country) {

  }

  getPopulationData(regions) {
    const population = [];
    regions.forEach(region => {
      const pop = {name: region.name, value: region.population};
      population.push(pop);
    });
    return population;
  }


  onMouseOver(id) {
    this.tabHover = id;
  }


}

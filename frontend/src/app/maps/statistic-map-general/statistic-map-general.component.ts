import { LevelService } from './../../services/level.service';
import { ModalSelectCountryComponent } from './../../shared/modal-select-country/modal-select-country.component';
import { CountryService } from './../../services/country.service';

import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MapService } from '../map.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import * as L from 'leaflet';


@Component({
  selector: 'app-statistic-map-general',
  templateUrl: './statistic-map-general.component.html',
  styleUrls: ['./statistic-map-general.component.css']
})
export class StatisticMapGeneralComponent implements OnInit, OnChanges {
  @Input() countriesInput: any;

  countries: any;
  levels = [];
  geoJsonLayer = null;
  geojsonLevelLayer = null;
  geoJsonLevel = null;
  map = null;
  info = null;
  bsModalRef: BsModalRef;
  geojsonCountries = null;
  countriesLayer = null;

  constructor(
    private _mapService: MapService,
    private _modalService: BsModalService,
    private _countriesService: CountryService,
    private _levelsService: LevelService) { }



  ngOnChanges(changes: SimpleChanges): void {


  }
  ngOnInit() {
    this.map = this._mapService.initMap('map', 4, 'white');
    this.getCountries();




  }




  getCountries() {
    this._countriesService.getCountries().subscribe(
      (countriesApi: any) => {
        this.countries = countriesApi.data;
        console.log(this.countries);

        this.addCountriesLayer();
      },
      (error) => { console.log(error); }
    );
  }

  getLevels(country_id, level_id = null) {
    this._levelsService.getLevels(country_id, level_id).subscribe(
      (levelsApi: any) => {
        this.levels = levelsApi.data;
        console.log(this.levels);
      },
      error => { console.log(error); }
    );
  }



  addCountriesLayer() {
    const styleRegion = this._mapService.styleRegion;
    const styleHover = this._mapService.styleHover;


    this.geojsonCountries = this._mapService.formatGeoJsonFeatures(this.countries);

    this.countries.forEach(element => {
      this.geoJsonLevel = this._mapService.formatGeoJsonFeatures(element.levels);
      this.geojsonLevelLayer = L.geoJSON(this.geoJsonLevel);
      this.geojsonLevelLayer.addTo(this.map);
    });
    this.geoJsonLayer = L.geoJSON(this.geojsonCountries, {
      style: styleRegion,
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(feature.properties.name);
        layer.on({

          click: e => {
            const layer2 = e.target;
            this.map.setMaxZoom(8);
            this.map.fitBounds(e.target.getBounds());

            layer2.bringToFront();
            layer2.setStyle({
              weight: 5,
              color: '#1ab394',
              dashArray: '',
              fillOpacity: 0.7
            });
            info.update(layer2.feature.properties);

            this.geojsonLevelLayer.bringToFront();



          },
          mouseover: e => {
            // tslint:disable-next-line:no-shadowed-variable
            const layer = e.target;

            layer.openTooltip();
            layer.setStyle(styleHover(layer.feature));
            info.update(layer.feature.properties);

          },
          mouseout: e => {
            // tslint:disable-next-line:no-shadowed-variable
            const layer = e.target;
            layer.setStyle(styleRegion(layer.feature));
            // this.geojsonLevelLayer.removeFrom(this.map);
          }
        });
      }
    }).addTo(this.map);
    // create info
    const info = this.createInfoDiv();

    this.getInfoDiv(info);
    this.updateInfo(info);
    info.addTo(this.map);

    const legend = this.createLegendDiv();

    this.getLegendRegionDiv(legend);
    this.updateLegendRegion(legend);
    legend.addTo(this.map);


    this.map.fitBounds(this.geoJsonLayer.getBounds());
  }
  createLegendDiv() {
    return new (L.Control.extend({
      options: { position: 'bottomleft' },
    }))();
  }
  createInfoDiv() {
    return new (L.Control.extend({
      options: { position: 'bottomright' },
    })
    )();
  }

  updateInfo(info) {
    info.update = function (props) {
      this._div.innerHTML =
        '<div class="col-lg-12">' +
        '<div class="widget style1 bg-muted">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<span>Local Government :  </span>' +
        (props
          ? '</br><b>' +
          props.region +
          '</b><br/>' +
          props.name +
          '   <sup></sup>' +
          '</br><b>' +
          props.adm1 +
          ' Level 1' +
          '</b><br/>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'
          : ' ');
    };
  }
  getInfoDiv(info) {
    return info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };
  }

  getLegendRegionDiv(legend) {
    return legend.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'ibox'); // create a div with a class "info"
      this.update();
      return this._div;
    };
  }

  updateLegendRegion(legend) {
    legend.update = function (props) {
      this._div.innerHTML =
        '<div class="col-12 ">' +
        '<div class="ibox-content">' +
        '<ul class="category-list" style = "padding: 0" >' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x  " style="color: #66BF5C" > </i>' +
        'Northern Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #00B9EE" > </i>' +
        'Easthern Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #FFC846" > </i>' +
        'Western Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #BD0026" > </i>' +
        'Middle Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #F663A4" > </i>' +
        'Southern Africa' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>';





    };
  }



  addLevelsLayer(country_id) {
    const styleRegion = this._mapService.styleRegion;
    const styleHover = this._mapService.styleHover;
    this._levelsService.getLevels(country_id).subscribe(
      (levelsApi: any) => {
        this.levels = levelsApi.data;
        // this.geoJsonLayer.removeFrom(this.map);
        this.geoJsonLevel = this._mapService.formatGeoJsonFeatures(this.levels);
        console.log(this.geoJsonLevel);
        this.geojsonLevelLayer = L.geoJSON(this.geoJsonLevel, {
          // style: styleHover,


        }).addTo(this.map);
      },
      error => { console.log(error); }
    );


    // this.levels.forEach(element => {
    //   this.geoJsonLevel = this._mapService.formatGeoJson(element.shape);
    //   var route1Layer = L.geoJSON(this.geoJsonLevel);
    //   group.addLayer(route1Layer);
    // });
    // group.addTo(this.map);
  }

  selectByContryModal() {

    this.openModalSelect();
  }
  openModalSelect() {

    const initialState = {
      title: 'select Country',
      countries: this.countries
    };

    this.bsModalRef = this._modalService.show(ModalSelectCountryComponent, {
      initialState,
      class: 'modal-lg'
    });
  }

}

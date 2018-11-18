import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { MapService } from '../map.service';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as L from 'leaflet';

import { _ } from 'underscore';
import { isUndefined } from 'util';
import { style } from '@angular/animations';

@Component({
  selector: 'app-upload-map',
  templateUrl: './upload-map.component.html',
  styleUrls: ['./upload-map.component.css']
})
export class UploadMapComponent implements OnInit, OnChanges {
  // le fichier geoJsonInput charger
  @Input() geoJsonInput: any;

  // variable map pour instancier la carte
  map = null;
  mapId = null;
  // la couche geoson
  geoJsonLayer: any = null;
  countriesList = [];

  // ibox params
  title = 'No GeoJson file uploaded';
  hideBody = true;
  hideTitle = false;
  hideFooter = true;
  oneAtATime = true;
  countryHover = null;
  constructor(
    private _mapService: MapService,
    private _http: HttpClient,
    private _modalService: BsModalService
  ) { }

  ngOnInit() {

    this.map = this._mapService.initMap('map', 4);

    // initialiser la carte et la mettre dans un variable map

  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.geoJsonInput !== null) {
      const change = changes['geoJsonInput'];

      if (change.currentValue !== change.previousValue) {
        this.countriesList = this.geoJsonInput.features;

        if (this.geoJsonLayer !== null) {
          this.geoJsonLayer.removeFrom(this.map);
        }
        const styleDefault = this._mapService.styleUploadCountries;
        const styleHover = this._mapService.styleHover;

        this.geoJsonLayer = L.geoJSON(this.geoJsonInput, {
          style: styleDefault,
          onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
            layer.on({
              mouseover: e => {
                // tslint:disable-next-line:no-shadowed-variable
                const layer = e.target;
                layer.openPopup();
                layer.setStyle(styleHover(layer.feature));
              },
              mouseout: e => {
                // tslint:disable-next-line:no-shadowed-variable
                const layer = e.target;
                layer.setStyle(styleDefault(layer.feature));
              }
            });
          }
        });
        // console.log(this.geoJsonLayer);
        this.geoJsonLayer.addTo(this.map);
        this.map.fitBounds(this.geoJsonLayer.getBounds());
        const countriesCount = this.countriesList.length;
        this.title =
          countriesCount === 0
            ? 'No Country in this file !'
            : countriesCount === 1
              ? countriesCount + ' Country'
              : countriesCount + ' Countries';

        this.hideBody = false;
      }
    } else {
      this.geoJsonLayer.removeFrom(this.map);
      this.countriesList = null;
      this.title = 'No GeoJson file uploaded';
    }
  }

  omMouseEnterRegion(region) {
    this.geoJsonLayer.eachLayer(layer => {
      if (layer.feature.properties.subregion === region) {
        layer.bringToFront();
        layer.setStyle({
          fillColor: '#00b594',
          fillOpacity: 1
        });
      }
    });
  }

  onMouseLeaveRegion(region) {
    const style = this._mapService.styleRegion;
    this.geoJsonLayer.eachLayer(function (layer) {
      layer.setStyle(style(layer.feature));
    });
  }

  omMouseEnterCountry(country, i) {
    this.geoJsonLayer.eachLayer(layer => {
      if (layer.feature.properties.name === country) {
        // this.map.flyToBounds(layer.getBounds(), { animate: true, duration: 3 });

        layer.bringToFront();
        layer.setStyle({
          weight: 5,
          color: '#217ca3',
          dashArray: '',
          fillColor: '#217ca3',
          fillOpacity: 0.7
        });
      }
    });
    this.countryHover = i;
  }

  onMouseLeaveCountry(country) {
    const style = this._mapService.styleUploadCountries;
    this.geoJsonLayer.eachLayer(function (layer) {
      layer.setStyle(style(layer.feature));
    });
    this.countryHover = false;
  }
}

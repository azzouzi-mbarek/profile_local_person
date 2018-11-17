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
import '../../../vendor/leaflet/label/leaflet.label.js';
import { _ } from 'underscore';
import { isUndefined } from 'util';

@Component({
  selector: 'app-africa-map',
  templateUrl: './africa-map.component.html',
  styleUrls: ['./africa-map.component.css']
})
export class AfricaMapComponent implements OnInit, OnChanges {
  // le fichier geojson charger
  @Input()
  geojson: any;

  // variable map pour instancier la carte
  map: any;
  // la couche geoson
  geoJsonLayer: any = null;
  countriesList = [];
  regionsList = [];
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
    // initialiser la carte et la mettre dans un variable map
    this.map = this._mapService.initMap('map', 4, 'white');
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['geojson'];
    if (change.currentValue !== change.previousValue) {
      this.countriesList = this.geojson.features;

      const regionListGrouped = _.groupBy(this.countriesList, function (
        country
      ) {
        return country.properties.subregion;
      });
      this.regionsList = regionListGrouped;

      if (this.geoJsonLayer !== null) {
        this.geoJsonLayer.removeFrom(this.map);
      }

      this.geoJsonLayer = L.geoJSON(this.geojson, {
        style: this._mapService.styleRegion
      });

      this.geoJsonLayer.addTo(this.map);

      this.title =
        'Africa : ' +
        Object.keys(this.regionsList).length +
        ' Regions' +
        ' / ' +
        this.countriesList.length +
        ' countries';

      this.hideBody = false;
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
      if (isUndefined(layer.feature.properties.name)) {
      } else if (layer.feature.properties.name === country) {
        this.map.flyToBounds(layer.getBounds(), { animate: true, duration: 3 });

        layer.bringToFront();
        layer.setStyle({
          fillColor: '#15ff',
          fillOpacity: 1
        });
      }
    });
    this.countryHover = i;
  }

  onMouseLeaveCountry(country) {
    const style = this._mapService.styleRegion;
    this.geoJsonLayer.eachLayer(function (layer) {
      layer.setStyle(style(layer.feature));
    });
    this.countryHover = false;
  }
  onMouseLeaveForBounds() {
    this.map.fitBounds();
  }
}

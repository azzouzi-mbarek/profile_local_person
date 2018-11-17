
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MapService } from '../map.service';

import * as L from 'leaflet';
@Component({
  selector: 'app-country-map',
  templateUrl: './country-map.component.html',
  styleUrls: ['./country-map.component.css']
})
export class CountryMapComponent implements OnInit, OnChanges {
  @Input() country: any;

  map = null;
  mapId = null;

  countryLayer = null;

  geojson = null;
  @ViewChild('mapDiv') mapContainer;

  constructor(private _mapService: MapService) { }

  ngOnChanges() {

    this.mapId = this.country.properties.iso_a3;
    this.map = this._mapService.initMap(this.mapContainer.nativeElement, 4);
    this.addCountryLayer();

  }

  ngOnInit() {

  }

  addCountryLayer() {

    this.countryLayer = L.geoJSON(this.country, {
      style: this._mapService.styleUploadCountries
    }).addTo(this.map);
    this.map.fitBounds(this.countryLayer.getBounds());
  }


}

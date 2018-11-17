import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MapService } from '../map.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-maps-levels',
  templateUrl: './maps-levels.component.html',
  styleUrls: ['./maps-levels.component.css']
})
export class MapsLevelsComponent implements OnInit, OnChanges {
  @Input() level: any;

  map = null;
  mapId = null;

  levelLayer = null;
  geojson = null;
  @ViewChild('mapDiv') mapContainer;

  constructor(private _mapService: MapService) { }

  ngOnChanges() {
    this.mapId = this.level.id;
    this.map = this._mapService.initMap(this.mapContainer.nativeElement, 4);
    this.addCountryLayer();

  }

  addCountryLayer() {
    this.geojson = this._mapService.formatGeoJson(this.level.shape);

    this.levelLayer = L.geoJSON(this.geojson, {
      style: this._mapService.styleUploadCountries
    }).addTo(this.map);
    this.map.fitBounds(this.levelLayer.getBounds());
  }

  ngOnInit() {
  }

}

import { Level } from './../../models/level.model';
import { LevelService } from 'src/app/services/level.service';
import { MapService } from './../map.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-level-map',
  templateUrl: './level-map.component.html',
  styleUrls: ['./level-map.component.css']
})
export class LevelMapComponent implements OnInit, OnChanges {

  @Input() levelInput: any;
  @Input() levelHoverName: any;
  levels = [];
  levelLayer = null;
  levelsLayer = null;

  map = null;
  constructor(private _mapService: MapService, private _levelService: LevelService) { }

  ngOnChanges(changes: SimpleChanges): void {

    // console.log(this.levelHoverId);
    const change = changes['levelHoverName'];
    if (change.currentValue !== change.previousValue) {

      this.levelsLayer.eachLayer(layer => {
        if (layer.feature.properties.name !== change.previousValue) {
          layer.setStyle({
            fillColor: '#00b594',
            weight: 2,
            opacity: 0.8,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.5
          });
        }
        if (layer.feature.properties.name === this.levelHoverName) {

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


    }

  }

  ngOnInit() {
    this.map = this._mapService.initMap('map', 4);
    this.addlevelLayer();
    this._levelService.getLevels(this.levelInput.properties.country_id, this.levelInput.properties.id).subscribe(
      (levelApi: any) => {
        this.levels = levelApi.data;
        if (this.levels.length > 0) {
          this.levelsLayer = L.geoJSON(levelApi.data, {
            style: this._mapService.styleUploadCountries
          }).addTo(this.map);
          this.map.fitBounds(this.levelsLayer.getBounds());


        }

      },
      (error) => { console.log(error); }
    );



  }
  addlevelLayer() {

    this.levelLayer = L.geoJSON(this.levelInput, {
      style: this._mapService.styleUploadCountries
    }).addTo(this.map);
    this.map.fitBounds(this.levelLayer.getBounds());
  }


}

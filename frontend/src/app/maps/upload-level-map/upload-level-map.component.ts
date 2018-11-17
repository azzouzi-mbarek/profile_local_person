import { MapService } from './../map.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import * as L from 'leaflet';
import { utf8Encode } from '@angular/compiler/src/util';
@Component({
  selector: 'app-upload-level-map',
  templateUrl: './upload-level-map.component.html',
  styleUrls: ['./upload-level-map.component.css']
})
export class UploadLevelMapComponent implements OnInit, OnChanges {
  @Input()
  geoJsonInput: any;
  title = 'Levels 1 ';
  levelList = [];

  map = null;
  geoJsonLayer: any = null;
  levelHover = null;
  constructor(private _mapService: MapService) { }

  ngOnInit() {
    this.map = this._mapService.initMap('map', 4);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.geoJsonInput !== null) {
      const change = changes['geoJsonInput'];

      if (change.currentValue !== change.previousValue) {
        this.levelList = this.geoJsonInput.features;

        if (this.geoJsonLayer !== null) {
          this.geoJsonLayer.removeFrom(this.map);
        }
        const styleDefault = this._mapService.styleUploadCountries;
        const styleHover = this._mapService.styleHover;

        this.geoJsonLayer = L.geoJSON(this.geoJsonInput, {
          style: styleDefault,
          onEachFeature: function (feature, layer) {
            layer.bindTooltip(feature.properties.ADM1);
            layer.on({
              mouseover: e => {
                const layer = e.target;
                layer.openTooltip();
                layer.setStyle(styleHover(layer.feature));
              },
              mouseout: e => {
                const layer = e.target;
                layer.setStyle(styleDefault(layer.feature));
              }
            });
          }
        });

        this.geoJsonLayer.addTo(this.map);
        this.map.fitBounds(this.geoJsonLayer.getBounds());
        const countriesCount = this.levelList.length;
        this.title =
          countriesCount === 0
            ? 'No Country in this file !'
            : countriesCount === 1
              ? countriesCount + ' Level'
              : countriesCount + ' Levels';

        // this.hideBody = false;
      }
    } else {
      this.geoJsonLayer.removeFrom(this.map);
      this.levelList = null;
      this.title = 'No GeoJson file uploaded';
    }
  }





  omMouseEnterLevel(level, i) {
    this.geoJsonLayer.eachLayer(layer => {
      if (layer.feature.properties.ADM1 === level) {
        // this.map.flyToBounds(layer.getBounds(), { animate: true, duration: 3 });
        layer.openTooltip();
        layer.bringToFront();

        layer.setStyle({
          weight: 5,
          color: '#00b9ee',
          dashArray: '',
          fillColor: '#00b9ee',
          fillOpacity: 1
        });
      }
    });
    this.levelHover = i;
  }

  onMouseLeaveLevel(level) {
    const style = this._mapService.styleUploadCountries;
    this.geoJsonLayer.eachLayer(function (layer) {
      layer.closeTooltip();
      layer.setStyle(style(layer.feature));
    });
    this.levelHover = false;
  }
}

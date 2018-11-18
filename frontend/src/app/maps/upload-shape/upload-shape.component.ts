import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { MapService } from '../map.service';
import * as L from 'leaflet';
@Component({
  selector: 'app-upload-shape',
  templateUrl: './upload-shape.component.html',
  styleUrls: ['./upload-shape.component.css']
})
export class UploadShapeComponent implements OnInit, OnChanges {
  map = null;
  @Input()
  geoJsonInput: any;
  geoJsonLayer: any = null;
  constructor(private _mapService: MapService) { }

  ngOnInit() {
    this.map = this._mapService.initMap('map', 1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.geoJsonInput !== null) {
      const change = changes['geoJsonInput'];
      if (change.currentValue !== change.previousValue) {
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
                const layer = e.target;
                layer.openPopup();
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
      }
    } else {
      this.geoJsonLayer.removeFrom(this.map);
    }
  }
}

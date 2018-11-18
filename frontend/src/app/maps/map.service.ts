import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

import * as L from 'leaflet';
import * as geojsonArea from '@mapbox/geojson-area';



@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _latitude = 34.03155;
  private _longitude = -6.03155;
  private _zoom = 1;

  public iconBlue = L.icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });
  // tslint:disable-next-line:max-line-length

  googleSrc = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';



  // imageryLayer = L.tileLayer(this.mapBoxUrl);


  // OSMLayer = L.tileLayer(this.osmUrl);

  public africaMapBounds = L.latLngBounds([[36, -21.6], [-33.3, 53]]);

  getGeo() {
    this._http.get<any>('assets/geojson/afrique.json').subscribe(geojson => {
      return geojson;
      // this.afriqueLayer = geoJSON(geo);
      // this.afriqueLayer = geo.features;
    });
  }

  constructor(private _http: HttpClient) { }

  getLongitude() {
    return this._longitude;
  }
  setLongitude(longitude) {
    return (this._longitude = longitude);
  }

  getLatitude() {
    return this._latitude;
  }

  setLatitude(latitude) {
    this._latitude = latitude;
  }

  getZoom() {
    return this._zoom;
  }

  setZoom(zoom) {
    this._zoom = zoom;
  }

  getJson(): Observable<any> {
    return this._http
      .get(' /assets/geojson/afrique.geojson')
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  initMap(divId: string, zoom: number, mainLayer: string = null) {
    // construction des base Layers
    // tslint:disable-next-line:max-line-length
    const mapBoxUrl = 'https://api.tiles.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiamVtbWxtZWQiLCJhIjoiY2puY2wxMG91MGJ1ajNwc2Z5aHRpaXcwZiJ9.PihyI84-WjzwYTp_WKDf_A';

    const googleMapsUrl = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
    const osmUrl = 'http://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const openTopoUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
    const googleMaps = L.tileLayer(googleMapsUrl);
    const osm = L.tileLayer(osmUrl);
    const topoLayer = L.tileLayer(openTopoUrl);
    const imagery = L.tileLayer(mapBoxUrl);
    // const osm = L.tileLayer(this.osmUrl);
    const white = L.tileLayer('');

    const baseLayers = {
      // Satellite: googleMaps,
      Blank: white,
      'Topo Maps': topoLayer
    };
    // creation de la carte avec layer de base + zoom minimum sur afrique de 4
    const map = L.map(divId, {
      layers: [mainLayer === 'white' ? white : topoLayer],

      zoomDelta: 0.5,
      zoomSnap: 0.25
      // maxBounds: this.africaMapBounds,
      // maxBoundsViscosity: 0.5
    });
    // fit bount to africa
    // map.fitBounds(this.africaMapBounds);
    // ajouter des layers
    L.control.layers(baseLayers).addTo(map);

    return map;
  }

  styleRegion(feature) {

    const d: String = feature.properties.region;
    return {

      fillColor: (function () {
        return d.toLowerCase() === 'western africa'
          ? '#125f75'
          : d.toLowerCase() === 'northern africa'
            ? '#1995ad'
            : d.toLowerCase() === 'middle africa'
              ? '#a1d6e2'
              : d.toLowerCase() === 'eastern africa'
                ? '#bcbabe'
                : d.toLowerCase() === 'southern africa'
                  ? '#dddddd'
                  : '#dddddd';
      })(),
      weight: 2,
      opacity: 0.5,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }
  getSurface(obj) {
    return geojsonArea.geometry(obj) / 1000000;

  }
  styleUploadCountries(feature) {
    return {
      fillColor: '#00b594',
      weight: 2,
      opacity: 0.8,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5
    };
  }


  styleHide() {

    return {
      fillColor: '#e0e0e2',
      fillOpacity: 0.2,
      color: '#666a6c',
      weight: 2,
      opacity: 0.3,
      dashArray: '3',
    };
  }

  styleLevels(feature) {

    return {
      color: 'white',
      weight: 2,
      opacity: 0.8,
      fillColor: '#00b594',
      fillOpacity: 0.2,
      dashArray: '3',
    };
  }

  styleHover(feature) {
    return {
      weight: 3,
      fillColor: '#00b594',
      fillOpacity: 1
    };
  }

  formatGeoJson(geometry) {
    return {
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'polygone'
          },
          geometry: geometry
        }
      ]
    };
  }


  formatGeoJsonFeatures(features) {
    const json = { features: [] };

    features.forEach(element => {
      const obj = {
        type: 'Feature',
        properties: {
          id: element.id,
          name: element.name,
          region: element.region,
          adm1: element.levels_1
        },
        geometry: element.shape
      };
      json.features.push(obj);
    });

    return json;

  }


  // div info and legend

  createDiv(position: string) {
    return new (L.Control.extend({
      options: { position: position },
    })
    )();
  }

  getDiv(div) {
    return div.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'ibox'); // create a div with a class "info"
      this.update();
      return this._div;
    };
  }

  // region div legend

  updatePanelLevel(legend) {
    legend.update = function (props) {
      this._div.innerHTML =
        '<div class="col-12 ">' +
        '<div class="ibox-content">' +
        'panel' +
        '</div>' +
        '</div>';





    };
  }

  updateLegendRegion(legend) {
    legend.update = function (props) {
      this._div.innerHTML =
        '<div class="col-12 ">' +
        '<div class="ibox-content">' +
        '<ul class="category-list" style = "padding: 0" >' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x  " style="color: #1995ad" > </i>' +
        'Northern Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #bcbabe" > </i>' +
        'Easthern Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #125f75" > </i>' +
        'Western Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #a1d6e2" > </i>' +
        'Middle Africa' +
        '</li>' +
        '<li class="d-flex align-items-center" >' +
        '<i class=" fas fa-stop fa-2x " style="color: #dddddd" > </i>' +
        'Southern Africa' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>';





    };
  }

}

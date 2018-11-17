import { ModalSelectCountryComponent } from './../../shared/modal-select-country/modal-select-country.component';
import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

import { HttpClient } from '@angular/common/http';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import * as L from 'leaflet';
import { Country } from '../../models/country.model';


@Component({
  selector: 'app-landing-map',
  templateUrl: './landing-map.component.html',
  styleUrls: ['./landing-map.component.css']
})
export class LandingMapComponent implements OnInit {
  bsModalRef: BsModalRef;


  latitude = null;
  longitude = null;
  zoom = null;
  osm = 'OSM';
  // topo = 'topo';
  marker = 'Marker';
  positionZoom = 10;
  afriqueLayer: null;
  map = null;
  color = null;

  public country = new Country();
  public countriesList;
  constructor(
    private mapService: MapService,
    private _http: HttpClient,
    private _modalService: BsModalService
  ) {
    this.map = this.mapService;
  }

  selectByContryModal() {
    this.openModalSelect();
  }

  openModalSelect() {
    const initialState = {
      title: 'select Country',
      countries: this.countriesList
    };

    this.bsModalRef = this._modalService.show(ModalSelectCountryComponent, {
      initialState,
      class: 'modal-lg'
    });
  }

  ngOnInit() {
    this.createMap();
  }

  stylePopulation(feature) {
    const d = feature.properties.pop_est;
    return {
      // fillColor: this.mapService.getColor(feature.properties.density),
      fillColor: (function () {
        return d > 100000000
          ? '#800026'
          : d > 90000000
            ? '#FFC720'
            : d > 80000000
              ? '#BD0026'
              : d > 70000000
                ? '#FF803E'
                : d > 60000000
                  ? '#E31A1C'
                  : d > 40000000
                    ? '#FC4E2A'
                    : d > 20000000
                      ? '#FD8D3C'
                      : d > 15000000
                        ? '#FCFFCD'
                        : d > 2000000
                          ? '#FEB24C'
                          : //         d > 100000000 ? '#FED976' :
                          '#FFEDA0';
      })(),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  styleRegion(feature) {
    const d: String = feature.properties.subregion;

    return {
      // fillColor: this.mapService.getColor(feature.properties.density),
      fillColor: (function () {
        return d.toLowerCase() === 'western africa'
          ? '#800026'
          : d.toLowerCase() === 'northern africa'
            ? '#FFC720'
            : d.toLowerCase() === 'middle africa'
              ? '#BD0026'
              : d.toLowerCase() === 'eastern africa'
                ? '#FF803E'
                : d.toLowerCase() === 'southern africa'
                  ? '#E31A1C'
                  : '#FFEDA0';
      })(),
      weight: 2,
      opacity: 0.5,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  createMap() {
    const cities = L.layerGroup();
    // const info = L.control();



    L.marker([this.map.getLatitude(), this.map.getLongitude()])
      .bindPopup('This is Littleton, CO.')
      .addTo(cities);

    const overlays = {
      Cities: cities
    };

    // tslint:disable-next-line:max-line-length
    const mbUrl =
      // tslint:disable-next-line:max-line-length
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    // const grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light' });
    // const streets = L.tileLayer(mbUrl, { id: 'mapbox.streets' });
    const OSMLayer = L.tileLayer(osmUrl);

    const baseLayers = {
      // Grayscale: grayscale,
      // 'Streets  ': streets,
      'OSM      ': OSMLayer
    };

    const afriqueMap = L.map('frugalmap', {
      // layers: [grayscale, cities]
    }).setView([this.map.getLatitude(), this.map.getLongitude()], 5);

    L.control.layers(baseLayers, overlays).addTo(afriqueMap);

    this._http.get<any>('assets/geojson/afrique.json').subscribe(geojson => {
      this.countriesList = geojson.features;

      const geojsonL = L.geoJSON(geojson, {
        // style: this.stylePopulation,
        style: this.styleRegion,
        onEachFeature: function (feature, layer: any) {
          layer.on({
            click: function (e) {
              afriqueMap.fitBounds(e.target.getBounds());
              const layer2 = e.target;
              layer2.bringToFront();
              layer2.setStyle({
                weight: 5,
                color: '#1ab394',
                dashArray: '',
                fillOpacity: 0.7
              });
              info.update(layer.feature.properties);
            },

            mouseover: function (e) {
              const layer2 = e.target;
              layer2.bringToFront();
              layer2.setStyle({
                weight: 5,
                color: '#1ab394',
                dashArray: '',
                fillOpacity: 0.7
              });
              info.update(layer.feature.properties);
            },
            mouseout: function (e) {
              geojsonL.resetStyle(e.target);
              info.update();
            }
          });
        }
      }).addTo(afriqueMap);

      geojsonL.eachLayer(function (layer: any) {
        layer.bindPopup(layer.feature.properties.name);
      });

      afriqueMap.fitBounds(geojsonL.getBounds());
      afriqueMap.setMaxZoom(10);
    });

    const info = new (L.Control.extend({
      options: { position: 'topright' }
    }))();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML =
        '<div class="col-lg-12">' +
        '<div class="widget style1 navy-bg">' +
        '<div class="row">' +
        '<div class="col-12">' +
        '<span>Population   </span>' +
        (props
          ? '</br><b>' +
          props.name +
          '</b><br/>' +
          props.subregion +
          ' people  <sup></sup>' +
          '</br><b>' +
          props.lastcensus +
          '</b><br/>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>'
          : ' ');

      // this._div.innerHTML = '<h4>US Population Density</h4>' + (props ?
      //   '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
      //   : 'Hover over a state');
    };

    info.addTo(afriqueMap);
  }

  // getCountries() {
  //   this.mapService.getJson().subscribe((data) => {
  //     // this.countriesList = data;
  //
  //   },
  //     error => {
  //       console.log(error);
  //       alert('GEO JSON GET FAILED');
  //     });
  // }
}

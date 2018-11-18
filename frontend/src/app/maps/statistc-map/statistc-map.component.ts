import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Output } from '@angular/core';
import { style } from '@angular/animations';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ModalSelectCountryComponent } from './../../shared/modal-select-country/modal-select-country.component';
import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as L from 'leaflet';
import { LevelService } from 'src/app/services/level.service';
@Component({
  selector: 'app-statistc-map',
  templateUrl: './statistc-map.component.html',
  styleUrls: ['./statistc-map.component.css']
})
export class StatistcMapComponent implements OnInit, OnChanges {
  map = null;
  bsModalRef: BsModalRef;
  countries = [];
  levels = [];
  panel = null;
  countriesLayer = null;
  levelsLayer = null;
  zoomStart = null;
  zoomInit = 4;
  zoomClick = null;
  layerObject = null;

  @Output() messageEvent = new EventEmitter<number>();

  constructor(
    private _mapService: MapService,
    private _modalService: BsModalService,
    private _countryservice: CountryService,
    private _levelsService: LevelService,
    private _router: Router
  ) { }


  sendMessage() {
    this.messageEvent.emit(this.layerObject);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit() {




    // initialiser la map
    this.map = this._mapService.initMap('map', 4, 'white');

    //  get countries
    this._countryservice.getCountries().subscribe(
      (countriesApi: any) => {
        this.countries = countriesApi.data;
        this.addCountriesLayer(countriesApi.data);
        // this.zoomInit = this.map.getZoom();






      },
      (error) => { console.log(error); }
    );
    // console.log('zoom map : ' + this.map.getZoom());
  }





  addCountriesLayer(countriesGeojson) {
    const styleRegion = this._mapService.styleRegion;
    const styleHover = this._mapService.styleHover;

    // this.map.on('zoomstart', () => {
    //   this.zoomStart = this.map.getZoom();
    //   console.log('start ' + this.zoomStart);
    //   if (this.zoomStart < 4) {
    //     this.countriesLayer.setStyle(this._mapService.styleRegion);
    //     legend.addTo(this.map);
    //     this.layerObject = null;
    //     this.sendMessage();
    //     if (this.levelsLayer !== null) {
    //       this.levelsLayer.removeFrom(this.map);
    //     }
    //   }
    //   // else if (this.zoomStart > 4) {
    //   //   this.countriesLayer.setStyle(this._mapService.styleHide);
    //   // }
    // });


    this.countriesLayer = L.geoJSON(countriesGeojson, {
      style: styleRegion,
      onEachFeature: (feature, layer) => {
        layer.bindPopup(feature.properties.name);


        layer.on({
          'click': e => {
            legend.remove();

            if (this.levelsLayer !== null) {
              this.levelsLayer.removeFrom(this.map);
              this.levelsLayer = null;
            }

            const l = e.target;
            this.layerObject = feature.properties;
            this.sendMessage();


            this.map.fitBounds(l.getBounds());
            this.addLevelsLayer(feature.properties.id);


          },
          'dblclick': e => {
            const l = e.target;
          },
          mouseover: e => {
            // tslint:disable-next-line:no-shadowed-variable
            const layer = e.target;
            if (this.levelsLayer === null) {
              layer.openPopup();
            }
            layer.setStyle(styleHover(feature));

          },
          mouseout: e => {
            // tslint:disable-next-line:no-shadowed-variable
            const layer = e.target;
            layer.setStyle(styleRegion(layer.feature));
          }
        });
      }
    });

    // create legend of region
    const legend = this._mapService.createDiv('bottomleft');
    this._mapService.getDiv(legend);
    this._mapService.updateLegendRegion(legend);
    legend.addTo(this.map);


    this.map.fitBounds(this.countriesLayer.getBounds());
    this.countriesLayer.addTo(this.map);

  }

  addLevelsLayer(country_id, level_id = null) {

    const styleLevels = this._mapService.styleLevels;
    const styleUploadCountries = this._mapService.styleUploadCountries;
    const styleHover = this._mapService.styleHover;
    this._levelsService.getLevels(country_id, level_id).subscribe(
      (levelsApi: any) => {
        this.levels = levelsApi;
        // console.log(this.levels);
        this.levelsLayer = L.geoJSON(levelsApi.data, {
          style: styleUploadCountries,
          onEachFeature: (feature, layer) => {
            layer.bindTooltip(feature.properties.name);

            layer.on({
              'click': e => {

                if (this.levelsLayer !== null) {
                  this.levelsLayer.removeFrom(this.map);
                }

                const l = e.target;
                this.map.fitBounds(l.getBounds());
                this.layerObject = feature.properties;
                this.addLevelsLayer(feature.properties.country_id, feature.properties.id);
                this.sendMessage();
              },
              'dblclick': e => {
                const l = e.target;
                const id = e.target.feature.properties.id;
                const country_i = e.target.feature.properties.country_id;

                this._router.navigate(['landing/profile-local-government', id], { queryParams: { c: country_i } });
                // this._router.navigate(['landing/profile-local-government'], id);
                // // legend.remove();
                // // this.map.fitBounds(l.getBounds());
                // this.levelsLayer.removeFrom(this.map);
                // this.addLevelsLayer(feature.properties.country_id, id);
                // this.map.fiBounds(this.levelsLayer.getBounds());

              },
              mouseover: e => {
                // tslint:disable-next-line:no-shadowed-variable
                const layer = e.target;

                layer.openTooltip();
                layer.setStyle(styleHover(layer.feature));
                // info.update(layer.feature.properties);

              },
              mouseout: e => {
                // tslint:disable-next-line:no-shadowed-variable
                const layer = e.target;
                layer.setStyle(styleUploadCountries(layer.feature));
                // this.geojsonLevelLayer.removeFrom(this.map);
              }
            });
          }
        });


        this.levelsLayer.bringToFront();

        this.levelsLayer.addTo(this.map);


      }
    );
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
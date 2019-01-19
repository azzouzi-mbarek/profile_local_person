import { EventEmitter, OnChanges, AfterViewInit, AfterContentInit, ElementRef } from '@angular/core';
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

declare let $: any;


@Component({
  selector: 'app-statistc-map',
  templateUrl: './statistc-map.component.html',
  styleUrls: ['./statistc-map.component.css']
})
export class StatistcMapComponent implements OnInit, AfterContentInit {
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
  level_layers_ids = [];
  lastStage = null;

  @Output() messageEvent = new EventEmitter<number>();

  constructor(
    private _mapService: MapService,
    private _modalService: BsModalService,
    private _countryservice: CountryService,
    private _levelsService: LevelService,
    private _router: Router,
    private el: ElementRef
  ) { }


  sendMessage() {
    this.messageEvent.emit(this.layerObject);
  }


  ngAfterContentInit() {
    $('div').on('click', '.sidebar-open-button', (e) => {
      const id = e.target.getAttribute('data');
      this.gotToLevelDetails(id);

    });
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


  gotToLevelDetails(id) {
    console.log(id);
    this._router.navigate(['landing/profile-local-government', id]);
    // this._router.navigate(['landing/profile-local-government', props.id], { queryParams: { c: props.country_id } });

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
            this.lastStage = feature.properties.last_stage;

            const layers = [];
            this.map.eachLayer(function (layert) {
              if (layert instanceof L.LayerGroup) {
                layers.push(layert);
              }
            });

            layers.forEach(element => {
              this.level_layers_ids.forEach(groupID => {
                if (groupID === element._leaflet_id) {
                  element.removeFrom(this.map);
                }
              });

            });
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
        this.levels = levelsApi.data;

        this.levelsLayer = L.geoJSON(levelsApi.data, {
          style: styleUploadCountries,
          onEachFeature: (feature, layer) => {
            layer.bindPopup(




              '<div class="col-lg-12">  ' +
              '                       <div class="widget lazur-bg text-center ">  ' +

              '                                   <h4>  ' +
              feature.properties.name +
              '                                   </h4>  ' +
              // tslint:disable-next-line:max-line-length
              '<button type="button" class="btn btn-outline btn-default sidebar-open-button" data = "' +
              feature.properties.id +
              '" ' + '>Details</button>' +



              '</div>  ' +

              '</div>  '


              //    feature.properties.name
            );



            layer.on({
              // 'dblclick': (e2) => {

              //   const id = e2.target.feature.properties.id;
              //   const country_i = e2.target.feature.properties.country_id;
              //   const name = e2.target.feature.properties.name;
              //   console.log(name);
              //   this._router.navigate(['landing/profile-local-government', id], { queryParams: { c: country_i } });


              // },
              'click': e1 => {

                if (this.level_layers_ids.length < this.lastStage) {
                  this.levelsLayer.removeFrom(this.map);
                }

                const l1 = e1.target;
                this.map.fitBounds(l1.getBounds());
                this.layerObject = feature.properties;
                // this.addLevelsLayer(feature.properties.country_id, feature.properties.id);
                this.addLevelsLayer(feature.properties.country_id, feature.properties.id);

                // console.log(this.addLevelsLayer(feature.properties.country_id, feature.properties.id));
                this.sendMessage();

              },

              mouseover: e => {
                // tslint:disable-next-line:no-shadowed-variable
                const layer = e.target;

                layer.openPopup();
                layer.setStyle(styleHover(layer.feature));
                // info.update(layer.feature.properties);

              },
              mouseout: e => {
                // tslint:disable-next-line:no-shadowed-variable
                const layer = e.target;
                // layer.closePopup();
                layer.setStyle(styleUploadCountries(layer.feature));
                // this.geojsonLevelLayer.removeFrom(this.map);
              }
            });
          }
        });

        this.levelsLayer.bringToFront();
        if (this.levels.length > 0) {


          this.levelsLayer.addTo(this.map);
          this.level_layers_ids.push(this.levelsLayer._leaflet_id);

        }




      }
    );
  }

  selectByContryModal() {

    // this.openModalSelect();
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




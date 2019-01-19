import { Level } from './../../models/level.model';
import { LevelService } from 'src/app/services/level.service';
import { MapService } from './../map.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
@Component({
  selector: 'app-level-map',
  templateUrl: './level-map.component.html',
  styleUrls: ['./level-map.component.css']
})
export class LevelMapComponent implements OnInit, OnChanges, AfterContentInit {

  @Input() levelInput: any;
  @Input() levelHoverName: any;
  levels = [];
  levelLayer = null;
  levelsLayer = null;
  map = null;

  constructor(private _mapService: MapService, private _levelService: LevelService, private _router: Router) { }

  ngAfterContentInit() {
    $('div').on('click', '.sidebar-open-button', (e) => {
      const id = e.target.getAttribute('data');
      this.gotToLevelDetails(id);

    });
  }

  gotToLevelDetails(id) {


    this._router.navigate(['landing/profile-local-government', id]);
    // this._router.navigate(['landing/profile-local-government', props.id], { queryParams: { c: props.country_id } });

  }

  ngOnChanges(changes: SimpleChanges): void {



    const change = changes['levelHoverName'];


    if (changes['levelInput'] !== undefined) {
      const changeLevelInput = changes['levelInput'];
      if (changeLevelInput.currentValue !== changeLevelInput.previousValue) {
        if (this.levelLayer !== null){
          this.levelLayer.removeFrom(this.map);

        }
        if(this.levelsLayer){
          this.levelsLayer.removeFrom(this.map);
        }

        this.addlevelLayer();
        this.getLevelsLayers();

      }
    }


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
          layer.openPopup();
          layer.setStyle({
            weight: 3,
            fillColor: '#00b594',
            fillOpacity: 1,


          });
        }
      });


    }

  }

  ngOnInit() {




    this.map = this._mapService.initMap('map', 4);


    this.addlevelLayer();

    this.getLevelsLayers();



  }

  getLevelsLayers() {
    const styleLevels = this._mapService.styleLevels;
    const styleUploadCountries = this._mapService.styleUploadCountries;
    const styleHover = this._mapService.styleHover;

    this._levelService.getLevels(this.levelInput.properties.country_id, this.levelInput.properties.id).subscribe(
      (levelApi: any) => {
        this.levels = levelApi.data;

        if (this.levels.length > 0) {
          this.levelsLayer = L.geoJSON(levelApi.data, {
            style: this._mapService.styleUploadCountries,
            onEachFeature: (feature, layer) => {
              layer.bindPopup(
                '<div class="col-lg-12">  ' +
                '<div class="widget lazur-bg text-center ">' +
                '<h4>  ' +
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

                'click': e1 => {

                  // if (this.level_layers_ids.length < this.lastStage) {
                  //   this.levelsLayer.removeFrom(this.map);
                  // }

                  const l1 = e1.target;
                  this.map.fitBounds(l1.getBounds());
                  // this.layerObject = feature.properties;
                  // this.addLevelsLayer(feature.properties.country_id, feature.properties.id);
                  // this.addLevelsLayer(feature.properties.country_id, feature.properties.id);

                  // console.log(this.addLevelsLayer(feature.properties.country_id, feature.properties.id));
                  // this.sendMessage();

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

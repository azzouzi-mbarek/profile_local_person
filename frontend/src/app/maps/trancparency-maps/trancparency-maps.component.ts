import {Component, ElementRef, OnInit, Output, Input, ViewChild, SimpleChanges} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MapService} from "../map.service";
import {CountryService} from "./../../services/country.service";
import {Router} from "@angular/router";
import * as L from "leaflet";
import { EventEmitter } from 'events';
import { LevelService } from 'src/app/services/level.service';
import { IndicatorService } from 'src/app/services/indicator.service';


@Component({
  selector: 'app-trancparency-maps',
  templateUrl: './trancparency-maps.component.html',
  styleUrls: ['./trancparency-maps.component.css']
})
export class TrancparencyMapsComponent implements OnInit {

  @Input() searchResults;

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
  levelLayer = null;

  // @Output() messageEvent = new EventEmitter<number>();

  constructor(
    private _mapService: MapService,
    private _modalService: BsModalService,
    private _countryservice: CountryService,
    private _levelsService: LevelService,
    private _indicatorService:IndicatorService,
    private _router: Router,
    private el: ElementRef
  ) {
  }

  // sendMessage() {
  //   this.messageEvent.emit(this.layerObject);
  // }

  ngOnChanges(changes: SimpleChanges): void {

     console.log('changes',changes);
     this.addlevelLayer();


  }
  addlevelLayer() {

    this.levelLayer = L.geoJSON(this.searchResults, {
      style: this._mapService.styleUploadCountries
    }).addTo(this.map);
  }

  ngOnInit() {
    // initialiser la map
    this.map = this._mapService.initMap('map', 4, 'white');

    //  get countries
    this._countryservice.getCountries().subscribe(
      (countriesApi: any) => {
        this.countries = countriesApi.data;
        this.addCountriesLayer(countriesApi.data);
        this.addlevelLayer();

        // this.zoomInit = this.map.getZoom();


      },
      (error) => {
        console.log(error);
      }
    );
    // console.log('zoom map : ' + this.map.getZoom());
  }

  addCountriesLayer(countriesGeojson) {


    const styleRegion = this._mapService.styletransparency;
    const styleHover = this._mapService.styleHover;

    this.countriesLayer = L.geoJSON(countriesGeojson, {
      style: styleRegion,
      onEachFeature: (feature, layer) => {
        layer.bindPopup(feature.properties.name);


        layer.on({


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
    // const legend = this._mapService.createDiv('bottomleft');
    // this._mapService.getDiv(legend);
    // this._mapService.updateLegendRegion(legend);
    // legend.addTo(this.map);


    this.map.fitBounds(this.countriesLayer.getBounds());
    this.countriesLayer.addTo(this.map);
    console.log('maps output',this.searchResults)


  }

}

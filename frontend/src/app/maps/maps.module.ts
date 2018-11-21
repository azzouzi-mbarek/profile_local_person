import { NgModule, PlatformRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { CollapseModule, AccordionModule } from 'ngx-bootstrap';

import { LandingMapComponent } from './landing-map/landing-map.component';
import { AfricaMapComponent } from './africa-map/africa-map.component';
import { SharedModule } from '../shared/shared.module';
import { UploadMapComponent } from './upload-map/upload-map.component';
import { CountryMapComponent } from './country-map/country-map.component';
import { UploadShapeComponent } from './upload-shape/upload-shape.component';

import { UploadLevelMapComponent } from './upload-level-map/upload-level-map.component';
import { StatisticMapGeneralComponent } from './statistic-map-general/statistic-map-general.component';
import { MapsLevelsComponent } from './maps-levels/maps-levels.component';
import { StatistcMapComponent } from './statistc-map/statistc-map.component';
import { LevelMapComponent } from './level-map/level-map.component';

@NgModule({
  imports: [
    CommonModule,

    HttpClientModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    SharedModule
  ],
  exports: [
    LandingMapComponent,
    UploadMapComponent,
    UploadShapeComponent,
    AfricaMapComponent,
    CountryMapComponent,
    UploadLevelMapComponent,
    StatisticMapGeneralComponent,
    MapsLevelsComponent,
    StatistcMapComponent,
    LevelMapComponent
  ],

  declarations: [
    LandingMapComponent,
    AfricaMapComponent,
    UploadMapComponent,
    CountryMapComponent,
    UploadShapeComponent,
    UploadLevelMapComponent,
    StatisticMapGeneralComponent,
    MapsLevelsComponent,
    StatistcMapComponent,
    LevelMapComponent
  ]
})
export class MapsModule { }

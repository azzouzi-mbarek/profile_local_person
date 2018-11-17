import { AddLevelByFileComponent } from './level/add-level-by-file/add-level-by-file.component';
import { CountryDetailsComponent } from './country/country-details/country-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AfterLoginService } from '../services/after-login.service';

import { RegionComponent } from './region/region.component';
import { DetailsRegionComponent } from './region/details-region/details-region.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { TabsComponent } from './tabs/tabs.component';
import { CountryComponent } from './country/country.component';
import { UploadShapeComponent } from '../maps/upload-shape/upload-shape.component';
import { FormCountryComponent } from './country/form-country/form-country.component';
import { MapsLevelsComponent } from '../maps/maps-levels/maps-levels.component';
import { LevelComponent } from './level/level.component';
import { LeveldetailsComponent } from './level/leveldetails/leveldetails.component';

const routes: Routes = [
  {
    path: 'administrateur',
    component: AdminComponent,
    canActivate: [AfterLoginService],
    children: [

      { path: 'shape', component: UploadShapeComponent },


      { path: 'regions', component: RegionComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'regions/:id', component: DetailsRegionComponent },
      { path: 'countries', component: CountryComponent },
      { path: 'addCountries', component: AddCountryComponent },
      { path: 'countries/:id', component: CountryDetailsComponent },
      { path: 'formCountry/:id', component: FormCountryComponent },
      { path: 'addLevelByFile/:id/:level', component: AddLevelByFileComponent },
      { path: 'levels/:id/:level', component: LevelComponent },
      { path: 'levels/:id/:level/:id_level', component: LeveldetailsComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
  CountryComponent;
}

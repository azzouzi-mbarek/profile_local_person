import { AcademicLevelComponent } from './person/academic-level/academic-level.component';
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
import { CountryListResolverService } from '../resolvers/country-resolver.service';
import { PersonComponent } from './person/person.component';
import { CategoryLevelComponent } from './level/category-level/category-level.component';
import { PopulationComponent } from './level/population/population.component';
import { LegalFrameworkComponent } from './level/legal-framework/legal-framework.component';
import { CommunicationToolsComponent } from './level/communication-tools/communication-tools.component';
import { EvenementsComponent } from './level/evenements/evenements.component';
import { ProgrammesComponent } from './level/programmes/programmes.component';
import { FinancesComponent } from './level/finances/finances.component';

const routes: Routes = [
  {
    path: 'administrateur',
    component: AdminComponent,
    canActivate: [AfterLoginService],
    children: [
      // { path: 'countries', component: CountryComponent, resolve: { countriesList: CountryListResolverService } },
      { path: 'countries', component: CountryComponent },
      { path: 'countries/:id', component: CountryDetailsComponent },
      { path: 'countries/:id/levels', component: LevelComponent },
      { path: 'countries/:id/levels/:l_id', component: LeveldetailsComponent },
      { path: 'countries/:id/levels/:l_id/levels', component: LevelComponent },
      { path: 'category_level', component: CategoryLevelComponent },
      { path: 'persons', component: PersonComponent },
      { path: 'academic_level', component: AcademicLevelComponent },
      { path: 'population', component: PopulationComponent },
      { path: 'legal_framework', component: LegalFrameworkComponent },
      { path: 'communication_tool', component: CommunicationToolsComponent },
      { path: 'evenement', component: EvenementsComponent },
      { path: 'programme', component: ProgrammesComponent },
      { path: 'finance', component: FinancesComponent },







      // { path: 'levels/:id/:level', component: LevelComponent },

      { path: 'shape', component: UploadShapeComponent },


      { path: 'regions', component: RegionComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'regions/:id', component: DetailsRegionComponent },
      { path: 'addCountries', component: AddCountryComponent },
      { path: 'formCountry/:id', component: FormCountryComponent },
      { path: 'addLevelByFile/:id/:level', component: AddLevelByFileComponent },
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

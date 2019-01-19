import { CountryStatisticComponent } from './statistic/country-statistic/country-statistic.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { StatisticComponent } from './statistic/statistic.component';
import { HomeComponent } from './home/home.component';
import { DirectoryComponent } from './directory/directory.component';
import { TransparencyComponent } from './transparency/transparency.component';
import { ProfilPersonComponent } from './profil-person/profil-person.component';
import { ProfileLocalComponent } from './profile-local/profile-local.component';
import { LocalGovernmentComponent } from './statistic/local-government/local-government.component';
import { LocalyElectedComponent } from './statistic/localy-elected/localy-elected.component';
import { GeneralStatisticsComponent } from './statistic/general-statistics/general-statistics.component';
import { DevelopmentPartnersComponent } from './statistic/development-partners/development-partners.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ModifProfileComponent } from './profile-user/modif-profile/modif-profile.component';

const landingRoutes: Routes = [
  {
    path: 'landing', component: LandingComponent,
    children: [
      { path: 'statistic', component: StatisticComponent },
      { path: 'statistic/country/:id', component: CountryStatisticComponent },
      { path: 'local-government', component: LocalGovernmentComponent },
      { path: 'localy-elected', component: LocalyElectedComponent },
      { path: 'general-statistics', component: GeneralStatisticsComponent },
      { path: 'development-partners', component: DevelopmentPartnersComponent },
      { path: 'home', component: HomeComponent },
      { path: 'directory', component: DirectoryComponent },
      { path: 'profile-local-government/:id', component: ProfileLocalComponent },
      { path: 'profile-person/:id', component: ProfilPersonComponent },
      { path: 'transparency', component: TransparencyComponent },
      { path: 'profile-user', component: ProfileUserComponent },
      {path: 'modifprofile', component: ModifProfileComponent}


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(landingRoutes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}

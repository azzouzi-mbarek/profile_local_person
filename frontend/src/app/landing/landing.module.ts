import { DataTablesModule } from 'angular-datatables';
import { MapsModule } from './../maps/maps.module';
// import { ModalSelectCountryComponent } from './../shared/modal-select-country/modal-select-country.component';
import { IndicatorComponent } from './transparency/indicator/indicator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

import { CommentsSectionComponent } from './comments-section/comments-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { ExtraFeaturesSectionComponent } from './extra-features-section/extra-features-section.component';
import { SliderSectionComponent } from './slider-section/slider-section.component';
import { SecondFeaturesSectionComponent } from './second-features-section/second-features-section.component';
import { TeamSectionComponent } from './team-section/team-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { PricingSectionComponent } from './pricing-section/pricing-section.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { MapsComponent } from './maps/maps.component';
import { TimelineComponent } from './timeline/timeline.component';
import { StatisticComponent } from './statistic/statistic.component';
import { HomeComponent } from './home/home.component';
import { ChartComponent } from './statistic/chart/chart.component';
import { AccordionComponent } from './statistic/accordion/accordion.component';
import { DirectoryComponent } from './directory/directory.component';
import { NavsearchComponent } from './directory/navsearch/navsearch.component';
import { TransparencyComponent } from './transparency/transparency.component';


// import { MapsModule } from '../maps/maps.module';
import { NavfilterComponent } from './directory/navfilter/navfilter.component';
import { ProfilPersonComponent } from './profil-person/profil-person.component';
import { ProfileLocalComponent } from './profile-local/profile-local.component';
import { LocalGovernmentComponent } from './statistic/local-government/local-government.component';
import { LocalyElectedComponent } from './statistic/localy-elected/localy-elected.component';
import { GeneralStatisticsComponent } from './statistic/general-statistics/general-statistics.component';
import { DevelopmentPartnersComponent } from './statistic/development-partners/development-partners.component';
import { LandingNavComponent } from './landing-nav/landing-nav.component';
import { ModalSelectCountryComponent } from '../shared/modal-select-country/modal-select-country.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountryStatisticComponent } from './statistic/country-statistic/country-statistic.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxPageScrollModule,
    AccordionModule.forRoot(),
    NgxChartsModule,
    MapsModule,
    DataTablesModule
  ],
  declarations: [
    LandingComponent,
    LandingNavComponent,
    CommentsSectionComponent,
    ContactSectionComponent,
    FeaturesSectionComponent,
    ExtraFeaturesSectionComponent,
    SliderSectionComponent,
    SecondFeaturesSectionComponent,
    TeamSectionComponent,
    TestimonialsSectionComponent,
    PricingSectionComponent,
    MapsComponent,
    TimelineComponent,
    StatisticComponent,
    HomeComponent,
    ChartComponent,
    AccordionComponent,
    DirectoryComponent,
    NavsearchComponent,
    TransparencyComponent,

    NavfilterComponent,
    IndicatorComponent,
    ProfilPersonComponent,
    ProfileLocalComponent,
    LocalGovernmentComponent,
    LocalyElectedComponent,
    GeneralStatisticsComponent,
    DevelopmentPartnersComponent,
    CountryStatisticComponent,
    ContactUsComponent,

  ],
  entryComponents: [
    ModalSelectCountryComponent
  ]
})
export class LandingModule { }

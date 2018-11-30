import { ConfirmModalComponent } from './../shared/confirm-modal/confirm-modal.component';
import { CountryListResolverService } from './../resolvers/country-resolver.service';
import { NgModule, PlatformRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavBarTopComponent } from './nav-bar-top/nav-bar-top.component';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { FooterComponent } from './footer/footer.component';





import { RegionComponent } from './region/region.component';
import { DisplayRegionComponent } from './region/display-region/display-region.component';
import { DetailsRegionComponent } from './region/details-region/details-region.component';
import { FormRegionComponent } from '../admin/region/form-region/form-region.component';


import { AddCountryComponent } from './country/add-country/add-country.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule, TabsModule, AccordionModule } from 'ngx-bootstrap';

import { MapsModule } from '../maps/maps.module';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { SharedModule } from '../shared/shared.module';
import { UploadFileService } from '../services/upload-file.service';
import { TabsComponent } from './tabs/tabs.component';
import { CountryComponent } from './country/country.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { CountryDetailsComponent } from './country/country-details/country-details.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEasypiechartModule } from 'ngx-easypiechart';
import { EasyPieChartModule } from 'ng2modules-easypiechart';
import { EasyPieDirective } from '../derectives/easy-pie.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MorrisJsModule } from 'angular-morris-js';
import { FormCountryComponent } from './country/form-country/form-country.component';
import { AddLevelByFileComponent } from './level/add-level-by-file/add-level-by-file.component';
import { DataTablesModule } from 'angular-datatables';
import { LevelComponent } from './level/level.component';
import { LeveldetailsComponent } from './level/leveldetails/leveldetails.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CategoryLevelComponent } from './level/category-level/category-level.component';
import { PersonComponent } from './person/person.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AcademicLevelComponent } from './person/academic-level/academic-level.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  imports: [
    ToastrModule.forRoot(),
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    NgxPaginationModule,
    SharedModule,
    MapsModule,
    NgxChartsModule,
    NgxEasypiechartModule,
    EasyPieChartModule,
    BrowserAnimationsModule,
    MorrisJsModule,
    DataTablesModule
  ],
  declarations: [
    AdminComponent,
    NavBarTopComponent,
    NavLeftComponent,
    FooterComponent,

    EasyPieDirective,

    RegionComponent,
    DisplayRegionComponent,
    DetailsRegionComponent,
    FormRegionComponent,
    FormCountryComponent,
    PageHeadingComponent,
    AddCountryComponent,
    TabsComponent,
    CountryComponent,
    CountryDetailsComponent,
    AddLevelByFileComponent,
    LevelComponent,
    LeveldetailsComponent,
    CategoryLevelComponent,
    PersonComponent,
    AcademicLevelComponent,

  ],
  exports: [EasyPieDirective],
  entryComponents: [
    ConfirmModalComponent,
    FormCountryComponent,
    FormRegionComponent
  ],
  providers: [
    UploadFileService,
    CountryListResolverService]
})
export class AdminModule { }

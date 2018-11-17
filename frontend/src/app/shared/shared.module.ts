import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IboxComponent } from './ibox/ibox.component';

import { ModalSelectCountryComponent } from './modal-select-country/modal-select-country.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IboxComponent,

    ModalSelectCountryComponent
  ],
  exports: [
    IboxComponent,
    ModalSelectCountryComponent

  ]
})
export class SharedModule { }

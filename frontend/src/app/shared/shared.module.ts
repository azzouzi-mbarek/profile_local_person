import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IboxComponent } from './ibox/ibox.component';

import { ModalSelectCountryComponent } from './modal-select-country/modal-select-country.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IboxComponent,

    ModalSelectCountryComponent,

    ConfirmModalComponent
  ],
  exports: [
    IboxComponent,
    ModalSelectCountryComponent,
    ConfirmModalComponent

  ]
})
export class SharedModule { }

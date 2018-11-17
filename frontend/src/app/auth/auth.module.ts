import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { AfterLoginService } from '../services/after-login.service';
import { BeforeLoginService } from '../services/before-login.service';
import { SignupComponent } from './signup/signup.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    RequestResetComponent,
    ResponseResetComponent
  ],
  providers: [
    AuthService,
    TokenService,
    AfterLoginService,
    BeforeLoginService,
  ],
})
export class AuthModule { }

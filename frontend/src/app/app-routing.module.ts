
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingRoutingModule } from './landing/landing-routing.module';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [

  { path: '', redirectTo: '/landing/home', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

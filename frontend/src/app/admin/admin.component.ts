import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public loggedIn: boolean;
  showLoadingIndicator = true;
  constructor(
    private auth: AuthService,
    private _router: Router,
    private spinner: NgxSpinnerService
  ) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
        this.spinner.show();
      }

      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
        this.spinner.hide();
      }
    });
  }

  ngOnInit() {


    document.body.className = ' md-skin';


    this.auth.authStatus.subscribe(value => this.loggedIn = value);


  }

}

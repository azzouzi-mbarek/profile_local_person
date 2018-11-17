import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.css']
})
export class LandingNavComponent implements OnInit {
  loggedIn: any;
  constructor(
    private token: TokenService,
    private auth: AuthService,
    private _router: Router) { }
  page = '';
  ngOnInit() {

    this.loggedIn = this.token.loggedIn();

  }

  goToLogin() {
    this._router.navigate(['login']);
  }


  goToAdmin() {
    this._router.navigate(['administrateur']);
  }

  goToSignup() {
    this._router.navigate(['signup']);
  }


  logout(event: MouseEvent) {
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.token.remove();
    this.loggedIn = this.token.loggedIn();
  }




}

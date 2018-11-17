import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageScrollConfig } from 'ngx-page-scroll';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private token: TokenService, private _router: Router, private _route: ActivatedRoute) {
    PageScrollConfig.defaultScrollOffset = 55;
  }

  ngOnInit() {

    document.body.className = 'landing-page no-skin-config';
    document.body.setAttribute('id', 'page-top');
  }

  goToLogin() {
    this._router.navigate(['login']);
  }


  goToSignup() {
    this._router.navigate(['signup']);
  }

}








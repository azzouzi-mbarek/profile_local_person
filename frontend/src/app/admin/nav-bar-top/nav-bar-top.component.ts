import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { smoothlyMenu } from '../../app.helpers';
declare var jQuery: any;

@Component({
  selector: 'app-nav-bar-top',
  templateUrl: './nav-bar-top.component.html',
  styleUrls: ['./nav-bar-top.component.css']
})
export class NavBarTopComponent implements OnInit {

  constructor(private auth: AuthService,
    private router: Router,
    private token: TokenService) {
  }

  ngOnInit() {


  }


  logout(event: MouseEvent) {
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.router.navigateByUrl('landing/home');
    this.token.remove();
  }


  toggleNavigation(): void {
    jQuery('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }




}

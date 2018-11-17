import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public loggedIn: boolean;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    document.body.className = ' md-skin';


    this.auth.authStatus.subscribe(value => this.loggedIn = value);


  }

}

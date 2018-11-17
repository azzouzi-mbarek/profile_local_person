import { Component, OnInit } from '@angular/core';


import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public errors = null;

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    document.body.className = 'gray-bg';
  }


  onSubmit() {
    this.auth.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handelError(error)
    )
      ;
  }


  handleResponse(data) {
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/administrateur');
  }

  handelError(error) {

    this.errors = error.error.error;
  }

  goToLanding() {
    this.router.navigate(['landing/home']);
  }
}

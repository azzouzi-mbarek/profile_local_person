import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public errors = [];

  constructor(private auth: AuthService,
    private token: TokenService,
    private router: Router) {
  }

  ngOnInit() {
    document.body.className = 'gray-bg';

  }

  onSubmit() {
    this.auth.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handelError(error)
    )
      ;
  }

  handelError(error) {
    this.errors = error.error.errors;
  }

  goToLanding() {
    this.router.navigate(['landing/home']);
  }




  handleResponse(data) {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/administrateur');
  }


}

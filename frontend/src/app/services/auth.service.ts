import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());

  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  constructor(private http: HttpClient,
    private token: TokenService) {
  }


  signup(data) {
    return this.http.post(this.baseUrl + '/signup', data);
  }

  login(data) {
    return this.http.post(this.baseUrl + '/login', data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(this.baseUrl + '/sendPasswordResetLink', data);
  }

  changePassword(data) {
    return this.http.post(this.baseUrl + '/resetPassword', data);
  }


}



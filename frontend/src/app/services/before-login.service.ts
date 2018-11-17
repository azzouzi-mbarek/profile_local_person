import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TokenService } from './token.service';

@Injectable()
export class BeforeLoginService implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        return !this.Token.loggedIn();
    }
    constructor(private Token: TokenService,
        private router: Router) { }

}

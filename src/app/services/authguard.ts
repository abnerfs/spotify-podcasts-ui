import { CanActivate, Router, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login';

@Injectable({
    providedIn: 'root'
})
export default class AuthGuardService implements CanActivate {

    constructor(private login: LoginService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLogin = Boolean(route.routeConfig.path.startsWith('login'));
        const authenticated = this.login.isAuthenticated();

        if(isLogin && authenticated) {
            this.router.navigate(['home']);
            return false;
        }

        if(!isLogin && !authenticated) {
            this.router.navigate(['login'], {
                queryParams: { 
                    returnUrl: state.url
                }
            });
            return false;
        }

        return true;
    }
}
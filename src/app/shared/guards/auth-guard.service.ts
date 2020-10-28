import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { SnackbarService } from './../services/snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        public router: Router,
        public authService: AuthService,
        public snackbarService: SnackbarService,
    ) { }

    canActivate() {
        return this.checkAuth();
    }

    canActivateChild() {
        return this.checkAuth();
    }

    checkAuth() {
        if (this.authService.hasToken()) {
            return true;
        } else {
            this.authService.interceptedRoute = window.location.pathname;
            this.snackbarService.trigger('Login required to view this section');
            this.router.navigate(['/tournaments']);
            return false;
        }
    }
}

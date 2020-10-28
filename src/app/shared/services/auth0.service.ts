// https://auth0.com/docs/api/authentication?javascript#login
// (note: select 'javascript' tab)

import auth0 from 'auth0-js';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Auth0Service {
    public webAuth;

    constructor() {
        this.webAuth = new auth0.WebAuth({
            domain: 'jackpotrising.auth0.com',
            clientID: 'w6SZ5ahaCwlq7JZrzm5crCUBZ2Rx7QW6',
            responseType: 'token',
            scope: 'openid profile email',
            redirectUri: encodeURI(environment.auth0.origin + '/login')
        });
    }

    // ex: 'facebook', 'twitter', or 'google-oauth2'
    authorize(provider: string) {
        this.webAuth.authorize({
            connection: provider
        });
    }

    // ex: 'windowslive'
    authPopup(provider: string) {
        this.webAuth.popup.authorize({
            connection: provider
        });
    }
}

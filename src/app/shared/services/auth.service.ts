import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, timeout } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import { HttpService } from './http.service';
import { AccountService } from './account.service';
import { LocalStorageService } from './local-storage.service';
import { SnackbarService } from './snackbar.service';

import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public interceptedRoute: string;

    private baseUrl: string = environment.baseUrl;
    private timeout = 15000;

    public clientId = 'E53UPWAOH2WRFTRX7253CNQFLXP3ZAH3STGHRWPZHMCFPNLZ43YL46FZ';
    public clientSecret = 'SQGUW5LUCVXOQQQIGPRU35RZ6AJRCUMJGMNBCL5DUV57RM3K6Z23QN6M';
    public authHash = btoa(this.clientId + ':' + this.clientSecret); // base64 encode

    constructor(
        private router: Router,
        private http: HttpClient,
        private httpService: HttpService,
        private accountService: AccountService,
        private cookieService: CookieService,
        private localStorageService: LocalStorageService,
        private snackbarService: SnackbarService,
    ) {
        // When status 498, refresh method will be triggered
        this.httpService.authServiceRefreshTrigger.subscribe(res => { this.refresh(); });
    }

    hasToken(): boolean {
        return this.cookieService.get('jr_token') !== undefined ? true : false;
    }

    setLoginRedirect() {
        return this.interceptedRoute !== undefined ? [`${this.interceptedRoute}`] : ['/tournaments'];
    }

    formDataToUrlEncoded(obj) {
        return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
    }

    forgotPassword(payload: any): void {
        this.httpService.post('/auth/forgot', payload, false, null).subscribe(res => {
            this.snackbarService.trigger('Submitted. Check your email.');
        });
    }

    resetPassword(payload: any): void {
        this.httpService.post('/auth/reset', payload, false, null).subscribe(res => {
            this.snackbarService.trigger('Password was reset. Please login.');
            this.router.navigate(['/login']);
        });
    }

    register (payload: any): void {
        // HTTP Params
        let httpParams = new HttpParams();
        httpParams = httpParams.append('grant_type', 'assertion');
        httpParams = httpParams.append('assertion_type', 'social_login');
        httpParams = httpParams.append('assertion', 'data');
        httpParams = httpParams.append('scope', 'sdk,player');
        httpParams = httpParams.append('redirect_uri', 'http://localhost');
        // Options
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + this.authHash
            }),
            params: httpParams
        };
        // POST
        this.http.post<any>(this.baseUrl + `/account`, payload, options)
            .pipe(
                catchError(err => this.httpService.errorHandler(err)),
                timeout(this.timeout)
            ).subscribe(res => {
                // NOTE: res.player contains the same data s GET /account
                this.onComplete(res.token);
                this.router.navigate(this.setLoginRedirect()); // redirect
            });
    }

    oauthLogin(hash: any): any {
        // Convert hash data to object, ex:
        // From: http://localhost:4200/login#access_token=s6XfXATI56KMqi3Rbysz_vlnbA-A3RtF&expires_in=7200&token_type=Bearer&state=Hv1~CTCEA1IvBCYl.Xmo5oC.tYmepvuZ
        // To: { access_token: "s6XfXATI56KMqi3Rbysz_vlnbA-A3RtF", expires_in: 7200, state: "Hv1~CTCEA1IvBCYl.Xmo5oC.tYmepvuZ", token_type: "Bearer" }
        const socialServiceToken = hash // window.location.hash
            .substr(1)
            .split('&')
            .map( el => el.split('=') )
            .reduce((pre, cur) => {
                pre[cur[0]] = isNaN(parseInt(cur[1], 0)) ? cur[1] : parseInt(cur[1], 0); // string or int
                return pre;
            }, {});
        // Form Details (form encoded)
        const payload = this.formDataToUrlEncoded({
            scope: 'sdk,player',
            grant_type: 'assertion',
            assertion: 'data',
            assertion_type: 'social_token',
            redirect_uri: 'http://localhost',
            social_token: socialServiceToken.access_token,
        });
        // Header Options
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + this.authHash
            })
        };
        // POST
        this.http.post<any>(this.baseUrl + `/auth/oauth`, payload, options)
            .pipe(
                catchError(err => this.httpService.errorHandler(err)),
                timeout(this.timeout)
            ).subscribe(token => {
                this.onComplete(token);
                this.router.navigate(this.setLoginRedirect()); // redirect
            });
    }

    authorize(form: any): any {
        // Payload
        const payload = this.formDataToUrlEncoded({
            username: form.username,
            password: form.password
        });
        // HTTP Params
        let httpParams = new HttpParams();
        httpParams = httpParams.append('response_type', 'code');
        httpParams = httpParams.append('redirect_uri', 'http://localhost');
        httpParams = httpParams.append('client_id', this.clientId);
        httpParams = httpParams.append('scope', 'sdk,player');
        // Options
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + this.authHash
            }),
            params: httpParams
        };
        // POST
        this.http.post<any>(this.baseUrl + `/auth/authorize`, payload, options)
            .pipe(
                catchError(err => this.httpService.errorHandler(err)),
                timeout(this.timeout)
            ).subscribe(res => {
                res.code ? this.token(res.code) : this.snackbarService.trigger('Auth code is missing.');
            });
        // Return
        return form;
    }

    token(authCode: string): string {
        // Payload
        const payload = this.formDataToUrlEncoded({
            scope: 'sdk,player',
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost',
            code: authCode
        });
        // Options
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + this.authHash
            })
        };
        // POST
        this.http.post<any>(this.baseUrl + '/auth/token', payload, options)
            .pipe(
                catchError(err => this.httpService.errorHandler(err)),
                timeout(this.timeout)
            ).subscribe(token => {
                this.onComplete(token);
                this.router.navigate(this.setLoginRedirect()); // redirect
            });
        // Return
        return authCode;
    }

    refresh(): void {
        // Payload
        const payload = this.formDataToUrlEncoded({
            refresh_token: this.localStorageService.get('jr_refresh_token')
        });
        // HTTP Params
        let httpParams = new HttpParams();
        httpParams = httpParams.append('redirect_uri', 'http://localhost');
        httpParams = httpParams.append('grant_type', 'refresh_token');
        httpParams = httpParams.append('scope', 'sdk,player');
        // Options
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + this.authHash
            }),
            params: httpParams
        };
        // POST
        this.http.post<any>(this.baseUrl + '/auth/token', payload, options)
            .pipe(
                catchError(err => this.httpService.errorHandler(err)),
                timeout(this.timeout)
            ).subscribe(token => {
                this.onComplete(token);
            });
    }

    onComplete(token: any): any {
        // Create JR Token Cookie
        const currentDate: Date = new Date();
        const cookieOptions: CookieOptions = { expires: new Date(currentDate.setSeconds(currentDate.getSeconds() + token.expires_in)) };
        this.cookieService.putObject('jr_token', token, cookieOptions);
        // Store JR Refresh Token in LocalStorage
        this.localStorageService.set('jr_refresh_token', token.refresh_token);
        // Fetch Account Information
        this.accountService.getAccount();
        // Return
        return token;
    }

    logout(preventSnackbar?: boolean): void { // note: preventSnackbar is for the OW Iframe Window
        this.cookieService.removeAll();
        this.localStorageService.clear();
        this.accountService.flushAccountData();
        if (preventSnackbar !== true) {
            this.snackbarService.trigger('Successfully logged out');
        }
    }
}

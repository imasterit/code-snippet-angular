import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { throwError, Observable, Subject } from 'rxjs';
import { catchError, timeout, retryWhen, mergeMap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import { SnackbarService } from './snackbar.service';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl: string = environment.baseUrl;
    private newBaseUrl: string = environment.newBaseUrl;
    private timeout = 30000;

    public authServiceRefreshTrigger: Subject<any> = new Subject();

    constructor(
        private http: HttpClient,
        private snackbarService: SnackbarService,
        private cookieService: CookieService,
    ) {}

    // https://angular.io/api/common/http/HttpParams
    setHttpParams(obj): HttpParams {
        let httpParams = new HttpParams();
        Object.keys(obj).forEach((key) => {
            if (obj[key] !== undefined) {
                httpParams = httpParams.append(key, obj[key]);
            }
        });
        return httpParams;
    }

    setOptions(authenticate: boolean, params: HttpParams) {
        let authToken: string;
        if (authenticate === true) {
            const cookieJrAuth: any = this.cookieService.getObject('jr_token');
            authToken = `${cookieJrAuth.token_type} ${cookieJrAuth.access_token}`;
        }
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: authToken || ''
            }),
            params: params || null
        };
    }

    // CRUD ---

    get(endpoint: string, authenticate: boolean, params?: HttpParams): Observable<any> {
        return this.http.get<any>(this.baseUrl + endpoint, this.setOptions(authenticate, params))
            .pipe(
                catchError(err => this.errorHandler(err)),
                retryWhen(err => {
                    return err.pipe( mergeMap(e => this.retryHandler(e)) );
                }),
                timeout(this.timeout)
            );
    }
    getNew(endpoint: string, authenticate: boolean, params?: HttpParams): Observable<any> {
        return this.http.get<any>(this.newBaseUrl + endpoint, this.setOptions(authenticate, params))
            .pipe(
                catchError(err => this.errorHandler(err)),
                retryWhen(err => {
                    return err.pipe( mergeMap(e => this.retryHandler(e)) );
                }),
                timeout(this.timeout)
            );
    }
    post(endpoint: string, body: any, authenticate: boolean, params?: HttpParams): Observable<any> {
        return this.http.post<any>(this.baseUrl + endpoint, JSON.stringify(body), this.setOptions(authenticate, params))
            .pipe(
                catchError(err => this.errorHandler(err)),
                retryWhen(err => {
                    return err.pipe( mergeMap(e => this.retryHandler(e)) );
                }),
                timeout(this.timeout)
            );
    }
    postNew(endpoint: string, body: any, authenticate: boolean, params?: HttpParams): Observable<any> {
        return this.http.post<any>(this.newBaseUrl + endpoint, JSON.stringify(body), this.setOptions(authenticate, params))
            .pipe(
                catchError(err => this.errorHandler(err)),
                retryWhen(err => {
                    return err.pipe( mergeMap(e => this.retryHandler(e)) );
                }),
                timeout(this.timeout)
            );
    }
    put(endpoint: string, body: any, authenticate: boolean, params?: HttpParams): Observable<any> {
        return this.http.put<any>(this.baseUrl + endpoint, JSON.stringify(body), this.setOptions(authenticate, params))
            .pipe(
                catchError(err => this.errorHandler(err)),
                retryWhen(err => {
                    return err.pipe( mergeMap(e => this.retryHandler(e)) );
                }),
                timeout(this.timeout)
            );
    }
    delete(endpoint: string, authenticate: boolean, params?: HttpParams): Observable<any> {
        return this.http.delete<any>(this.baseUrl + endpoint, this.setOptions(authenticate, params))
            .pipe(
                catchError(err => this.errorHandler(err)),
                retryWhen(err => {
                    return err.pipe( mergeMap(e => this.retryHandler(e)) );
                }),
                timeout(this.timeout)
            );
    }

    // iTunes Lookup ---

    // https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
    iTunesLookup(id: string): Observable<any> {
        return this.http.jsonp(`https://itunes.apple.com/lookup?id=${id}`, 'callback')
            .pipe(
                timeout(this.timeout),
                catchError(err => this.errorHandler(err))
            );
    }

    // Error Handler ---

    errorHandler(e) {
        let errMessage: string = 'Error occured';
        // If API provided error message, default to use that, else use hardcoded variations
        if (e.error && e.error.message) {
            errMessage = `(${e.status}) ${e.error.message}`;
        } else {
            // Set Title by Status Code
            if (e.status !== undefined) {
                switch (e.status) {
                    // Custom
                    case (401): errMessage = `(${e.status}) Invalid Login Credentials`; break;
                    case (498): errMessage = `(${e.status}) Refreshing Authentication Token.`; break;
                    case (521): errMessage = `(${e.status}) Cloudflare Web Server Down`; break;
                    // Standard Client Errors
                    case (400): errMessage = `(${e.status}) Bad Request`; break;
                    case (401): errMessage = `(${e.status}) Unauthorized`; break;
                    case (403): errMessage = `(${e.status}) Forbidden`; break;
                    case (404): errMessage = `(${e.status}) Not Found`; break;
                    // Standard Server Errors
                    case (500): errMessage = `(${e.status}) Internal Server Error`; break;
                    case (502): errMessage = `(${e.status}) Bad Gateway`; break;
                    case (503): errMessage = `(${e.status}) Service Unavailable`; break;
                    case (504): errMessage = `(${e.status}) Gateway Timeout`; break;
                    // Fallback
                    default: errMessage = `(${e.status}) ${e.message || errMessage}`; break;
                }
            }
        }
        this.snackbarService.trigger(errMessage);
        return throwError(e);
    }

    // Retry Handler ---

    retryHandler(e) {
        if (e.status === 498) { this.authServiceRefreshTrigger.next(); }
        return new Subject();
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './../../shared/services/http.service';

@Injectable({
    providedIn: 'root'
})
export class GamesService {

    constructor(
        public http: HttpService
    ) {}

    generateParams(obj) {
        return this.http.setHttpParams(obj);
    }

    getList(params?: any): Observable<any> {
        return this.http.get(`/games`, false, params);
    }

    get(gameId: number): Observable<any> {
        return this.http.get(`/games/${gameId}`, false, null);
    }

}

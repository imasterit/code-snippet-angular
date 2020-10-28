import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './../../shared/services/http.service';
import { AccountService } from './../../shared/services/account.service';

@Injectable({
    providedIn: 'root'
})
export class TournamentsService {
    private authenticate: boolean;

    constructor(
        private http: HttpService,
        private accountService: AccountService
    ) {
        // If logged in, then authenticate calls
        this.accountService.account.subscribe(a => {
            this.authenticate = a === undefined ? false : true;
        });
    }

    parseVertical(vId: number): string {
        switch (vId) {
            case (1): return 'Mobile';
            case (2): return 'Arcade';
            case (3): return 'Overwolf';
            case (4): return 'Cross-Platform';
            case (5): return 'Topgolf';
            default: return 'Unknown';
        }
    }

    parseTierName(tierId: number): string {
        switch (tierId) {
            case (1): return 'Basic';
            case (2): return 'Bronze';
            case (3): return 'Silver';
            case (4): return 'Gold';
            default: return 'Unknown';
        }
    }

    generateParams(obj) {
        return this.http.setHttpParams(obj);
    }

    getList(params?: any): Observable<any> {
        return this.http.get(`/tournaments`, this.authenticate, params);
    }

    get(tournamentId: number): Observable<any> {
        return this.http.get(`/tournaments/${tournamentId}`, this.authenticate, null);
    }

    enterTournament(tournamentId: number, payload: any): Observable<any> {
        return this.http.post(`/tournaments/${tournamentId}/entry`, payload, true, null);
    }
}

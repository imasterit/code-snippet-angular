import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Subject } from 'rxjs';
import { map } from '../../../../node_modules/rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    public position = new Subject<any>();

    constructor(
        private http: HttpService
    ) {}

    trigger() {
        if ('geolocation' in navigator) {
            this.getCurrentPosition();
            return true;
        } else {
            alert('Geolocation not support on your device. PlayerHQ requires this for certain features.');
            return false;
        }
    }

    getCurrentPosition() {
        navigator.geolocation.getCurrentPosition(pos => {
            this.position.next({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
        });
    }

    getCountryIds() {
        return this.http.get('/countries', true).pipe(
            map (countries => {
                return countries.list.map(c => {
                    return { id: c.id, name: c.name, code: c.code };
                });
            })
        );
    }

    getStateIds(countryId) {
        return this.http.get(`/countries/${countryId}/getstates`, true).pipe(
            map (states => {
                return states.list.map(s => {
                    return { id: s.id, name: s.name, code: s.code };
                });
            })
        );
    }
}

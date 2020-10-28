import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FullscreenService {
    public fullscreenState = new Subject<any>();

    constructor() {}
}

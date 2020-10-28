import { Component, Renderer2 } from '@angular/core';
import { environment } from './../environments/environment';
import { SwUpdate } from '@angular/service-worker';
import { Router } from '@angular/router';

import { OneSignalService } from './shared/services/onesignal.service';
import { OverwolfService } from './shared/services/overwolf.service';

import { interval } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public title: string = 'PlayerHQ';
    public noscroll: boolean;

    public allownav: boolean = false;

    constructor(
        public updates: SwUpdate,
        public router: Router,
        public renderer: Renderer2,
        public oneSignalService: OneSignalService,
        public overwolfService: OverwolfService
    ) {
        // If Service Worker enabled: check for updates on interval, then prompt user
        if (environment.useServiceWorker === true) {

            // Check for Updates
            updates.checkForUpdate(); // on load
            interval(30000).subscribe(() => updates.checkForUpdate()); // every 30s

            // When Update Available
            updates.available.subscribe(event => {
                updates.activateUpdate().then(() => {
                    document.location.reload(); // reload page
                });
            });
        }
    }
}

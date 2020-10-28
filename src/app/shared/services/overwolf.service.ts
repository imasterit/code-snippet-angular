import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { SnackbarService } from './snackbar.service';
import { DialogService } from './dialog.service';

@Injectable({
    providedIn: 'root'
})
export class OverwolfService {
    public isOverwolfWrapper: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public overwolfGlobalStore: BehaviorSubject<any> = new BehaviorSubject<any>(undefined); // NOTE: setup interface ASAP

    private overwolf = { href: 'overwolf-extension://faiblokpnleeahjnaejngieejlfjaoppkalmijnh' };

    constructor(
        private router: Router,
        private snackbarService: SnackbarService,
        private dialogService: DialogService,
    ) {
        // Add Window Event Listener
        window.addEventListener('message', e => { this.onMessage(e); });
        // Verify running OW wrapper on load
        this.initOverwolfWrapper();
    }

    // ****************************************
    // Receive (Overwolf -> PlayerHQ)
    // ****************************************

    onMessage(event) {
        // Validate
        if (!event.origin || !event.type || !event.data) { console.error('Malformed OW PostMessage', event); return; }
        if (event.origin !== this.overwolf.href) { /* console.error('Invalid Origin from OW PostMessage', event); */ return; }
        // Event Type Handler
        switch (event.data.type) {
            // Notifies PlayerHQ that it's running within an Overwolf Iframe
            case('setOverwolf'):
                this.isOverwolfWrapper.next(event.data.payload);
                break;
            // Allow OW to trigger a snackbar on demand
            case('snackbar'):
                this.snackbarService.trigger(event.data.payload);
                break;
            // Allow OW to trigger a dialog on demand
            case('dialog'):
                switch (event.data.payload.type) {
                    case('message'): this.dialogService.triggerDialogMessage(event.data.paylooad.dialog); break;
                    case('image'): this.dialogService.triggerDialogImage(event.data.paylooad.dialog); break;
                    case('list'): this.dialogService.triggerDialogList(event.data.paylooad.dialog); break;
                }
                break;
            // Updates overwolfGlobalStore observable when new data received
            case('overwolfGlobalStore'):
                this.overwolfGlobalStore.next(event.data.payload);
                break;
            // Allow OW to navigate PlayerHQ to a particular route
            case('navigate'):
                this.router.navigate(event.data.payload);
                break;
            // Allow OW to request the actived route
            case('requestActiveRoute'):
                this.sendActiveRoute();
                break;
            // Handles the OW Pong response event
            case('pong'):
                console.log('Pong was triggered', event.data.payload);
                break;
            default:
                console.log('Unknown OW PostMessage Type', event.data.payload);
        }
    }

    // ****************************************
    // Send (PlayerHQ -> Overwolf)
    // ****************************************

    sendMessage(msg): void {
        const w = window;
        w.parent.postMessage(msg, '*');
    }

    // Sends a barebones Ping message to OW - responds with 'pong'
    ping(): void {
        this.sendMessage({
            type: 'ping',
            payload: { message: 'This is a ping from PlayerHQ!' }
        });
    }

    // Initilize the connection to OW - responds with 'setOverwolf', 'overwolfGlobalStore', etc
    initOverwolfWrapper(): void {
        this.sendMessage({
            type: 'initOverwolfWrapper',
            payload: this.router.url
        });
    }

    // Sends OW the current PlayerHQ route url
    sendActiveRoute(): void {
        this.sendMessage({
            type: 'activeRoute',
            payload: this.router.url
        });
    }

    // Fetch OW game stats on demand - responds with 'overwolfGlobalStore'
    fetchOverwolfGlobalStore(): void {
        this.sendMessage({
            type: 'fetchOverwolfGlobalStore',
            payload: undefined
        });
    }

    // Tells OW to trigger an app restart (used for app updates)
    triggerAppRestart(): void {
        this.sendMessage({
            type: 'triggerAppRestart',
            payload: undefined
        });
    }
}

declare var Android: any;
declare var isIosWrapper: any;
declare var iosOneSignalUserId: any;

// iOS: Handle window.webkit
// https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript
declare global {
    interface Window { webkit: any; }
}
window.webkit = window.webkit || undefined;

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NativeAppService {
    public isAndroidWrapper: boolean;
    public isIosWrapper: boolean;

    constructor() {
        // NOTE: try/catch is only option tested that doesn't throw errors for Wrapper global
        // Boolean values were not working, so 'true' sent at string.

        // Is Android Wrapper
        try {
            if (Android.isAndroidWrapper() === 'true') {
                this.isAndroidWrapper = true;
            }
        } catch (e) { this.isAndroidWrapper = false; }

        // iOS
        try {
            // Is iOS Wrapper
            if (isIosWrapper === true) {
                console.log('iOS wrapper is present', isIosWrapper);
                this.isIosWrapper = true;
            }
            // iOS methods available
            if (window.webkit !== undefined) {
                console.log('iOS window.webkit present', window.webkit);
            }
        } catch (e) { this.isIosWrapper = false; }
    }

    getOneSignalUserId() {
        let id = null;
        if (this.isAndroidWrapper === true) {
            id = Android.getOneSignalUserId();
            console.log(`Android OneSignal User Id: ${id}`);
        } else if (this.isIosWrapper === true) {
            id = iosOneSignalUserId || null;
            console.log(`ios OneSignal User Id: ${id}`);
        }
        return id;
    }

    triggerAndroidQrScanner() {
        // Android.triggerAndroidQrScanner();
        alert('Sorry, this feature is not currently available.');
    }

    triggerIosQrScanner() {
        // // Ios.triggerIosQrScanner();
        // if (window.webkit !== undefined) {
        //     window.webkit.messageHandlers.playerhqIosJSBridge.postMessage('triggerIosQrScanner');
        // }
        alert('Sorry, this feature is not currently available.');
    }

    triggerShareDialog(title: string, text: string, url: string) {
        Android.triggerShareDialog(title, text, url);
    }
}

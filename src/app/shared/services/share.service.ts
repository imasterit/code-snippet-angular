import { Injectable } from '@angular/core';
import { ContextService } from './context.service';
import { SnackbarService } from './snackbar.service';
import { NativeAppService } from './native-app.service';
import { Subject } from 'rxjs';

interface Navigator { share: any; clipboard: any; } // shim

@Injectable({
    providedIn: 'root'
})
export class ShareService {
    private baseUrl: String = 'https://playerhq.jackpotrising.com';
    public shareVisible: Subject<boolean> = new Subject<boolean>();
    public shareUrl: Subject<string> = new Subject<string>();

    constructor(
        private ctx: ContextService,
        private snackbarService: SnackbarService,
        private nativeAppService: NativeAppService
    ) {}

    trigger(title: string, text: string, route?: string, fullUrl?: string) {
        const url = fullUrl ? fullUrl : this.baseUrl + route;
        if (this.nativeAppService.isAndroidWrapper === true) {
            this.nativeAppService.triggerShareDialog(title, text, url);
        } else if (this.ctx.isAndroid() || this.ctx.isIos) {
            this.triggerWebShareApi(title, text, url);
        } else {
            this.shareUrl.next(url);
            this.open(); // share dialog
        }
    }

    // https://developers.google.com/web/updates/2016/09/navigator-share
    triggerWebShareApi(title: string, text: string, url: string) {
        if ('share' in navigator) {
        const nav: Navigator = navigator;
        nav.share({ title: title, text: text, url: url });
            // .then(() => this.snackbarService.trigger('Successful share'))
            // .catch((error) => this.snackbarService.trigger(`Error: ${error}`));
        }
    }

    open() {
        this.shareVisible.next(true);
    }

    close() {
        this.shareVisible.next(false);
    }
}

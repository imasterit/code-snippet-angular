// Provides context of platform, browser, wrapper, etc.
import { Injectable } from '@angular/core';

function getWindow (): any { return window; }
function getNavigator (): any { return navigator; }

@Injectable({
    providedIn: 'root'
})
export class ContextService {
    get nativeWindow(): any { return getWindow(); }
    get nativeNavigator(): any { return getNavigator(); }

    public ua = this.nativeNavigator.userAgent;
    public checker = {
        // Desktop
        mac: this.ua.match(/Mac OS/),
        windows: this.ua.match(/Windows NT/),
        // Mobile
        ios: this.ua.match(/(iPhone|iPod|iPad)/),
        blackberry: this.ua.match(/BlackBerry/),
        android: this.ua.match(/Android/),
        windowsphone: this.ua.match(/Windows Phone/)
    };

    constructor() {}

    isPlatform() {
        // Desktop
        if (this.checker.mac) { return {label: 'Mac OS', icon: 'fa-apple'}; }
        if (this.checker.windows) { return {label: 'Windows', icon: 'fa-windows'}; }
        // Mobile
        if (this.checker.ios) { return {label: 'iOS', icon: 'fa-apple'}; }
        if (this.checker.android) { return {label: 'Android', icon: 'fa-android'}; }
        if (this.checker.windowsphone) { return {label: 'Windows Phone', icon: 'fa-windows'}; }
        if (this.checker.blackberry) { return {label: 'Blackberry', icon: 'fa-blackberry'}; }
        return {label: 'Unidentified Platform', icon: ''};
    }

    isAndroid(): boolean {
        if (this.checker.android) { return true; }
        return false;
    }

    isIos(): boolean {
        if (this.checker.ios) { return true; }
        return false;
    }

    isWindowGreaterThan(w: number): boolean {
        return this.nativeWindow.innerWidth > w ? true : false;
    }

    isWindowSmallerThan(w: number): boolean {
        return this.nativeWindow.innerWidth <= w ? true : false;
    }

    isMobileLayout(): boolean {
        const breakpoint = 480;
        return this.nativeWindow.innerWidth <= breakpoint ? true : false;
    }
}

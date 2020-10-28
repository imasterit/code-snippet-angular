// OneSignal: https://documentation.onesignal.com/docs
// declare var OneSignal: any;

import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import { AccountService } from './account.service';
import { NativeAppService } from './native-app.service';

@Injectable({
    providedIn: 'root'
})
export class OneSignalService {
    public account: any;

    constructor(
        public http: HttpService,
        public accountService: AccountService,
        public nativeAppService: NativeAppService
    ) {
        this.accountService.account.subscribe(a => {
            this.account = a;
            // If: attempt to register (native app wrapper)
            if (a && a.devices !== undefined) { this.register(); }
        });
    }

    register() {
        const osUserID: string = this.nativeAppService.getOneSignalUserId();
        const devices = this.account.devices;
        if (osUserID !== undefined) {
            // Filter array where device_id matches registerOneSignalDevice
            const devicesContainIdArr = devices !== null ? devices.filter(function(device) { return device.device_id === osUserID; }) : [];
            // Test whether device list empty -or- if device list contains matching id
            const shouldRegisterDevice: boolean = devices === null || devicesContainIdArr.length === 0 ? true : false;
            // If: OS user id available -and- shouldRegisterDevice bool is true
            if (osUserID !== undefined && osUserID !== null && shouldRegisterDevice === true) {
                this.http.post('/account/device', {device_id: osUserID}, true).subscribe(res => {
                    // this.snackbarService.trigger({message: res.message}); // testing only
                });
            }
        }
    }
}

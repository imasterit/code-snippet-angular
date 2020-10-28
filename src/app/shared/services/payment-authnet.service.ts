// Authorize.net via Accept.js Library -- https://developer.authorize.net/api/reference/features/acceptjs.html
// *** NOTE: The library prod/staging environement is configured on index.html ***

declare var Accept: any;

import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentAuthnetService {
    private secureData = {
        authData: {
            // Prod
            clientKey: '6uSQJQ5DBwkQ92yd33D99h9pc7nurYeuS7C6tqUG3GqRDWn9KM94UKSRju2cj5m4',
            apiLoginID: '8x2u3VLR',
            // Sandbox
            // clientKey: '54P5x86vtsw8j6Sb3644V78KbYE437Pggx7qk74M9rJ4G7twhPtecHJR8FqsXd2t',
            // apiLoginID: '55Xx9ZkD',
        },
        cardData: undefined,
    };

    constructor(
        private snackbarService: SnackbarService,
        private http: HttpService
    ) {}

    submit(formValue: any, callback: any) {
        this.secureData.cardData = formValue;

        // Accept.js submit and handle errors/response
        Accept.dispatchData(this.secureData, (r) => {
            const errors = this.errorHandler(r);
            if (errors === false) {
                // Submit to JR API
                const payload = {
                    data_descriptor: r.opaqueData.dataDescriptor,
                    data_value: r.opaqueData.dataValue
                };
                this.http.postNew(`/account/payment_methods`, payload, true, null).subscribe(res => {
                    this.snackbarService.trigger(res.message);
                    if (res.success) { callback(); }
                });
            }
        });
    }

    errorHandler(response: any) {
        if (response.messages.resultCode === 'Error') {
            response.messages.message.forEach(err => {
                this.snackbarService.trigger(`${err.text}`);
                console.error(`Authorize.net Error: ${err.text} (${err.code})`);
            });
            return true;
        }
        return false;
    }
}

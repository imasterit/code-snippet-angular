import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    public accountLsKey = 'jr_account';
    public account: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
    public paymentMethods: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

    constructor(
        private http: HttpService,
        private localStorageService: LocalStorageService,
        private snackbarService: SnackbarService,
    ) {
        // Retreive account from LocalStorage
        const accountLsValue = this.localStorageService.getObject(this.accountLsKey) || undefined;
        this.account.next(accountLsValue);
    }

    // Account ---

    getAccount(message?: string): void {
        this.http.get('/account', true, null).subscribe(account => {
            this.setAccountData(account);
            if (message) { this.snackbarService.trigger(message); }
        });
    }

    updateAccount(payload: any, message?: string): void {
        this.http.put('/account', payload, true, null).subscribe(account => {
            this.setAccountData(account);
            if (message) { this.snackbarService.trigger(message); }
        });
    }

    private setAccountData(account: any): void {
        // Update Observable
        this.account.next(account);
        // Provide to LocalStorage to persist data
        this.localStorageService.setObject(this.accountLsKey, account);
    }

    flushAccountData() {
        this.account.next(undefined);
    }

    // Payment Methods ---

    getPaymentMethods(): void {
        this.http.getNew('/account/payment_methods', true, null).subscribe(methods => this.paymentMethods.next(methods));
    }

    // addPaymentMethod(): void {}

    deletePaymentMethod(paymentId: number): void {
        this.http.delete(`/payment_methods/${paymentId}`, true, null).subscribe(res => {
            this.snackbarService.trigger('Payment method successfully removed');
            this.getPaymentMethods();
        });
    }

}

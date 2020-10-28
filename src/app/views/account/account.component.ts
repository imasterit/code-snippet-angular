import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../shared/services/auth.service';
import { AccountService } from './../../shared/services/account.service';
import { SidenavService } from './../../shared/services/sidenav.service';
import { HttpService } from './../../shared/services/http.service';
import { SnackbarService } from './../../shared/services/snackbar.service';

enum WithdrawHistoryState {
    'Under Review' = 1,
    'Withdraw Accepted',
    'Withdraw Rejected'
}

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    public account;
    public paymentMethods: any;
    public transactions: any;
    public sidebarState: number = 0;

    constructor(
        private router: Router,
        private authService: AuthService,
        public accountService: AccountService,
        private sidenavService: SidenavService,
        private http: HttpService,
        private snackbarService: SnackbarService
    ) {
        // Get Account Model
        this.accountService.account.subscribe(a => {
            if (a) {
                this.account = a;
                // Get Payment Methods
                this.accountService.getPaymentMethods();
                this.accountService.paymentMethods.subscribe(pm => this.paymentMethods = pm);
            } else {
                this.router.navigate(['/tournaments']);
            }
        });
    }

    ngOnInit() {
        this.getTransactionHistory();
    }

    updateAvatar(e: any): void {
        this.accountService.updateAccount({avatar: e});
    }

    updateColor(e: any): void {
        this.accountService.updateAccount({color: e});
    }

    parseWithdrawTimestamp(d): any {
        return moment(d).format('MM/DD/YYYY h:mm A');
    }

    parseWithdrawState(state: number): string {
        return WithdrawHistoryState[state];
    }

    getTransactionHistory() {
        this.http.get('/account/withdraws', true, null).subscribe(th => this.transactions = th);
    }

    toggleSidebar(state: number): void {
        this.sidebarState = state;
        this.sidenavService.toggle('right');
    }

    deletePaymentMethod(pm: any): void {
        if (window.confirm('Are you sure you want to remove this payment method? This cannot be undone.')) {
            this.accountService.deletePaymentMethod(pm.id);
        }
    }

    logout() {
        this.authService.logout();
    }

    // Connect ---

    connectTwitch(): any {
        const url = window.prompt('Enter your Twitch account profile URL');
        if (!url.includes('https://www.twitch.tv/')) {
            this.snackbarService.trigger('Invalid Twitch Profile URL');
            return false;
        }
        if (url) { this.accountService.updateAccount({social: {twitch: url}}, 'Twitch profile added'); }
    }

    connectYoutube(): any {
        const url = window.prompt('Enter your YouTube account profile URL');
        if (!url.includes('https://www.youtube.com/channel')) {
            this.snackbarService.trigger('Invalid YouTube Profile URL');
            return false;
        }
        if (url) { this.accountService.updateAccount({social: {youtube: url}}, 'YouTube profile added'); }
    }

}

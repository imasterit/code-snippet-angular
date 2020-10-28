import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SidenavService } from './../../../shared/services/sidenav.service';
import { HttpService } from './../../../shared/services/http.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';
import { AccountService } from './../../../shared/services/account.service';

@Component({
    selector: 'app-account-withdraw',
    templateUrl: './account-withdraw.component.html',
    styleUrls: ['./account-withdraw.component.scss']
})
export class AccountWithdrawComponent implements OnInit {

    public formWithdraw = this.fb.group({
        amount: [10, [Validators.required]],
        type: ['paypal'],
        paypal_email: ['', [Validators.required, Validators.email]]
    });

    constructor(
        private fb: FormBuilder,
        public sidenavService: SidenavService,
        private http: HttpService,
        private snackbarService: SnackbarService,
        private accountService: AccountService
    ) {}

    ngOnInit() {}

    submit(): any {
        // Validate: amount minimum
        if (this.formWithdraw.value.amount < 10) {
            this.snackbarService.trigger('Amount must be greater than $10');
            return false;
        }
        // Submit
        this.http.post('/account/withdraw/player', this.formWithdraw.value, true, null).subscribe(res => {
            this.snackbarService.trigger('Withdraw request submitted successfully');
            this.accountService.getAccount();
        });
        // Close Sidebar
        this.sidenavService.toggle('right');
    }
}

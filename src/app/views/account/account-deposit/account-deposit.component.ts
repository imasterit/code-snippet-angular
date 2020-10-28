import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from './../../../shared/services/account.service';
import { SidenavService } from './../../../shared/services/sidenav.service';
import { HttpService } from './../../../shared/services/http.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';

@Component({
    selector: 'app-account-deposit',
    templateUrl: './account-deposit.component.html',
    styleUrls: ['./account-deposit.component.scss']
})
export class AccountDepositComponent implements OnInit {

    public paymentMethods: any;
    public formDeposit = this.fb.group({
        vendor: ['authnet'],
        method: [undefined, [Validators.required]],
        customer_profile_id: [''],
        payment_profile_id: [''],
        amount_to_add: [5, [Validators.required]],
        amount_to_charge: [undefined],
    });

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        public sidenavService: SidenavService,
        private http: HttpService,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit() {
        // Get Payment Methods
        this.accountService.getPaymentMethods();
        this.accountService.paymentMethods.subscribe(pm => this.paymentMethods = pm);
        // Set Initial Handling Fee
        this.calcHandlingFee(this.formDeposit.value.amount_to_add);
    }

    calcHandlingFee(amountToAdd: any): void {
        const fee = (3.5 / 100) * amountToAdd;
        this.formDeposit.get('amount_to_charge').setValue(amountToAdd + fee);
    }

    submit(): any {
        // Validate: amount range
        if (this.formDeposit.value.amount_to_add < 5 || this.formDeposit.value.amount_to_add > 1000) {
            this.snackbarService.trigger('Amount must be between $5 and $1,000');
            return false;
        }
        // Get Customer/Payment Provile ID
        this.formDeposit.value.customer_profile_id = this.formDeposit.value.method.customer_profile_id;
        this.formDeposit.value.payment_profile_id = this.formDeposit.value.method.payment_profile_id;
        // Submit
        this.http.postNew('/deposit', this.formDeposit.value, true, null).subscribe(res => {
            this.snackbarService.trigger('Successfully deposited funds');
            this.accountService.getAccount();
        });
        // Close Sidebar
        this.sidenavService.toggle('right');
    }

}

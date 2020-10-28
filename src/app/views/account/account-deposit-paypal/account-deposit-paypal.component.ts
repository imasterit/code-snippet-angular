declare var paypal: any;

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from './../../../shared/services/account.service';
import { SidenavService } from './../../../shared/services/sidenav.service';
import { HttpService } from './../../../shared/services/http.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';

@Component({
    selector: 'app-account-deposit-paypal',
    templateUrl: './account-deposit-paypal.component.html',
    styleUrls: ['./account-deposit-paypal.component.scss']
})
export class AccountDepositPaypalComponent implements OnInit, AfterViewInit {

    public formPaypal = this.fb.group({
        vendor: ['paypal'],
        amount_to_add: [5, [Validators.required, Validators.min(5), Validators.max(1000)]],
        amount_to_charge: [undefined],
        order_id: [undefined]
    });

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        public sidenavService: SidenavService,
        private http: HttpService,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit() {
        // Set Initial Handling Fee
        this.calcHandlingFee(this.formPaypal.value.amount_to_add);
    }

    ngAfterViewInit() {
        // Paypal Button
        paypal.Buttons({
            // Create Order
            createOrder: (data, actions) => {
                // Set up the transaction
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: this.formPaypal.get('amount_to_charge').value.toString() // ex: '0.01'
                        }
                    }],
                    application_context: { shipping_preference: 'NO_SHIPPING' }
                });
            },
            // On Approval
            onApprove: (data, actions) => {
                // Cache THIS due to scoping issue
                const _self = this;

                // Capture the funds from the transaction
                return actions.order.capture().then(function (details) {
                    // console.log(data);
                    // console.log(details);

                    // Show a success message to your buyer
                    _self.snackbarService.trigger('Transaction completed by ' + details.payer.name.given_name);

                    // Set order_id value
                    _self.formPaypal.get('order_id').setValue(data.orderID);

                    // Submit
                    _self.http.postNew('/deposit', _self.formPaypal.value, true, null).subscribe(res => {
                        _self.snackbarService.trigger('Successfully deposited funds');
                        _self.accountService.getAccount();
                    });

                    // Close Sidebar
                    _self.sidenavService.toggle('right');

                });
            }
        }).render('#paypal-button-container');
    }

    calcHandlingFee(amountToAdd: any): void {
        const fee = (3.5 / 100) * amountToAdd;
        this.formPaypal.get('amount_to_charge').setValue(
            parseFloat(
                (amountToAdd + fee).toFixed(2)
            )
        );
    }

}

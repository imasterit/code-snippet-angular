import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { SidenavService } from './../../../shared/services/sidenav.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';
import { PaymentAuthnetService } from './../../../shared/services/payment-authnet.service';
import { AccountService } from './../../../shared/services/account.service';

@Component({
    selector: 'app-account-payment-methods',
    templateUrl: './account-payment-methods.component.html',
    styleUrls: ['./account-payment-methods.component.scss']
})
export class AccountPaymentMethodsComponent implements OnInit {
    @Input() closable: boolean;
    @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();

    public months = [
        { id: '01', name: 'January' },
        { id: '02', name: 'February' },
        { id: '03', name: 'March' },
        { id: '04', name: 'April' },
        { id: '05', name: 'May' },
        { id: '06', name: 'June' },
        { id: '07', name: 'July' },
        { id: '08', name: 'August' },
        { id: '09', name: 'September' },
        { id: '10', name: 'October' },
        { id: '11', name: 'November' },
        { id: '12', name: 'December' }
    ];
    public years = [
        { id: '19', name: '2019' },
        { id: '20', name: '2020' },
        { id: '21', name: '2021' },
        { id: '22', name: '2022' },
        { id: '23', name: '2023' },
        { id: '24', name: '2024' },
        { id: '25', name: '2025' },
        { id: '26', name: '2026' }
    ];
    public formPaymentMethod: FormGroup = this.fb.group({
        cardNumber: [undefined, [Validators.required, Validators.minLength(13), Validators.maxLength(16)]],
        cardCode: [undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
        month: [undefined, [Validators.required]],
        year: [undefined, [Validators.required]],
    });

    constructor(
        private fb: FormBuilder,
        public sidenavService: SidenavService,
        private snackbarService: SnackbarService,
        private paymentAuthnetService: PaymentAuthnetService,
        public accountService: AccountService
    ) {}

    ngOnInit() {}

    submit(): any {
        // Submit
        this.paymentAuthnetService.submit(this.formPaymentMethod.value, () => {
            this.snackbarService.trigger('Payment method added!');
            // Used for Overwolf View (iframe window)
            this.success.emit(true);
        });
        // Close Sidebar
        this.sidenavService.toggle('right');
    }

}

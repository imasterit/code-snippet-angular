import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SidenavService } from './../../../shared/services/sidenav.service';
import { HttpService } from './../../../shared/services/http.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';
import { AccountService } from './../../../shared/services/account.service';

@Component({
    selector: 'app-account-connect-epic',
    templateUrl: './account-connect-epic.component.html',
    styleUrls: ['./account-connect-epic.component.scss']
})
export class AccountConnectEpicComponent implements OnInit {

    public formEpic = this.fb.group({
        // email: ['', [Validators.required, Validators.email]],
        // password: ['', [Validators.required]],
        // confirm_password: ['', [Validators.required]],
        // code: ['']
        epic_username: ['', [Validators.required]],
    });

    constructor(
        private fb: FormBuilder,
        public sidenavService: SidenavService,
        private http: HttpService,
        private snackbarService: SnackbarService,
        private accountService: AccountService
    ) {}

    ngOnInit() {}

    // ================================================
    // NOTE:
    // Below is the ideal solution, but the syntax for observable.subscribe() appears to have been update in Angular v8. Didn't have time resolve this.
    // If you can get this working drop the 'code' input from the .html file, the <p> 2fa instruction text, and the formbuilder definition at the top of this class.
    // The switch to use this submit() method
    // ================================================
    // submit(): any {
    //     // Submit
    //     this.http.post('/auth/epic', this.formEpic.value, true, null).subscribe(
    //         res => {
    //             this.snackbarService.trigger('Epic account successfully connected');
    //             this.accountService.getAccount();
    //         },
    //         err => {
    //             // If: 2FA Required
    //             // if (err.status === 423) {
    //             //     const promptCode = prompt('Enter your two factor authentication (2FA) code.');
    //             //     const payload = {
    //             //         email: this.formEpic.value.email,
    //             //         password: this.formEpic.value.password,
    //             //         code: promptCode
    //             //     };
    //             //     if (promptCode) {
    //             //         this.http.post('/auth/epic/2fa', payload, true, null).subscribe(res => {
    //             //             this.snackbarService.trigger('Epic account connected with 2FA');
    //             //         });
    //             //     }
    //             // }
    //         },
    //         () => {}
    //     );
    //     // Close Sidebar
    //     this.sidenavService.toggle('right');
    // }

    submit(): any {
        // If 2fa Code Provided
        if (this.formEpic.value.code) {
            // 2FA Login
            const payload = {
                email: this.formEpic.value.email,
                password: this.formEpic.value.password,
                code: this.formEpic.value.code
            };
            this.http.post('/auth/epic/2fa', payload, true, null).subscribe(res => {
                this.snackbarService.trigger('Epic account connected with 2FA');
            });
        } else {
            delete this.formEpic.value.code;
            // Normal Login - Without 2FA
            this.http.post('/auth/epic', this.formEpic.value, true, null).subscribe(res => {
                this.snackbarService.trigger('Epic account successfully connected');
                this.accountService.getAccount();
            });
        }
        // Close Sidebar
        this.sidenavService.toggle('right');
    }

}

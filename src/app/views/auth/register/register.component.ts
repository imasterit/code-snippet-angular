import * as moment from 'moment';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from './../../../shared/services/http.service';
import { AuthService } from './../../../shared/services/auth.service';
import { DialogService } from './../../../shared/services/dialog.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public affiliateCode: string;

    public countries: any[] = [];
    public states: any[] = [];

    public formRegister = this.fb.group({
        avatar: ['', [Validators.required]],
        color: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        birthday: [undefined, Validators.required],
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
        accept_terms: [false]
    });

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        public router: Router,
        public http: HttpService,
        public authService: AuthService,
        public dialogService: DialogService
    ) {
        this.affiliateCode = this.route.snapshot.params.affiliate;
    }

    ngOnInit() {
        // Bypass registration if authenticated
        if (this.authService.hasToken()) { this.router.navigate(['/tournaments']); }
        // Get Constants
        this.http.get('/constants', false).subscribe(res => {
            this.countries = res.countries;
            this.states = res.states;
        });
    }

    set(inputName: string, e: any) {
        this.formRegister.get(inputName).setValue(e);
    }

    checkEmailUnique() {
        const payload = { email: this.formRegister.value.email };
        this.http.post('/account/verify/email', payload, false, null).subscribe(); // note: no response available
    }

    checkPlayernameUnique() {
        const payload = { username: this.formRegister.value.username };
        this.http.post('/account/verify/username', payload, false, null).subscribe(); // note: no response available
    }

    submit(f: any): void {
        // Validate: age is greater than 13
        if (moment().diff(f.value.birthday, 'years') < 13) {
            this.dialogService.triggerDialogMessage({
                title: 'Age Restriction',
                message: `Sorry, you must be 13 years or older to participate.`,
            }).subscribe(res => {});
            return;
        }
        // Append affiliate code if available
        if (this.affiliateCode !== undefined) { f.value.affiliate_code = this.affiliateCode; }
        this.authService.register(f.value);
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../shared/services/auth.service';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

    public hash: string;
    public formReset = this.fb.group({
        password: ['', [Validators.required]],
        confirm_password: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        public router: Router,
        public route: ActivatedRoute,
        public authService: AuthService,
  ) {
        this.hash = this.route.snapshot.params.hash;
    }

    ngOnInit() {
        // Bypass login if authenticated
        if (this.authService.hasToken()) { this.router.navigate(['/tournaments']); }
    }
    submit() {
        if (this.hash !== undefined) { this.formReset.value.hash = this.hash; }
        this.authService.resetPassword(this.formReset.value);
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/services/auth.service';
import { Auth0Service } from './../../../shared/services/auth0.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public formLogin = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private auth0Service: Auth0Service,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit() {
        // Handle social hash & token
        if (window.location.hash !== '') {
            if (window.location.hash.includes('error=')) {
                // Handle Error
                const error = window.location.hash.split('error=')[1].split('&')[0];
                const errorDescription = window.location.hash.split('error_description=')[1].split('&')[0];
                this.snackbarService.trigger(`Auth0 Error: ${error}, ${decodeURI(errorDescription)}`);
            } else {
                // Handle Social Login
                // this.authService.socialLogin(window.location.hash);
                this.authService.oauthLogin(window.location.hash);
            }
        }

        // Bypass login if authenticated
        if (this.authService.hasToken()) { this.router.navigate(['/tournaments']); }
    }

    onSocialLogin(provider: string): void {
        this.auth0Service.authorize(provider);
    }

    submit(): any {
        const formValue = this.formLogin;
        this.authService.authorize(formValue.value);
    }

    promptForgotEmail(): void {
        const email: string = window.prompt('Forgot your password? Enter Your Email below.');
        if (email && email.includes('@') && email.includes('.')) {
            this.authService.forgotPassword({email: email});
        } else { alert('Sorry invalid email. Please try again.'); }
    }

}

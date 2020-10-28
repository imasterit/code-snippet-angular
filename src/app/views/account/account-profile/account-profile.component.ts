import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AccountService } from './../../../shared/services/account.service';
import { HttpService } from './../../../shared/services/http.service';
import { SidenavService } from './../../../shared/services/sidenav.service';

@Component({
    selector: 'app-account-profile',
    templateUrl: './account-profile.component.html',
    styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {
    public account: any;
    public countries: any[] = [];
    public states: any[] = [];
    public statesFiltered: any[] = [];

    public formProfile = this.fb.group({
        id: [undefined],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        // birthday: (removed; should not be editable)
        phone_number: this.fb.group({
            id: [undefined],
            number: [undefined, Validators.required],
        }),
        address: this.fb.group({
            id: [undefined],
            address_line_1: ['', Validators.required],
            address_line_2: [''],
            country_id: [undefined, Validators.required],
            state_id: [undefined], // TX: 44
            city: ['', Validators.required],
            zip: ['', Validators.required],
        })
    });

    constructor(
        private fb: FormBuilder,
        private accountService: AccountService,
        private http: HttpService,
        public sidenavService: SidenavService
    ) {
        this.accountService.account.subscribe(a => {
            this.account = a;
            if (a.phone_number.number === 0) { a.phone_number.number = undefined; }
            this.formProfile.patchValue(a);
        });
    }

    ngOnInit() {
        this.http.get('/constants', false).subscribe(res => {
            this.countries = res.country_states;
            // this.states = res.states;
            this.updateStateProvinceSelect(this.formProfile.value.address.country_id);
        });
    }

    updateStateProvinceSelect(selectedCountryId: number): void {
        const selectedCountryCode: string = this.countries.find(country => country.id === selectedCountryId).code;
        this.states = this.countries.find(country => country.code === selectedCountryCode).list
        if (this.states.length > 0) {
          this.statesFiltered = this.states.filter(state => state.country_code === selectedCountryCode);
          const stateProvinceIdFormControlError = () => {
              // Set form invalid on next-tick to make sure user selects associated state/province
              // Ref: https://github.com/angular/angular/issues/19170
              setTimeout(() => {
                  this.formProfile.setErrors({'state_id required': true});
              }, 1);
          };
          if (this.statesFiltered.length > 0) {
              if (
                  this.formProfile.value.address.state_id === 0 ||
                  this.formProfile.value.address.state_id === null ||
                  this.formProfile.value.address.state_id === undefined
              ) {
                  stateProvinceIdFormControlError();
              } else {
                  if (!this.statesFiltered.find(state => state.id === this.formProfile.value.address.state_id)) {
                      // User switched to a different country and the current state_id on form is no longer valid
                      // User must now set a correct corresponding state/province for the newly selected country
                      stateProvinceIdFormControlError();
                  }
              }
          }
        }
    }

    submit(): void {
        // Format: Delete state_id if not a country that has states/provinces, if state_id is 0, or if state_id is null
        if (this.statesFiltered.length === 0 || this.formProfile.value.address.state_id === 0 || this.formProfile.value.address.state_id === null) {
            delete this.formProfile.value.address.state_id;
        }
        // Submit
        this.accountService.updateAccount(this.formProfile.value, 'Account profile successfully updated');
        // Close Sidebar
        this.sidenavService.toggle('right');
    }
}

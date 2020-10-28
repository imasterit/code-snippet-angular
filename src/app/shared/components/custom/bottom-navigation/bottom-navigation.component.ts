import { Component, OnInit } from '@angular/core';
import { NavigationService } from './../../../services/navigation.service';
import { AccountService } from './../../../services/account.service';

@Component({
    selector: 'app-bottom-navigation',
    templateUrl: './bottom-navigation.component.html',
    styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {
    public account: any;
    public navigation;

    constructor(
        public navigationService: NavigationService,
        private accountService: AccountService,
    ) {
        this.accountService.account.subscribe(a => this.account = a);
    }

    ngOnInit() {
        this.navigation = this.navigationService.mobileRoutes();
    }

}

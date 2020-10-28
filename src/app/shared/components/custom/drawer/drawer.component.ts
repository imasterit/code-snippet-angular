import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../../environments/environment';

// Services
import { NavigationService } from './../../../services/navigation.service';
import { AuthService } from './../../../services/auth.service';
import { AccountService } from './../../../services/account.service';
import { OverwolfService } from './../../../services/overwolf.service';

@Component({
    selector: 'app-drawer',
    templateUrl: './drawer.component.html',
    styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
    public env = environment;

    public account: any;
    public userTooltip: string;
    public isOverwolfWrapper: boolean = false;

    constructor(
        public navigationService: NavigationService,
        private authService: AuthService,
        private accountService: AccountService,
        private overwolfService: OverwolfService
    ) {}

    ngOnInit() {
        // Account
        this.accountService.account.subscribe(a => {
            this.account = a;
            if (a) { this.userTooltip = `${a.first_name} ${a.last_name} (${a.username})`; }
        });
        // Overwolf Wrapper Bool
        this.overwolfService.isOverwolfWrapper.subscribe(res => { this.isOverwolfWrapper = res; });
    }

    triggerLogout(): void {
        this.authService.logout();
    }
}

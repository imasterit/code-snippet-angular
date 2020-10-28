import * as moment from 'moment';

import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable, BehaviorSubject } from 'rxjs';

import { TournamentsService } from './../tournaments.service';
import { AccountService } from './../../../shared/services/account.service';
import { DialogService } from './../../../shared/services/dialog.service';
import { SnackbarService } from './../../../shared/services/snackbar.service';
import { ContextService } from './../../../shared/services/context.service';
import { ShareService } from './../../../shared/services/share.service';
import { FullscreenService } from './../../../shared/services/fullscreen.service';

@Component({
    selector: 'app-tournament-details',
    templateUrl: './tournament-details.component.html',
    styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent implements OnInit {
    public tournamentId;
    public tournament;

    public selected = new FormControl(0);

    public account: any;

    public openDrawerId = -1;
    public expireTimeString: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public tournService: TournamentsService,
        private accountService: AccountService,
        private dialogService: DialogService,
        private snackbarService: SnackbarService,
        public ctx: ContextService,
        private shareService: ShareService,
        private fullscreenService: FullscreenService
    ) {
        // Get Account Model
        this.accountService.account.subscribe(a => {
            this.account = a;
            this.getTournamentDetails();
        });
    }

    ngOnInit() {
        this.getTournamentDetails();
    }

    getTournamentDetails(msg?: string): void {
        // Fetch Router Param (id)
        this.route.params.subscribe(params => {
            this.tournamentId = params['id'];
            // GET
            this.tournService.get(this.tournamentId).subscribe(t => {
                if (msg) { this.snackbarService.trigger(msg); }
                this.tournament = t;
                // Reverse tier order, should be Basic -> Gold
                this.tournament.tiers = this.tournament.tiers.reverse();
                // If pass expire, set/refresh expireTime every 60s
                if (this.tournament.current_player.pass_expire) { this.expireTimeFormatted(); }
            });
        });
    }

    toggleFullscreen(): void {
        this.fullscreenService.fullscreenState.next(true);
    }

    share(): void {
        this.shareService.trigger(
            this.tournament.name,
            'Compete in this tournament on PlayerHQ, powered by Jackpot Rising',
            `/tournaments/${this.tournamentId}`
        );
    }

    openUrl(e: any, url: string): void {
        e.stopPropagation();
        const win = window.open(url, '_blank');
        win.focus();
    }

    calcPercentAmount(value: number, total: number): number {
        return (100 * value) / total;
    }

    viewPrize(e, r): void {
        e.stopPropagation();
        this.dialogService.triggerDialogImage({
            title: r.payout.prizes.caption,
            image: r.payout.prizes.image,
            width: '512px'
        });
    }

    toggleRow(i: number): void {
        if (this.openDrawerId === i) { this.openDrawerId = -1; } else { this.openDrawerId = i; }
    }

    expireTimeFormatted(): void {
        const passExpire = this.tournament.current_player.pass_expire;
        // If pass expire is in the future
        if (moment(passExpire).diff(new Date(), 'seconds') > 0) {
            // https://momentjs.com/docs/#/displaying/fromnow/
            this.expireTimeString = moment(passExpire).fromNow();
            // Refresh every 60s
            setInterval(() => {
                this.expireTimeFormatted();
            }, 60000);
        } else {
            this.getTournamentDetails();
        }
    }

    enterTournament(): void {
        const payload = {
            tier_id: this.tournament.tiers[this.selected.value].tier_id
        };
        // If: Overwolf (vertical: 3), redirect to the Overwolf client install
        if (this.tournament.vertical === 3) {
            if (window.confirm('To participate in Overwolf tournaments you need to install the Overwolf on your computer. Do you wish to get the app?')) {
                const win = window.open('https://www.overwolf.com/app/Jackpot_Rising_Inc-Jackpot_Rising', '_blank');
                win.focus();
            }
            return;
        }
        // If: API Link (vertical: 4), verify Epic account is set
        if (this.tournament.vertical === 4 && !this.account.epic_username && !this.account.epic_account_id) {
            this.snackbarService.trigger('You must connect Epic account.');
            this.router.navigate(['/account']);
            return;
        }
        // If password protect, prompt for password entry
        let promptPassword;
        if (this.tournament.visibility.protected) {
            promptPassword = window.prompt('Enter tournament password');
            const findMatchingPassword = this.tournament.visibility.codes.find(code => code.password === promptPassword);
            if (findMatchingPassword) {
                payload['password'] = promptPassword;
            } else {
                this.dialogService.triggerDialogMessage({
                    title: 'Incorrect Password',
                    message: `Sorry, this password does not appear to be correct.`,
                }).subscribe(res => {});
                return;
            }
        }
        // Confirm: Multi-Tier Lock Message
        if (this.tournament.current_player.user_has_entered === false && this.tournament.tiers.length > 1) {
            const confirmState = window.confirm('Confirm tier lock: By entering this tier, you will be locked into it for the remainder of the tournament. This includes re-entry.');
            if (!confirmState) { return; }
        }
        // Validate: Not Registered
        if (this.account.registered === false) {
            this.dialogService.triggerDialogMessage({
                title: 'Unregistered Account',
                message: `You must complete account registration before you can enter this tournament.`,
            }).subscribe(res => {});
            this.router.navigate(['/account']);
            return;
        }
        // Validate: Insufficient Funds
        if (this.tournament.tiers[this.selected.value].buyin.amount > this.account.account.balance) {
            this.dialogService.triggerDialogMessage({
                title: 'Insufficient Funds',
                message: `Your balance of ${this.account.account.balance_formatted || '(missing)'} is below the ${this.tournament.tiers[this.selected.value].buyin.amount_formatted || '(missing)'} entery fee.`,
            }).subscribe(res => {});
            this.router.navigate(['/account']);
            return;
        }
        // Submit
        this.tournService.enterTournament(this.tournamentId, payload).subscribe(res => {
            this.snackbarService.trigger('Successfully entered tournament!');
            this.getTournamentDetails(); // refresh (for current_player)
            // If: Topgolf vertical, navigate to /sync
            this.tournament.vertical === 5 ? this.router.navigate(['/sync']) : this.accountService.getAccount(); // redirect / refresh
        });
    }

}

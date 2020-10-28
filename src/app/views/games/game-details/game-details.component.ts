import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GamesService } from './../games.service';
import { TournamentsService } from './../../tournaments/tournaments.service';
import { DialogService } from './../../../shared/services/dialog.service';
import { ContextService } from './../../../shared/services/context.service';
import { ShareService } from './../../../shared/services/share.service';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

    public gameId: number;
    public game;

    public tournaments: any;

    constructor(
        // private router: Router,
        private route: ActivatedRoute,
        private gamesService: GamesService,
        private tournamentsService: TournamentsService,
        private dialogService: DialogService,
        public ctx: ContextService,
        private shareService: ShareService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.gameId = params['id'];
            this.getGameDetails();
            this.getGameTournaments();
        });
    }

    getGameDetails(): void {
        this.gamesService.get(this.gameId).subscribe(g => {
            this.game = g;
        });
    }

    getGameTournaments(): void {
        const params = this.tournamentsService.generateParams({game: this.gameId});
        this.tournamentsService.getList(params).subscribe(t => {
            this.tournaments = t;
        });
    }

    setNotifications(): void {
        alert('STUBBED - Set Notifications');
    }

    share() {
        this.shareService.trigger(
            this.game.name,
            'View this game on PlayerHQ, powered by Jackpot Rising',
            `/games/${this.gameId}`
        );
    }

    dialogArcade(): void {
        this.dialogService.triggerDialogMessage({
            title: 'Play on Arcade',
            message: 'Arcade games are not currently available. Please check back soon!'
        }).subscribe(res => {});
    }

    dialogScreenshot(screenshot: any): void {
        this.dialogService.triggerDialogImage({
            title: screenshot.caption,
            image: screenshot.url,
            width: '1280px'
        }).subscribe(res => {});
    }

    // getIosData (id) {
    //     this.http.iTunesLookup(id).subscribe(res => {
    //         if (res !== undefined && res.results.length > 0 && res.results[0].screenshotUrls !== undefined) {
    //             this.screenshots = res.results[0].screenshotUrls;
    //         }
    //     });
    // }
}

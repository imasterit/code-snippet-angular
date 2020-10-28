import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { environment } from './../../../../environments/environment';

import { TournamentsService } from './../tournaments.service';
import { ContextService } from './../../../shared/services/context.service';

@Component({
    selector: 'app-tournament-list',
    templateUrl: './tournament-list.component.html',
    styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
    public env: any = environment;

    public pageLoaded: boolean = false;
    public tournaments = {
        featured: {data: undefined},
        sdk: {vertical: 1, state: 2, data: undefined},
        arcade: {vertical: 2, state: 2, data: undefined},
        overwolf: {vertical: 3, state: 2, data: undefined},
        apilink: {vertical: 4, state: 2, data: undefined},
        topgolf: {vertical: 5, state: 2, data: undefined}
    };
    public formSearch = this.fb.group({
        search: [undefined]
    });
    public searchForm: boolean = false;

    constructor(
        public route: ActivatedRoute,
        private fb: FormBuilder,
        public tournamentService: TournamentsService,
        public contextService: ContextService,
    ) {
        // Handle Search Param from URL
        const paramSearch = this.route.snapshot.params.search;
        if (paramSearch) { this.formSearch.value.search = paramSearch; }
    }

    ngOnInit() {
        this.getFeaturedTournaments();
        this.getTournaments(this.tournaments.sdk.vertical, this.tournaments.sdk.state); // sdk
        this.getTournaments(this.tournaments.arcade.vertical, this.tournaments.arcade.state); // arcade
        this.getTournaments(this.tournaments.overwolf.vertical, this.tournaments.overwolf.state); // overwolf
        this.getTournaments(this.tournaments.apilink.vertical, this.tournaments.apilink.state); // apilink
        this.getTournaments(this.tournaments.topgolf.vertical, this.tournaments.topgolf.state); // topgolf
    }

    getFeaturedTournaments(): void {
        // Generate Params
        const params = this.tournamentService.generateParams({
            featured: 'true'
        });
        // Get Tournaments List
        this.tournamentService.getList(params).subscribe(t => {
            this.tournaments['featured'].data = t;
        });
    }

    // Verticals - 1:sdk, 2:arcade, 3:overwolf, 4:apilink, 5:topgolf
    // States - 1:upcoming, 2:active, 3:complete, 4:settled, 5:archived
    getTournaments(vertical?: number, state?: number): void {
        // Generate Params
        const params = this.tournamentService.generateParams({
            vertical: vertical,
            state: state
        });
        // Determine Tounrmanet Object Key
        let tournObjKey;
        switch (vertical) {
            case(1): tournObjKey = 'sdk'; break;
            case(2): tournObjKey = 'arcade'; break;
            case(3): tournObjKey = 'overwolf'; break;
            case(4): tournObjKey = 'apilink'; break;
            case(5): tournObjKey = 'topgolf'; break;
        }
        // Get Tournaments List
        this.tournamentService.getList(params).subscribe(t => {
            this.tournaments[tournObjKey].data = t;
            // Page Loaded
            this.pageLoaded = true;
        });
    }

    setRowState(tournamentSet: any, selectedState: number): void {
        this.getTournaments(tournamentSet.vertical, selectedState);
    }
}

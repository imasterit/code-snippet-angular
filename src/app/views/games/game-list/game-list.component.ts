import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ContextService } from './../../../shared/services/context.service';
import { GamesService } from './../games.service';

@Component({
    selector: 'app-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

    public games;
    public filterVertical: string = 'all';
    public formSearch = this.fb.group({
        search: [undefined]
    });
    public searchForm: boolean = false;

    constructor(
        public route: ActivatedRoute,
        private fb: FormBuilder,
        public contextService: ContextService,
        public gamesService: GamesService
    ) {
        // Handle Search Param from URL
        const paramSearch = this.route.snapshot.params.search;
        if (paramSearch) { this.formSearch.value.search = paramSearch; }
    }

    ngOnInit() {
        this.getGames();
    }

    // Verticals - 1:sdk, 2:arcade, 3:overwolf, 4:apilink
    getGames(vertical?: string): any {
        // Prune ALL (value: 'all')
        if (vertical === 'all') { vertical = undefined; }
        // Generate Params
        const params = this.gamesService.generateParams({
            vertical: vertical,
        });
        // Get Games List
        this.gamesService.getList(params).subscribe(g => {
            this.games = g;
        });
    }
}

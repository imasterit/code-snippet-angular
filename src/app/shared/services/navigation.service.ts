import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    public player;
    public _routes = [
        [
            {mobile: true, short: 'Tournaments', long: 'Tournaments', fa_prefix: 'fas', fa_icon: 'fa-trophy', route: '/tournaments', description: 'View jackpots and leaderboard.'},
            {mobile: true, short: 'Games', long: 'Games', fa_prefix: 'fas', fa_icon: 'fa-gamepad', route: '/games', description: 'Browse the available games.'},
            {mobile: true, short: 'Hub', long: 'The Hub', fa_prefix: 'fas', fa_icon: 'fa-fire', route: '/hub', description: 'Activity, apps, and social hub.'},
        ],
        [
            {mobile: false, short: 'Help', long: 'Help & Support', fa_prefix: 'fas', fa_icon: 'fa-question-circle', route: '/support', description: 'Get additional help and support.'},
            {mobile: false, short: 'Terms', long: 'Terms & Conditions', fa_prefix: 'fas', fa_icon: 'fa-file-alt', route: '/terms', description: 'View the terms & conditions.'}
        ]
    ];

    constructor() {}

    get routes() {
        return this._routes;
    }

    mobileRoutes() {
        const routesFlattened = [].concat(...this._routes);
        const routesFiltered = routesFlattened.filter(r => {
            if (r.mobile === true) { return r; }
        });
        return routesFiltered;
    }
}

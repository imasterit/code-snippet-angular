import * as Pusher from 'pusher-js';

import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

import { CookieService, CookieOptions } from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class PusherService {
    private baseUrl: String = environment.baseUrl;

    public pusher: any;

    public channelLeaderboard: any;
    public channelSyncPublic: any;
    public channelSyncPresence: any;

    constructor(
        private cookieService: CookieService,
    ) {}

    init() {
        if (this.pusher === undefined) {
            const jrAuth = JSON.parse(this.cookieService.get('jr_token'));
            const authEndpoint = `${this.baseUrl}/pusher/auth`;

            // Init for Game Sync (Arcade)
            this.pusher = new Pusher(environment.pusher.key, {
                cluster: environment.pusher.cluster,
                encrypted: true,
                authEndpoint: authEndpoint,
                auth: {
                    headers: {
                        'Authorization': `${jrAuth.token_type} ${jrAuth.access_token}`
                    }
                }
            });
        }
    }

    // Leaderboard: leaderboard-:contestId-:tierId
    subChannelLeaderboard(contestId, tierId) {
        this.channelLeaderboard = this.pusher.subscribe(`leaderboard-${contestId}-${tierId}`);
    }

    // Public: arcade-:id
    subChannelSyncPublic(id: number) {
        this.channelSyncPublic = this.pusher.subscribe(`arcade-${id}`);
    }

    // Presence: presence-arcade-:id
    subChannelSyncPresence(id: number) {
        // console.log(`sub - ${id}`);
        this.channelSyncPresence = this.pusher.subscribe(`presence-arcade-${id}`);
    }

    pusherDisconnect() {
        if (this.pusher !== undefined) {
            this.pusher.disconnect();
            this.pusher = undefined;
        }
    }
}

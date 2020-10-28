declare var Twitch: any;

import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-twitch',
    templateUrl: './twitch.component.html',
    styleUrls: ['./twitch.component.scss']
})
export class TwitchComponent implements AfterViewInit {

    constructor() { }

    ngAfterViewInit() {
        const twitch = new Twitch.Embed('twitch-embed', {
            width: '100%',
            height: '480px',
            theme: 'dark',
            channel: 'jackpotrising'
        });
    }

}

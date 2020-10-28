import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../shared/services/http.service';

@Component({
    selector: 'app-hub',
    templateUrl: './hub.component.html',
    styleUrls: ['./hub.component.scss']
})
export class HubComponent implements OnInit {
    public androidLink: string;

    constructor(
        private http: HttpService
    ) {}

    ngOnInit() {
        // DISABLE - was not yet ported over to API v4
        this.http.get('/apps', false).subscribe(res => {
            this.androidLink = res[0].url;
        });
    }

    openUrl(url: string): void {
        const win = window.open(url, '_blank');
        win.focus();
    }

    getAndroidApp(): void {
        if (window.confirm('Once you download, you will be prompted with some security permissions. This is necessary to install PlayerHQ on Android.')) {
            window.location.href = this.androidLink;
        }
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-webview',
    templateUrl: './webview.component.html',
    styleUrls: ['./webview.component.scss']
})
export class WebviewComponent implements OnInit, OnDestroy {

    public route_;
    public title: string;
    public source: string;

    constructor(
        public route: ActivatedRoute
    ) {}

    ngOnInit() {
        // Set iframe source based on route data
        this.route_ = this.route.data.subscribe(data => {
            switch (data.src) {
                case(0):
                    this.title = 'Help and Support';
                    this.source = 'https://support.jackpotrising.com/#/';
                    break;
                case(1):
                this.title = 'Terms and Conditions';
                    this.source = 'https://terms.jackpotrising.com/';
                    break;
                default:
                    this.source = 'https://jackpotrising.com/';
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.route_.unsubscribe();
    }
}

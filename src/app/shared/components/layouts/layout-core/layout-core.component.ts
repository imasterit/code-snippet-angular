import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from './../../../services/sidenav.service';
import { FullscreenService } from './../../../services/fullscreen.service';

@Component({
    selector: 'app-layout-core',
    templateUrl: './layout-core.component.html',
    styleUrls: ['./layout-core.component.scss'],
})
export class LayoutCoreComponent implements OnInit, AfterViewInit {
    @ViewChild('fullscreen', {static: true}) fullscreen;

    @Input() loading: boolean = false;
    @Input() left: boolean = false;
    @Input() right: boolean = false;
    @Input() fullbleed: boolean = false;
    @Input() background: string;

    @ViewChild('drawer', { static: false }) drawer: MatSidenav; // #drawer
    @ViewChild('navLeft', { static: false }) navLeft: MatSidenav; // #navLeft
    @ViewChild('navRight', { static: false }) navRight: MatSidenav; // #navRight

    public drawerState: boolean = true;
    public layoutMobile: boolean;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private sidenavService: SidenavService,
        private fullscreenService: FullscreenService
    ) {}

    ngOnInit() {
        this.fullscreenService.fullscreenState.subscribe(res => {
            if (res === true) { this.toggleFullscreen(); }
        });
    }

    ngAfterViewInit() {
        this.sidenavService.registerNavLeft(this.navLeft);
        this.sidenavService.registerNavRight(this.navRight);

        this.layoutBreakpoints();
    }

    layoutBreakpoints() {
        setTimeout(() => { // console error bugfix
            this.breakpointObserver
                .observe(['(max-width: 1199px)'])
                .subscribe((state: BreakpointState) => {
                    this.layoutMobile = state.matches;
                        this.layoutMobile ? this.drawer.close() : this.drawer.open();
                        // Responsive Nav States
                        if (this.left) {
                            this.layoutMobile ? this.navLeft.close() : this.navLeft.open();
                        }
                        if (this.right) {
                            this.layoutMobile ? this.navRight.close() : this.navRight.close();
                        }
                });
        }, 0);
    }

    generateBackgroundStyle(): any {
        return this.background ? `url(${this.background})` : undefined;
    }

    toggleFullscreen(): void {
        setTimeout(() => {
            const elem = this.fullscreen.elementRef.nativeElement.children[0];
            if (!document.fullscreenElement) {
                elem.requestFullscreen(); // .catch(err => {
                    // alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                // });
            } else {
                document.exitFullscreen();
            }
        }, 0);
    }
}

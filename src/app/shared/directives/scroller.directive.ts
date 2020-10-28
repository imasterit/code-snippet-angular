// Docs: https://github.com/mkay581/scroll-js
import { scrollTo } from 'scroll-js';

import { AfterViewInit } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

import { FullscreenService } from './../services/fullscreen.service';

@Directive({
    selector: '[appScroller]'
})
export class ScrollerDirective implements AfterViewInit {
    private fullscreenEnabled: boolean = false;

    constructor(
        private el: ElementRef,
        private fullscreenService: FullscreenService
    ) {}

    ngAfterViewInit() {
        this.fullscreenService.fullscreenState.subscribe(res => {
            this.fullscreenEnabled = res;
            // If fullscreen, start the loop cycle
            if (this.fullscreenEnabled === true) { this.scrollLoopCycle(); }
        });
    }

    scrollLoopCycle() {
        const elem = this.el.nativeElement.children[0].children[1].children[0];
        // Scroll to Bottom
        scrollTo(elem, { top: elem.scrollHeight, duration: elem.scrollHeight * 10 }).then(() => {
            // (NOTE: elem.scrollHeight is oversized, so it will pause at the bottom automatically)
            // Scroll to Top
            scrollTo(elem, { top: 0, duration: 1 }).then(() => {
                // Pause at top for X seconds
                setTimeout(() => {
                    // If fullscreen, continue the loop another cycle
                    if (this.fullscreenEnabled === true) { this.scrollLoopCycle(); }
                }, 5000);
            });
        });
    }
}

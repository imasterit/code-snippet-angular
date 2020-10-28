// Custom Carousel Component

import { Component, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {
    @Input() label: string = 'Label Missing';
    @Input() data: any;

    @ViewChild('carousel', {static: false}) carousel; // #carousel
    @ViewChild('left', {static: false}) left; // #left
    @ViewChild('right', {static: false}) right; // #right

    public offset = 0;

    constructor() {}

    ngAfterViewInit() {
        const carousel = this.carousel.nativeElement;
        const navLeft = this.left._elementRef.nativeElement;
        const navRight = this.right._elementRef.nativeElement;

        navLeft.addEventListener('click', () => {
            this.carouselScroll(carousel, carousel.offsetWidth, true, 500);
        });
        navRight.addEventListener('click', () => {
            this.carouselScroll(carousel, carousel.offsetWidth, false, 500);
        });
    }

    carouselScroll(element, to: number, direction: boolean, duration: number) {
        const perTick = to / duration * 3;

        // Scroll during duration
        const scroll = setInterval(() => {
            direction === true ? element.scrollLeft -= perTick : element.scrollLeft += perTick; // left / right
        }, 5);

        // Stop after duration
        setTimeout(() => { clearInterval(scroll); return; }, duration);
    }
}

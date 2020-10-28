import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    public navLeft: MatSidenav;
    public navRight: MatSidenav;

    constructor() {}

    registerNavLeft(navLeftViewChild: MatSidenav): MatSidenav {
        this.navLeft = navLeftViewChild;
        return navLeftViewChild;
    }

    registerNavRight(navRightViewChild: MatSidenav): void {
        this.navRight = navRightViewChild;
    }

    toggle(side: string): string {
        if (side === 'left') { this.navLeft.toggle(); }
        if (side === 'right') { this.navRight.toggle(); }
        return side;
    }

    close(side: string): string {
        if (side === 'left') { this.navLeft.close(); }
        if (side === 'right') { this.navRight.close(); }
        return side;
    }
}

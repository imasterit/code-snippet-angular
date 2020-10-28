import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(
        public snackBar: MatSnackBar,
    ) {}

    // Simple Snackbar with 'close' action
    trigger(message: string): any {
        this.snackBar.open(message, 'Dismiss', {
            duration: 5000,
            panelClass: ['snackbar']
        });
        return message;
    }
}

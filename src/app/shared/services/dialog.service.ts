import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';

import { DialogMessageComponent } from 'src/app/shared/components/dialogs/dialog-message/dialog-message.component';
import { DialogListComponent } from './../components/dialogs/dialog-list/dialog-list.component';
import { DialogImageComponent } from '../components/dialogs/dialog-image/dialog-image.component';

import { DialogMessage, DialogList, DialogImage } from '../interfaces/dialogs.interface';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(
        private dialog: MatDialog,
    ) {}

    triggerDialogMessage(d: DialogMessage): Observable<any> {
        const dialogRef = this.dialog.open(DialogMessageComponent, {
            width: '560px',
            data: { title: d.title, message: d.message, confirm: d.confirm }
        });
        return dialogRef.afterClosed();
    }

    triggerDialogList(d: DialogList): Observable<any> {
        const dialogRef = this.dialog.open(DialogListComponent, {
            width: '560px',
            data: {title: d.title, message: d.message, list: d.list}
        });
        return dialogRef.afterClosed();
    }

    triggerDialogImage(d: DialogImage): Observable<any> {
        const dialogRef = this.dialog.open(DialogImageComponent, {
            width: d.width, // passed dynamically, see interface
            data: {title: d.title, message: d.message, image: d.image}
        });
        return dialogRef.afterClosed();
    }

}

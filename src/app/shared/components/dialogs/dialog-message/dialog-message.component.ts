import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogMessage } from './../../../interfaces/dialogs.interface';

@Component({
    selector: 'app-dialog-message',
    templateUrl: './dialog-message.component.html',
    styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogMessage
    ) {}

}

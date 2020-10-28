import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogList } from './../../../interfaces/dialogs.interface';

@Component({
    selector: 'app-dialog-list',
    templateUrl: './dialog-list.component.html',
    styleUrls: ['./dialog-list.component.scss']
})
export class DialogListComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogListComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogList
    ) {}

    select(item: any): void {
        this.dialogRef.close(item);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

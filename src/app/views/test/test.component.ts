import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MatTableDataSource } from '@angular/material';

// Services
import { HttpService } from './../../shared/services/http.service';
import { SidenavService } from './../../shared/services/sidenav.service';
import { AccountService } from './../../shared/services/account.service';
import { DialogService } from './../../shared/services/dialog.service';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { OverwolfService } from './../../shared/services/overwolf.service';


// Table Data
import { STATES } from './table-data';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    public account: any;
    public logo: string;

    // Sections
    public sections = [
        { id: 10, name: 'Overwolf' },
        { id: 9, name: 'Account' },
        { id: 8, name: 'Status Codes' },
        { id: 7, name: 'Table' },
        { id: 6, name: 'Menu' },
        { id: 5, name: 'Modals' },
        { id: 4, name: 'Forms' },
        { id: 2, name: 'Sidenavs' },
        { id: 1, name: 'Buttons' },
        { id: 0, name: 'Typography' },
    ];

    // Form(s)
    public formProfile = this.fb.group({
        firstName: [undefined, Validators.required],
        lastName: [undefined],
        address: this.fb.group({
            street: [undefined],
            city: [undefined],
            state: [undefined],
            zip: [undefined],
        }),
        comments: [undefined]
    });

    // Table
    private displayedColumns: string[] = ['id', 'name', 'code', 'country_code', 'can_play_for_money', 'can_play_for_free_money', 'can_play_for_free', 'can_play_sweeps'];
    private dataSource: any;

    // Overwolf
    public isOverwolfWrapper: boolean = false;
    public overwolfGlobalStore: any;

    constructor(
        private fb: FormBuilder,
        public http: HttpService,
        public sidenavService: SidenavService,
        private accountService: AccountService,
        private dialogService: DialogService,
        private snackbarService: SnackbarService,
        public overwolfService: OverwolfService,
    ) {
        overwolfService.isOverwolfWrapper.subscribe(res => { this.isOverwolfWrapper = res; });
        overwolfService.overwolfGlobalStore.subscribe(res => { this.overwolfGlobalStore = res; });
    }

    ngOnInit() {
        this.accountService.account.subscribe(a => this.account = a); // account
        this.getTableData();
    }

    triggerStatus(code: number) {
        this.http.get(`/status/${code}`, false, null).subscribe();
    }

    submitFormProfile(): void {
        console.log(this.formProfile.value);
    }

    // Dialogs ---

    openDialog(d: any): void {
        this.dialogService.triggerDialogMessage(d).subscribe(res => {
        });
    }
    openDialogList(): void {
        const data = {
            title: 'List Title',
            message: 'List Description',
            list: [{id: 0, label: 'Item 1'}, {id: 1, label: 'Item2'}]
        };
        this.dialogService.triggerDialogList(data).subscribe(res => {
            console.log(res);
        });
    }
    openDialogImage(): void {
        const data = {
            title: 'Image Title',
            message: 'Image Description',
            image: 'https://via.placeholder.com/1280x720',
            width: '1280px'
        };
        this.dialogService.triggerDialogImage(data).subscribe(res => {});
    }

    openSnackbar(d): void {
        this.snackbarService.trigger(d);
    }

    // Table ---

    getTableData() {
        this.dataSource = new MatTableDataSource(STATES);
    }

    selectTableRow(row) {
        alert(`You selected row ID: ${row.id}`);
    }
}

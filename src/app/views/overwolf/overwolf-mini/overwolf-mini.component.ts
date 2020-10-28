import { Component, OnInit } from '@angular/core';

import { OverwolfService } from './../../../shared/services/overwolf.service';

@Component({
    selector: 'app-overwolf-mini',
    templateUrl: './overwolf-mini.component.html',
    styleUrls: ['./overwolf-mini.component.scss']
})
export class OverwolfMiniComponent implements OnInit {
    public overwolfGlobalStore: any;

    constructor(
        private overwolfService: OverwolfService
    ) {}

    ngOnInit() {
        this.overwolfService.overwolfGlobalStore.subscribe(res => { this.overwolfGlobalStore = res; });
    }
}

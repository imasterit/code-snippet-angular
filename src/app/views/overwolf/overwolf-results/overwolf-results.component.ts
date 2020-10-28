import { Component, OnInit } from '@angular/core';
import { OverwolfService } from './../../../shared/services/overwolf.service';

@Component({
    selector: 'app-overwolf-results',
    templateUrl: './overwolf-results.component.html',
    styleUrls: ['./overwolf-results.component.scss']
})
export class OverwolfResultsComponent implements OnInit {
    public overwolfGlobalStore: any;

    constructor(
        private overwolfService: OverwolfService
    ) {}

    ngOnInit() {
        this.overwolfService.overwolfGlobalStore.subscribe(res => { this.overwolfGlobalStore = res; });
    }

    help(): void {
        alert('Help was triggered!');
    }
}

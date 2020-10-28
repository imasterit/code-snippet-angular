import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContextService } from './../../../services/context.service';
import { ShareService } from './../../../services/share.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() type: string = 'tournament';
    @Input() data: any;

    @Output() platform: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public ctx: ContextService,
        private shareService: ShareService
    ) {}

    ngOnInit() {}

    selectPlatform(p: any): void {
        this.platform.emit(p);
    }

    share($event, title: string, text: string, route: string): void {
        $event.stopPropagation();
        this.shareService.trigger(title, text, route);
    }
}

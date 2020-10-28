import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from './../../../services/http.service';

@Component({
    selector: 'app-jrm-avatars',
    templateUrl: './avatars.component.html',
    styleUrls: ['./avatars.component.scss'],
})
export class AvatarsComponent implements OnInit {
    @Input() random: boolean = false;

    @Input() avatar: string;
    @Output() avatarChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() color: string;
    @Output() colorChange: EventEmitter<string> = new EventEmitter<string>();

    public avatars;
    public avatarIndex: number = 1;

    public colors: string[] = [
        '#DC334A',
        '#C02136',
        '#78F2FF',
        '#007D81',
        // ---
        '#2ecc71',
        '#27ae60',
        '#3498db',
        '#2980b9',
        '#9b59b6',
        '#8e44ad',
        '#f1c40f',
        '#f39c12',
        '#e67e22',
        '#d35400',
        '#C3C3C3',
        '#141414',
    ];
    public colorIndex: number = 0;

    constructor(
        public http: HttpService,
    ) {}

    ngOnInit() {
        this.getAvatars();
    }

    getAvatars() {
        // Get Avatars
        this.http.get('/constants', false).subscribe(res => {
            this.avatars = res.avatars;

            // If: Randomize Enabled
            if (this.random === true) {
                this.pickAvatar( this.randomRangeValue(1, this.avatars.length) );
                this.pickColor( this.randomRangeValue(0, this.colors.length) );
                return;
            }
            // If: Avatar Provided
            if (this.avatar) {
                this.avatars.find((a, i) => {
                    if (i !== 0 && a.url === this.avatar) {
                        this.avatarIndex = i; return;
                    }
                });
            }
            // If: Color Provided
            if (this.color && this.colors.indexOf(this.color) !== -1) {
                this.colorIndex = this.colors.indexOf(this.color);
            }
        });
    }

    randomRangeValue(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min;
    }

    pickAvatar(i: number) {
        this.avatarIndex = i;
        this.avatarChange.emit(this.avatars[this.avatarIndex].url);
    }

    pickColor(i: number) {
        this.colorIndex = i;
        this.colorChange.emit(this.colors[this.colorIndex]);
    }

}

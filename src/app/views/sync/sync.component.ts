// https://github.com/cozmo/jsQR
import jsQR from 'jsqr';

import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from './../../shared/services/http.service';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { DialogService } from './../../shared/services/dialog.service';
import { PusherService } from './../../shared/services/pusher.service';

@Component({
    selector: 'app-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements AfterViewInit, OnDestroy {

    @ViewChild('vid', {static: false}) vid;
    public video;
    public stream;

    @ViewChild('can', {static: false}) can;
    public canvasElement;
    public canvas;
    public arcade;

    public loading: boolean = true;
    public qrCodeData: any;
    public playingState: boolean = false;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private http: HttpService,
        private snackbarService: SnackbarService,
        public pusherService: PusherService,
        private dialogService: DialogService
    ) {}

    ngAfterViewInit() {
        // this.video = this.vid.nativeElement;
        // this.canvasElement = this.can.nativeElement;
        // this.canvas = this.can.nativeElement.getContext('2d');

        //this.startCamera();
    }

    ngOnDestroy() {
        // Stop webcam stream
        try {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
            }
        } catch (e) { console.error(e); }
        // Clear
        this.vid = undefined;
        this.video = undefined;
        this.stream = undefined;
        this.can = undefined;
        this.canvasElement = undefined;
        this.canvas = undefined;
    }

    startCamera() {
        try {
            // Use facingMode: environment to attemt to get the front camera on phones
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then((stream) => {
                this.stream = stream;

                this.video.srcObject = stream;
                this.video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
                this.video.play();
                requestAnimationFrame(() => { this.tick(); });
            });
        } catch (e) { console.error(e); }
    }

    tick() {
        if (this.video !== undefined && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
            this.loading = false;

            this.canvasElement.height = this.video.videoHeight;
            this.canvasElement.width = this.video.videoWidth;
            this.canvasElement.hidden = false;

            this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
            const imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);

            const code = jsQR(imageData.data, imageData.width, imageData.height); // { inversionAttempts: 'dontInvert' }
            if (code) {
                const hexColor = '#78f2ff';
                this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, hexColor);
                this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, hexColor);
                this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, hexColor);
                this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, hexColor);

                // Logic Gate: Set and Submit Code
                if (this.qrCodeData === undefined) {
                    this.qrCodeData = code.data;
                    this.submitCode();
                }
            }
        }
        requestAnimationFrame(() => { this.tick(); });
    }

    drawLine(begin, end, color) {
        this.canvas.beginPath();
        this.canvas.moveTo(begin.x, begin.y);
        this.canvas.lineTo(end.x, end.y);
        this.canvas.lineWidth = 5;
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
    }

    enterCode(): void {
        this.qrCodeData = window.prompt('Enter the code found on the QR image');
        if (this.qrCodeData && this.qrCodeData !== undefined) { this.submitCode(); }
    }

    submitCode(): void {
        this.http.post(`/tournaments/sync/${this.qrCodeData}`, {}, true).subscribe(res => {
            this.snackbarService.trigger(res.message);
            this.arcade = res.device;
            this.qrCodeData = undefined; // reset for logic gate
            this.startPusher();
        });
    }

    startPusher() {
      console.log(this.arcade.id);
        // Pusher: Init
        this.pusherService.init();

        // Pusher: Subscribe to Channels
        this.pusherService.subChannelSyncPublic(this.arcade.id);

        // Event: Connect to Game (*)
        // this.pusherService.channelSyncPublic.bind('start-game', pusherData => {
            // this.snackbarService.trigger({message: `${pusherData.user_name} connected to game.`});
        // });
        // Event: Play Game - 'play-game' (device only)
        // ...
        // Event: Game Start
        // This is when the arcade play begins "Attempt In Progress in Native App"
        this.pusherService.channelSyncPublic.bind('game-started', pusherData => {
            this.playingState = true
        });
        // Event: Game Error
        // If the user does not have the correct funds or someone else is already logged into the device
        this.pusherService.channelSyncPublic.bind('game-error', pusherData => {
            this.endPusher();
        });
        // Event: Game Ended
        // Game has ended
        this.pusherService.channelSyncPublic.bind('game-end', pusherData => {
            this.playingState = false
            this.endPusher();
            this.router.navigate(['/sync']);
        });
    }

    endPusher() {
        // This will happen automatically if users browse away or close window.
        // https://pusher.com/docs/client_api_guide/client_connect#disconnecting
        this.pusherService.pusherDisconnect();
    }
}

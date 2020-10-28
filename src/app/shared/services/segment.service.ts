// Segment Analytics.js -- https://segment.com/docs/sources/website/analytics.js/#getting-started

// USAGE:

// 1. import this service into the file you want to ue it:
// import { SegmentService } from './shared/services/segment.service';

// 2. inject the servece into the constructor (notice lowercase vs uppercase):
// public segmentService: SegmentService,

// 3. You can then use it as documented, just make sure to pute the service reference first:
// segmentService.analytics.identify({ ... });

declare let analytics: any;
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SegmentService {
    public analytics = analytics;

    constructor() {}
}

import { Injectable } from '@angular/core';
import * as moment from 'moment'; // add this 1 of 4
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DateTimeService {

    constructor() {}

    dateTimeFormat(d) {
        return moment(d).format('M-DD-YY @ h:mm A');
    }

    dateToBirthday(d) {
        return moment(d).format('YYYY-MM-DD');
    }

    getAge(d) {
        return moment().diff(d, 'years');
    }

    toServerFormat(d) {
        return moment(d).format();
    }

    useTimeTicker(start, end) {
        const now = moment().local();
              start = moment(start).local();
              end = moment(end).local();

        const diffStartSec = moment(start).diff(now, 'seconds'),
              diffEndSec = moment(end).diff(now, 'seconds'),
              diffEndDays = end.diff(now, 'days'); // ex: 1 day

        // in progress
        if (diffStartSec < 0 && diffEndSec > 0) {
            // ends within 7 days
            return diffEndDays <= 7 ? true : false;
        } else {
            return false;
        }
    }

    timeTicker(text: string, datetime: any, tickdown: boolean): BehaviorSubject<string> {
        const timestamp = new BehaviorSubject<string>('Loading...');
        const eventTime = moment(datetime).unix(),
            currentTime = moment().unix(),
            diffTime = eventTime - currentTime,
            interval = 1000;
        let duration = moment.duration(diffTime * 1000, 'milliseconds');
        // if time to countdown
        if (diffTime > 0) {
            setInterval(() => {
                if (tickdown === true) {
                    // Tick Down
                    duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
                } else {
                    // Tick Up
                    duration = moment.duration(duration.asMilliseconds() + interval, 'milliseconds');
                }
                const d = moment.duration(duration).days(),
                    h = moment.duration(duration).hours(),
                    m = moment.duration(duration).minutes(),
                    s = moment.duration(duration).seconds();
                timestamp.next(`${text}${d}d ${h}h ${m}m ${s}s`);
            }, interval);
        } else {
            timestamp.next('Ended!');
        }
        return timestamp;
    }

    dateTimeStringFromNow(start, end) {
        const now = moment().local();
              start = moment(start).local();
              end = moment(end).local();

        const diffStartSec = moment(start).diff(now, 'seconds');
        const diffEndSec = moment(end).diff(now, 'seconds');

        // not yet started
        if (diffStartSec > 0 && diffEndSec > 0) {
            return `Starts ${moment(start).fromNow()}`;
        }
        // in progress
        if (diffStartSec < 0 && diffEndSec > 0) {
            return `Ends ${moment(end).fromNow()}`;
        }
        // completed
        if (diffStartSec < 0 && diffEndSec < 0) {
            return `Ended ${moment(end).fromNow()}`;
        }
    }
}

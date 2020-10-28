import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'html'
})
export class HtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(url) {
        return this.sanitizer.bypassSecurityTrustHtml(url);
    }
}

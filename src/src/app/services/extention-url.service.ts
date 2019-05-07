import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExtentionUrlService {

    private hasUrlToSet: boolean = false;
    private urlToSet: string; 

    get hasUrlToSetGetter() { return this.hasUrlToSet };
    get urlToSetGetter() { return this.urlToSet };

    urlSet() { 
        this.hasUrlToSet = false;
        this.urlToSet = undefined;
    }

    registerUrlToSet(url: string) { 
        this.hasUrlToSet = true; 
        this.urlToSet = url;
    }
}
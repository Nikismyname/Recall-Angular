import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVideoPublicIndex } from './models/video/video-public-index';

@Injectable({
    providedIn: 'root'
})
export class PublicService { 
    constructor(
        private http: HttpClient
    ) { }
    
    getLatest = () => {
        return this.http.get<IVideoPublicIndex[]>("Public/GetLatest");
    }
}
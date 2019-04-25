import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INavIndex } from './models/navigation/nav-index';
import { IVideoCreate } from './models/video/video-create';

@Injectable({
    providedIn: 'root'
})
export class VideoService {

    constructor(
        private http: HttpClient
    ) {}

    create = (data: IVideoCreate) => { 
        return this.http.post<INavIndex>("Video/Create", JSON.stringify(data));
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INavIndex } from './models/navigation/nav-index';
import { IReorderData } from './models/others/reorder-data';
import { IVideoIndex } from './models/navigation/video-index';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private http: HttpClient
    ) {}

    getIndex = (id: number) => { 
        return this.http.get<INavIndex>("Navigation/GetIndex/"+id);
    }

    reotderVideos = (data: IReorderData) => { 
        return this.http.post<void>("Navigation/ReorderVodeos", JSON.stringify(data));
    }

    reorderDirectories = (data: IReorderData) => { 
        return this.http.post<void>("Navigation/ReorderDirectories", JSON.stringify(data));
    }

    getVideoIndex = (videoId: number) => { 
        return this.http.post<IVideoIndex>("Navigation/GetVideoIndex", JSON.stringify(videoId));
    }
}
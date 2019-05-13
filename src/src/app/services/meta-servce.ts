import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITopicCreate } from './models/meta/topic-create';
import { ITopicFolder } from './models/meta/topic-folder';
import { IAddVideoData } from './models/meta/add-video-data';

@Injectable({
    providedIn: 'root'
})
export class MetaService {

    constructor(
        private http: HttpClient
    ) { }

    createTopic = (data: ITopicCreate) => {
        return this.http.post<ITopicFolder>("Meta/CreateTopic", JSON.stringify(data));
    }

    addVideo = (data: IAddVideoData) => { 
        return this.http.post<void>("Meta/AddVideoToTopic", JSON.stringify(data));
    } 

    getAllForSelect = (all: boolean) => {
        return this.http.post<ITopicFolder[]>("Meta/GetAllTopicsForSelect", JSON.stringify(all));
    }

    getAllTopicsForVideo = (videoId: number) => {
        return this.http.post<ITopicFolder[]>("Meta/GetAllTopicsForVideo", JSON.stringify(videoId));
    }
}
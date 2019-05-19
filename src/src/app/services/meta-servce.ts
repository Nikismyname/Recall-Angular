import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITopicCreate } from './models/meta/topic-create';
import { ITopicFolder } from './models/meta/topic-folder';
import { IAddVideoData } from './models/meta/add-video-data';
import { IRemoveVideoFromTopicData } from './models/meta/remove-video-from-topic-data';
import { IAllOptions } from './models/options/all-options';

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

    addVideoToTopic = (data: IAddVideoData) => {
        return this.http.post<void>("Meta/AddVideoToTopic", JSON.stringify(data));
    }

    removeVideoFromTopic = (data: IRemoveVideoFromTopicData) => {
        return this.http.post<void>("Meta/RemoveVideoFromTopic", JSON.stringify(data));
    }

    getAllTpicsForSelect = (all: boolean) => {
        return this.http.get<ITopicFolder[]>("Meta/GetAllTopicsForSelect/" + all);
    }

    getAllTopicsForVideo = (videoId: number) => {
        return this.http.post<ITopicFolder[]>("Meta/GetAllTopicsForVideo", JSON.stringify(videoId));
    }

    /* #region  Options */
    saveOptions = (data: IAllOptions) => {
        return this.http.post<void>("Meta/SaveOptions", JSON.stringify(data));
    }
    /* #endregion */
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVideoCreate } from './models/video/video-create';
import { IVideoEdit } from './models/video/video-edit';

@Injectable({
    providedIn: 'root'
})
export class VideoService {

    constructor(
        private http: HttpClient
    ) {}

    create = (data: IVideoCreate) => { 
        return this.http.post<void>("Video/Create", JSON.stringify(data));
    }

    getForEdit = (id: number) => { 
        return this.http.post<IVideoEdit>("Video/GetForEdit", JSON.stringify(id)); 
    }
}
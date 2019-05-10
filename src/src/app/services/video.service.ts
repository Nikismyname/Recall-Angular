import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVideoCreate } from './models/video/video-create';
import { IVideoEdit } from './models/video/video-edit';
import { IVideoSave } from './models/video/video-save';
import { IVideoIndex } from './models/navigation/video-index';
import { IVideoMove } from './models/video/video-move';
import { IVideoMoveWithOrigin } from './models/video/video-move-with-origin';
import { IExtensionAddData } from './models/video/extension-add-data';
import { IConvertExtensionData } from './models/video/convert-extension-data';
import { IExtensionAddDataWithId } from './models/video/extension-add-data-with-id';

@Injectable({
    providedIn: 'root'
})
export class VideoService {

    constructor(
        private http: HttpClient
    ) {}

    create = (data: IVideoCreate) => { 
        return this.http.post<IVideoIndex>("Video/Create", JSON.stringify(data));
    }

    getForEdit = (id: number) => { 
        return this.http.post<IVideoEdit>("Video/GetForEdit", JSON.stringify(id)); 
    }

    save = (data: IVideoSave) => { 
        return this.http.post<number[][]>("Video/Save", JSON.stringify(data)); 
    } 

    delete = (id: number) => { 
        return this.http.post<void>("Video/Delete", JSON.stringify(id));
    } 

    move = (data: IVideoMove) => {
        return this.http.post<IVideoMoveWithOrigin>("Video/MoveVideo", JSON.stringify(data));
    }



    addExtension = (data: IExtensionAddData) => { 
        return this.http.post<void>("Video/AddExtensionVideo", JSON.stringify(data));
    } 

    getExtensionVideos = () => { 
        return this.http.get<IExtensionAddDataWithId[]>("Video/GetExtesionVideos");
    }

    ConvertExtensionVideo = (data: IConvertExtensionData) => { 
        return this.http.post<IVideoIndex>("Video/ConvertExtensionVideo", JSON.stringify(data));
    }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDirectoryCreate } from './models/directory/directory-create';
import { IDirChildIndex } from './models/navigation/dir-child-index';
import { IFolderSelectData } from './models/others/folder-select-data';
import { IDirectoryEdit } from './models/directory/directory-edit';
import { IDirWithItemsSelect } from './models/others/dir-with-items-select';

@Injectable({
    providedIn: 'root'
})
export class DirectoryService {

    constructor(
        private http: HttpClient
    ) {}

    create = (data: IDirectoryCreate) => { 
        return this.http.post<IDirChildIndex>("Directory/Create", JSON.stringify(data)); 
    } 

    edit = (data: IDirectoryEdit) => { 
        return this.http.post<void>("Directory/Edit", JSON.stringify(data)); 
    }

    delete = (data: number) => { 
        return this.http.post<number>("Directory/Delete", JSON.stringify(data)); 
    }

    getAllFolders = () => { 
        return this.http.get<IFolderSelectData[]>("Directory/GetAllFolders"); 
    }

    getAllItems = () => {
        return this.http.get<IDirWithItemsSelect[]>("Directory/GetAllItems"); 
    }
}
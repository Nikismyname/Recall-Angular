import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDirectoryCreate } from './models/directory/directory-create';

@Injectable({
    providedIn: 'root'
})
export class DirectoryService {

    constructor(
        private http: HttpClient
    ) {}

    create = (data: IDirectoryCreate) => { 
        return this.http.post<any>("Directory/Create", JSON.stringify(data)); 
    } 

    delete = (data: number) => { 
        return this.http.post<number>("Directory/Delete", JSON.stringify(data)); 
    }
}
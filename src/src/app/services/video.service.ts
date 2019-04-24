import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INavIndex } from './models/navigation/nav-index';

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
}
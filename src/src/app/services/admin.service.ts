import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminService { 
    constructor(
        private http: HttpClient
    ) {}

    generatePublicVideos = () => { 
        return this.http.post<void>("Admin/GeneratePublicVideos", JSON.stringify("data to be added later")); 
    }

    deleteTestPublicVideos = () => { 
        return this.http.post<void>("Admin/DeleteTestPublicVideos", JSON.stringify("Some data"));
    }
}
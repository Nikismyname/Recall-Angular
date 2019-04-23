import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterData } from './models/authentication/register-data';
import { ILoginData } from './models/authentication/login-data';
import { IUserWithToken } from './models/authentication/user-with-token';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private http: HttpClient) {
    }

    register = (data: IRegisterData) => { 
        return this.http.post<void>("Authentication/Register", JSON.stringify(data));
    }

    login = (data: ILoginData) => {
        return this.http.post<IUserWithToken>("Authentication/Login", JSON.stringify(data));
    }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserInRole } from '../models/authentication/user-in-role';
import { IUser } from '../models/authentication/user';

export const defaultAuthState: IUserInRole = {username: "", role: "", token: "", isUser: false, isAdmin: false} 

@Injectable({
    providedIn: "root"
})
export class AuthStoreService{

    private readonly _user = new BehaviorSubject<IUserInRole>(defaultAuthState); 

    public readonly user$ = this._user.asObservable(); 

    public getUser(): IUserInRole { 
        return this._user.getValue();
    }

    public setUser(val: IUser): void {
        if (!val) {
            this._user.next(defaultAuthState);
            return;
        }

        let newVal = <IUserInRole>val;
        newVal.isAdmin = newVal.role === "Admin";
        newVal.isUser = true; 

        this._user.next(newVal);
    } 
}
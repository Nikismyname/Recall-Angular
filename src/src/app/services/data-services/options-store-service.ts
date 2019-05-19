import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAllOptions } from '../models/options/all-options';

@Injectable({providedIn: "root"})
export class OptionsStoreService { 
    private _options: BehaviorSubject<IAllOptions> = new BehaviorSubject<IAllOptions>(null);
    options$: Observable<IAllOptions> = this._options.asObservable();
    
    setAllOptions(options: IAllOptions) { 
        console.log("setting all options");
        let optionsString = JSON.stringify(options); 
        console.log("srv opt", options);
        console.log("opt str",optionsString);
        localStorage.setItem("options", optionsString);
        this._options.next(options);
    }

    getAllOptionsFromLocalStorage() {
        let optionsString = localStorage.getItem("options");
        if (optionsString === null) {
            console.log("No Options Saved!");
            return;
        }

        let options = <IAllOptions>JSON.parse(optionsString);
        this._options.next(options);
    }
} 
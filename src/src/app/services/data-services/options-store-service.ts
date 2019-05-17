import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAllOptions } from '../models/options/all-options';

@Injectable({providedIn: "root"})
export class OptionsStoreService { 
    private _options: BehaviorSubject<IAllOptions> = new BehaviorSubject<IAllOptions>(null);
    options$: Observable<IAllOptions> = this._options.asObservable();
    
    setAllOptions(options: IAllOptions) { 
        this._options.next(options);
        localStorage.setItem("options",JSON.stringify(options));
    }

    getAllOptionsFromLocalStorage() {
        let optionsString = localStorage.getItem("options");
        if (optionsString === null) {
            return;
        }

        let options = <IAllOptions>JSON.parse(optionsString);
        this._options.next(options);
    }
} 
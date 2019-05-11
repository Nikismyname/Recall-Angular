import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthStoreService } from '../data-services/auth-store.service';
import { take } from 'rxjs/operators';

@Injectable({providedIn:"root"})
export class LoggedOutGuard { 
    constructor(
        private authService: AuthStoreService,
        private toastr: ToastrService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let loggedOut: boolean = false;
        this.authService.user$.pipe(take(1)).subscribe(x => { 
            loggedOut = !x.isUser;
        })
        if (loggedOut === false) { 
            this.toastr.error("You need to bet Logged Out to access this page!");
        }
        return loggedOut;
    }
}

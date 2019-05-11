import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthStoreService } from '../data-services/auth-store.service';
import { take } from 'rxjs/operators';

@Injectable({providedIn:"root"})
export class UserGuard { 
    constructor(
        private authService: AuthStoreService,
        private toastr: ToastrService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let isUser: boolean = false;
        this.authService.user$.pipe(take(1)).subscribe(x => { 
            isUser = x.isUser;
        })
        if (isUser === false) { 
            this.toastr.error("You need to bet Logged In to access this page!");
        }
        return isUser;
    }
}

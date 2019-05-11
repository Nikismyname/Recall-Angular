import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthStoreService } from '../data-services/auth-store.service';
import { take } from 'rxjs/operators';

@Injectable({providedIn:"root"})
export class AdminGuard { 
    constructor(
        private authService: AuthStoreService,
        private toastr: ToastrService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let isAdmin: boolean = false;
        this.authService.user$.pipe(take(1)).subscribe(x => { 
            isAdmin = x.isAdmin;
        })
        if (isAdmin === false) { 
            this.toastr.error("You need to be admin to access this page!");
        }
        return isAdmin;
    }
}

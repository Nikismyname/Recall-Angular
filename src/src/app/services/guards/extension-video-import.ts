import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { take, catchError, switchMap } from "rxjs/operators"
import { VideoService } from '../video.service';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class ExtensionVideoImportGuard implements CanActivate {

    constructor(
        private videoService: VideoService,
        private toastr: ToastrService,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.videoService.getExtensionVideos().pipe(
            take(1),
            switchMap(x => {
                if (x.length === 0) {
                    this.toastr.info("There are no videos to import!");
                    return of(false);
                } else {
                    return of(true)
                }
            }),
            catchError(x => {
                this.toastr.error("Failed fetching extension videos in guard!");
                return of(false);
            })
        );
    }
}

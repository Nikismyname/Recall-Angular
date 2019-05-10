import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { VideoService } from '../video.service';
import { take, tap, catchError } from 'rxjs/operators';
import { IExtensionAddDataWithId } from '../models/video/extension-add-data-with-id';

@Injectable({ providedIn: "root" })
export class ExtensionVideoImportResolver implements Resolve<IExtensionAddDataWithId[]> {
    constructor(
        private videoService: VideoService,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExtensionAddDataWithId[]> {
        let result = this.videoService.getExtensionVideos().pipe(
            take(1),
            tap(x => x.length === 0 ? of(null) : of(x)),
            catchError(x => of(null))
        )
        return result;
    }
}

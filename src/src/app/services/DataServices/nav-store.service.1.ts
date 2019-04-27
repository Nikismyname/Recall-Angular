import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INavIndex } from '../models/navigation/nav-index';
import { NavigationService } from '../navigation.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from '../video.service';
import { DirectoryService } from '../directory.service';

@Injectable({
    providedIn: "root"
})
export class NavStoreService {

    constructor(
        private navService: NavigationService,
        private videoService: VideoService, 
        private directoryService: DirectoryService,
        private toastr: ToastrService,
    ) {
        this.navHistory = [];
    }

    private readonly _navIndex = new BehaviorSubject<INavIndex>(null);

    readonly navIndex$ = this._navIndex.asObservable();

    private navHistory: INavIndex[];

    setNav(id: number) {
        if (this._navIndex.getValue() && this._navIndex.getValue().id === id) {
            return;
        }

        let existingNav = this.navHistory.filter(x => x.id === id);
        if (existingNav.length !== 1) { // there is no such nav in history!
            this.navService.getIndex(id).pipe(take(1)).subscribe(
                nav => {
                    this.navHistory = this.navHistory.concat(nav);
                    this._navIndex.next(nav);
                }, error => {
                    this.toastr.error(error.message, "Error");
                });
        } else {
            this._navIndex.next(existingNav[0]);
        }
    }

    deleteVideo(id: number) {
        let currentNav = this.navHistory[this.navHistory.length - 1];
        let videoToDelete = currentNav.videos.filter(x => x.id === id)[0];
        if (videoToDelete) {
            this.videoService.delete(id).pipe(take(1)).subscribe(
                () => {
                    currentNav.videos = currentNav.videos.filter(x => x.id !== id);
                },
                error => { console.log(error) })
        }
    }

    deleteDirectory(id: number) {
        let currentNav = this.navHistory[this.navHistory.length - 1];
        let dirToDelete = currentNav.subdirectories.filter(x => x.id === id)[0];
        if (dirToDelete) {
            this.directoryService.delete(id).pipe(take(1)).subscribe(
                () => { 
                    currentNav.subdirectories = currentNav.subdirectories.filter(x=>x.id !== id); 
                }, 
                error => console.log(error)
            );
        }
    }
}
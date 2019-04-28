import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INavIndex } from '../models/navigation/nav-index';
import { NavigationService } from '../navigation.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from '../video.service';
import { DirectoryService } from '../directory.service';
import { IVideoIndex } from '../models/navigation/video-index';
import { IDirChildIndex } from '../models/navigation/dir-child-index';
import { RoutePaths } from '../route-paths';

@Injectable({
    providedIn: "root"
})
export class NavStoreService {

    rootId: number = null;

    constructor(
        private navService: NavigationService,
        private videoService: VideoService, 
        private directoryService: DirectoryService,
        private toastr: ToastrService,
        private routePaths: RoutePaths,
    ) {
        this.navHistory = [];
    }

    private readonly _navIndex = new BehaviorSubject<INavIndex>(null);

    readonly navIndex$ = this._navIndex.asObservable();

    private navHistory: INavIndex[];

    setNav(id: number) {
        let fetchingRoot: boolean = false;
        let fetchError: boolean = false; 

        if (this.rootId && id === -1) {
            id = this.rootId;
            //console.log("KNOWN_ROOT, ",id);
        } else if(!this.rootId && id === -1) {
            fetchingRoot = true;
        }

        if (this._navIndex.getValue() && this._navIndex.getValue().id === id) {
            return;
        }

        let existingNav = this.navHistory.filter(x => x.id === id);
        if (existingNav.length !== 1) { // there is no such nav in history!
            //console.log("NO_PREEXISTING_NAV, ", id);
            this.navService.getIndex(id).pipe(take(1)).subscribe(
                nav => {
                    //console.log("NAV HERE, ",nav);
                    if (fetchingRoot) { 
                        //console.log("GOT_ROOT_ID, ", nav.id);
                        this.rootId = nav.id;
                    }
                    this.navHistory = this.navHistory.concat(nav);
                    this._navIndex.next(nav);

                    let newId = id === -1? this.rootId : id;
                    window.history.pushState(null, null, this.routePaths.indexPath+ "/" + newId);
                }, error => {
                    fetchError = true;
                    this.toastr.error(error.message, "Error");
                });
        } else {
            //console.log("PREEXISTIG NAV, ", id);
            window.history.pushState(null, null, this.routePaths.indexPath+ "/" + id);
            this._navIndex.next(existingNav[0]);
        }
    }

    registerCreatedDirectory(dirIndex: IDirChildIndex) {
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
        currentNav.subdirectories.push(dirIndex);
    }

    registerCreatedVideo(videoIndex: IVideoIndex) { 
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
        currentNav.videos.push(videoIndex);
    }

    deleteVideo(id: number) {
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
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
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
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
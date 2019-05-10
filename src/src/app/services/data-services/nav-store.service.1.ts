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
import { IReorderData } from '../models/others/reorder-data';
import { ElectronService } from 'ngx-electron';
import { IVideoMoveWithOrigin } from '../models/video/video-move-with-origin';

@Injectable({
    providedIn: "root"
})
export class NavStoreService {

    rootId: number = null;
    electronFromBuild: boolean;

    constructor(
        private navigationService: NavigationService,
        private videoService: VideoService,
        private directoryService: DirectoryService,
        private toastr: ToastrService,
        private routePaths: RoutePaths,
        private electronService: ElectronService,
    ) {
        this.navHistory = [];
        if (this.electronService.isElectronApp) {
            this.electronService.ipcRenderer.on("fromBuild", (event, fromBuild) => {
                this.electronFromBuild = fromBuild;
                console.log("Electron main porcess message revieved!");
            });
        }
    }

    private readonly _navIndex = new BehaviorSubject<INavIndex>(null);

    readonly navIndex$ = this._navIndex.asObservable();

    private navHistory: INavIndex[];

    setRootId(id: number) {
        this.rootId = id;
    }

    getRootId(): number { 
        return this.rootId;
    }

    getCurrentId(): number { 
        if (this._navIndex.getValue() === null) { 
            return null;
        } else {
            return this._navIndex.getValue().id;
        }
    }

    setNav(id: number) {

        if (this.rootId && id === -1) {
            id = this.rootId;
        }

        ///Already the current Nav Element
        if (this._navIndex.getValue() && this._navIndex.getValue().id === id) {
            return;
        }

        let existingNav = this.navHistory.filter(x => x.id === id);
        if (existingNav.length !== 1) { // there is no such nav in history!
            this.navigationService.getIndex(id).pipe(take(1)).subscribe(
                nav => {
                    nav.subdirectories = nav.subdirectories.sort((a, b) => a.order - b.order);
                    nav.videos = nav.videos.sort((a, b) => a.order - b.order);
                    
                    this.navHistory = this.navHistory.concat(nav);
                    this._navIndex.next(nav);

                    let newId = id === -1 ? this.rootId : id;

                    this.updateUrl(newId);
                }, error => {
                    this.toastr.error(error.message, "Error");
                });
        } else {
            this.updateUrl(id);
            this._navIndex.next(existingNav[0]);
        }
    }

    //sound
    registerCreatedDirectory(dirIndex: IDirChildIndex, parentDirId: number = null) {
        let navId = parentDirId === null ? this._navIndex.getValue().id : parentDirId; 
        let currentNavArray = this.navHistory.filter(x => x.id === navId); 
        if (currentNavArray.length !== 1) { return; } //nav is not in memory, so it will be loaded from db
        let currentNav = currentNavArray[0];
        currentNav.subdirectories = currentNav.subdirectories.concat(dirIndex);
    }

    //sound
    registerCreatedVideo(videoIndex: IVideoIndex, parentDirId: number = null) {
        let navId = parentDirId === null ? this._navIndex.getValue().id : parentDirId; 
        console.log("NAV ID HERE 1: ", navId);
        console.log("COMP", navId, -1, navId === -1);
        if (navId === -1) {
            console.log("ROOT ID", );
            if (this.rootId !== null) { 
                navId = this.rootId;
                console.log("NAV ID HERE 2: ", navId);
            } else {
                return;
            }
        }
        let currentNavArray = this.navHistory.filter(x => x.id === navId); 
        if (currentNavArray.length !== 1) { return; } //nav is not in memory, so it will be loaded from db
        let currentNav = currentNavArray[0];
        currentNav.videos = currentNav.videos.concat(videoIndex);
    }

    //sound
    registerVideoMove(data: IVideoMoveWithOrigin) {
        if (data === null) {
            alert("registerVideoMove got null") 
            return;
        }

        let originNavArray = this.navHistory.filter(x => x.id == data.originDirectory);
        console.log(originNavArray, data);
        if (originNavArray.length !== 1) { alert("origin nav not found"); return; }
        let originNav = originNavArray[0];
        let videoArray = originNav.videos.filter(x => x.id === data.videoId);
        if (videoArray.length !== 1) { alert("video not found"); return; }
        let video = videoArray[0];
        originNav.videos = originNav.videos.filter(x => x.id !== data.videoId);

        let newNavArray = this.navHistory.filter(x => x.id == data.newDirectoryId);
        if (newNavArray.length !== 1) { return; }
        let newNav = newNavArray[0]; 
        //TODO; make the video order last;
        newNav.videos = newNav.videos.concat(video);
    }

    //sound
    deleteVideo(id: number) {
        let currentNav = this.navHistory.filter(x => x.id === this._navIndex.getValue().id)[0];
        let videoToDelete = currentNav.videos.filter(x => x.id === id)[0];
        if (videoToDelete) {
            this.videoService.delete(id).pipe(take(1)).subscribe(
                () => {
                    currentNav.videos = currentNav.videos.filter(x => x.id !== id);
                },
                error => { console.log(error) })
        }
    }

    //sound
    deleteDirectory(id: number) {
        let currentNav = this.navHistory.filter(x => x.id === this._navIndex.getValue().id)[0];
        let dirToDelete = currentNav.subdirectories.filter(x => x.id === id)[0];
        if (dirToDelete) {
            this.directoryService.delete(id).pipe(take(1)).subscribe(
                () => {
                    currentNav.subdirectories = currentNav.subdirectories.filter(x => x.id !== id);
                },
                error => console.log(error)
            );
        }
    }

    //sound
    reorderDirectories(data: IReorderData) {
        //REORDER DIRECTORIES LOCAL
        let currentNav = this.navHistory.filter(x => x.id === this._navIndex.getValue().id)[0];
        for (let i = 0; i < data.orderings.length; i++) {
            const ordering = data.orderings[i];
            let id = ordering[0];
            let newOrder = i;
            let directory = currentNav.subdirectories.filter(x => x.id === id)[0];
            directory.order = newOrder;
        }
        currentNav.subdirectories = currentNav.subdirectories.sort((a, b) => a.order - b.order);
        //...

        //REORDER DB DIRECTORIES
        data.dirId = this._navIndex.getValue().id;
        this.navigationService.reorderDirectories(data).pipe(take(1)).subscribe(
            () => { this.toastr.success("Reordered Directories", "Success"); },
            error => {
                this.toastr.error("Reorder Directories failed!", "Error");
                console.log(error);
            }
        );
        //...
    }

    //sound
    reorderVideos(data: IReorderData) {
        //REORDER VIDEOS LOCAL
        let currentNav = this.navHistory.filter(x => x.id === this._navIndex.getValue().id)[0];
        for (let i = 0; i < data.orderings.length; i++) {
            const ordering = data.orderings[i];
            let id = ordering[0];
            let newOrder = i;
            let video = currentNav.videos.filter(x => x.id === id)[0];
            video.order = newOrder;
        }
        currentNav.videos = currentNav.videos.sort((a, b) => a.order - b.order);
        currentNav.videos = currentNav.videos.slice(0);
        //...

        //REORDER DB VIDEOS
        data.dirId = this._navIndex.getValue().id;
        this.navigationService.reotderVideos(data).pipe(take(1)).subscribe(
            () => { this.toastr.success("Reordered Videos", "Success"); },
            error => {
                this.toastr.error("Reorder Videos failed!", "Error");
                console.log(error);
            }
        );
        //...
    }

    updateUrl(id: number) {
        if (this.electronService.isElectronApp && this.electronFromBuild) {
            let appPath = this.electronService.remote.app.getAppPath() + "/dist/recall";
            let path = appPath + this.routePaths.indexPath + "/" + id;
            window.history.pushState(null, null, path);
        } else { // localhost based:
            window.history.pushState(null, null, this.routePaths.indexPath + "/" + id);
        }
    }
}
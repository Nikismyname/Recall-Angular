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
            this.navigationService.getIndex(id).pipe(take(1)).subscribe(
                nav => {
                    nav.subdirectories = nav.subdirectories.sort((a, b) => a.order - b.order);
                    nav.videos = nav.videos.sort((a, b) => a.order - b.order);

                    if (fetchingRoot) { 
                        this.rootId = nav.id;
                    }
                    this.navHistory = this.navHistory.concat(nav);
                    this._navIndex.next(nav);

                    let newId = id === -1 ? this.rootId : id;
                    
                    this.updateUrl(newId); 
                }, error => {
                    fetchError = true;
                    this.toastr.error(error.message, "Error");
                });
        } else {
            this.updateUrl(id);
            this._navIndex.next(existingNav[0]);
        }
    }

    registerCreatedDirectory(dirIndex: IDirChildIndex) {
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
        currentNav.subdirectories = currentNav.subdirectories.concat(dirIndex);
    }

    registerCreatedVideo(videoIndex: IVideoIndex) {
        console.log(videoIndex);
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
        currentNav.videos= currentNav.videos.concat(videoIndex);
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

    reorderDirectories(data: IReorderData) { 
        //REORDER DIRECTORIES LOCAL
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
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
            () => { this.toastr.success("Reordered Directories", "Success");},
            error => { 
                this.toastr.error("Reorder Directories failed!", "Error");
                console.log(error);
            } 
        );
        //...
    } 

    reorderVideos(data: IReorderData) { 
        //REORDER VIDEOS LOCAL
        let currentNav = this.navHistory.filter(x=>x.id === this._navIndex.getValue().id)[0];
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
            () => { this.toastr.success("Reordered Videos", "Success");},
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
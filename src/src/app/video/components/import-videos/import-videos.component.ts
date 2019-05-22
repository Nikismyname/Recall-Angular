import { Component } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';
import { DirectoryService } from 'src/app/services/directory.service';
import { IFolderSelectData } from 'src/app/services/models/others/folder-select-data';
import { Location } from '@angular/common';
import { IExtensionAddDataWithId } from 'src/app/services/models/video/extension-add-data-with-id';

@Component({
  selector: 'app-import-videos',
  templateUrl: './import-videos.component.html',
  styleUrls: ['./import-videos.component.css']
})
export class ImportVideosComponent {

  videosForImport: IExtensionAddDataWithId[] = [];
  rootId: number;

  btnOneName: string = "Not Set";
  btnOneId: number = null;
  btnTwoName: string = "Not Set";
  btnTwoId: number = null;

  isSelectingDir: boolean = false;
  isSelectingButtonOne: boolean = false;
  isSelectingButtonTwo: boolean = false;
  isSelectingVideoDir: boolean = false;

  videoIdSelectingFor: number = null;

  folders: IFolderSelectData[] = [];

  firstFolderFetch: boolean = true;

  constructor(
    private videoService: VideoService,
    private toastr: ToastrService,
    private navService: NavStoreService,
    private directoryService: DirectoryService,
    private location: Location,
  ) {
    this.rootId = this.navService.getRootId();
    this.getExtensionVideos();
    this.fetchFolders();
  }

  getExtensionVideos() {
    this.videoService.getExtensionVideos().pipe(take(1)).subscribe(
      x => {
        if (x.length === 0) { 
          this.toastr.info("There Are no Videos For Import!");
          this.location.back();
        }
        this.videosForImport = x;
      },
      error => {
        console.log(error);
        this.toastr.error("failed fetching extension videos!");
      }
    );
  }

  fetchFolders() {
    this.directoryService.getAllFolders().pipe(take(1)).subscribe(
      x => {
        this.folders = x;
        if (this.firstFolderFetch) {
          this.firstFolderFetch = false; 
          let rootId = this.navService.getRootId();
          if (rootId !== null) { 
            let folderName = x.filter(x => x.id === rootId)[0].name;
            this.btnOneName = folderName; 
            this.btnOneId = rootId; 
          }
          let currentNavId = this.navService.getCurrentId();
          if (currentNavId !== null) { 
            let folderName = x.filter(x => x.id === currentNavId)[0].name; 
            this.btnTwoName = folderName;
            this.btnTwoId = currentNavId;
          }
        }
      },
      error => {
        console.log(error);
        this.toastr.error("failed detching folders!");
      }
    );
  }

  fetchFoldersIfNotPresent() {
    if (this.folders.length === 0) { 
      this.fetchFolders();
    }
  }

  foldersCreatedRefresh() {
    this.fetchFolders();
  }

  folderSelected(id: number) {
    if (!id) { return; }

    if (this.isSelectingButtonOne) {
      let dirName = this.folders.filter(x => x.id === id)[0].name;
      this.btnOneId = id; this.btnOneName = dirName;
    } else if (this.isSelectingButtonTwo) {
      let dirName = this.folders.filter(x => x.id === id)[0].name;
      this.btnTwoId = id; this.btnTwoName = dirName;
    } else if (this.isSelectingVideoDir) {
      this.onClickApproveVideo(this.videoIdSelectingFor, id);
    }

    this.resetSelection();
  }

  resetSelection() { 
    this.isSelectingButtonOne = false;
    this.isSelectingButtonTwo = false;
    this.isSelectingVideoDir = false;
    this.isSelectingDir = false;
    this.videoIdSelectingFor = null;
  }

  selectingButton(one: boolean) {
    this.fetchFoldersIfNotPresent(); 
    this.isSelectingDir = true;
    if (one) {
      this.isSelectingButtonOne = true;
    } else {
      this.isSelectingButtonTwo = true;
    }
  }

  selectingVideoDir(videoId: number) {
    this.fetchFoldersIfNotPresent();
    this.isSelectingDir = true;
    this.isSelectingVideoDir = true;
    this.videoIdSelectingFor = videoId;
  }

  onSelectorBack() { 
    this.resetSelection();
  }

  onClickApproveVideo(videoId: number, dirId: number) {
    this.videoService.convertExtensionVideo({
      shouldAdd: true, 
      extensionVideoId: videoId,
      parentDirId: dirId,
    }).pipe(take(1)).subscribe(videoIndex=> { 
      this.toastr.success("Converted Extension Video!");
      this.videosForImport = this.videosForImport.filter(x => x.id !== videoId);
      this.navService.registerCreatedVideo(videoIndex, dirId); 
    }, error => { 
      console.log(error);
      this.toastr.error("Failed at Converting Video!");
    });
  } 

  onClickDeleteVideo(videoId: number) { 
    this.videoService.convertExtensionVideo({
      shouldAdd: false, 
      extensionVideoId: videoId,
      parentDirId: 0,
    }).pipe(take(1)).subscribe(() => { 
      this.toastr.success("Deleted Extension Video!");
      this.videosForImport = this.videosForImport.filter(x=>x.id !== videoId);
    }, error => { 
      console.log(error);
      this.toastr.error("Failed at deleting Video!");
    });
  }

}

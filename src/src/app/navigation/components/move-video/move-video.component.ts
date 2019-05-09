import { Component } from '@angular/core';
import { DirectoryService } from 'src/app/services/directory.service';
import { IFolderSelectData } from 'src/app/services/models/others/folder-select-data';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import { NavStoreService } from 'src/app/services/DataServices/nav-store.service.1';
import { Location } from '@angular/common';

@Component({
  selector: 'app-move-video',
  templateUrl: './move-video.component.html',
  styleUrls: ['./move-video.component.css']
})
export class MoveVideoComponent {

  allFolders: IFolderSelectData[] = []; 
  videoId: number;
  foldersLoaded: boolean = false; 

  constructor(
    private directoryService: DirectoryService, 
    private route: ActivatedRoute,
    private videoService: VideoService,
    private navService: NavStoreService,
    private location: Location,
  ) {
    this.directoryService.getAllFolders().pipe(take(1)).subscribe(x => { 
      this.allFolders = x;
      this.foldersLoaded = true;
    }); 

    this.videoId = Number(this.route.snapshot.paramMap.get("id"));
  }
  
  onFolderSelected(parentDirId: number) { 
    this.videoService.move({
      newDirectoryId: parentDirId,
      videoId: this.videoId
    }).pipe(take(1)).subscribe(x => { 
      this.navService.registerVideoMove(x);
      this.location.back();
    });
  }

  refreshFolders() { 
    this.directoryService.getAllFolders().pipe(take(1)).subscribe(x => { 
      this.allFolders = x;
    }); 
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoutePaths } from 'src/app/services/route-paths';
import { INavIndex } from 'src/app/services/models/navigation/nav-index';
import { DirectoryService } from 'src/app/services/directory.service';
import { take } from 'rxjs/operators';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-current-dir',
  templateUrl: './current-dir.component.html',
  styleUrls: ['./current-dir.component.css']
})
export class CurrentDirComponent implements OnInit {

  @Input() currentDir: INavIndex;
  @Output() currentDirClickedEmitter: EventEmitter<number> = new EventEmitter();
  videoIndex: number = 0;
  dirIndex: number = 0;

  constructor(
    public routePaths: RoutePaths,
    private directoryService: DirectoryService,
    private videoService: VideoService,
    private navService: NavStoreService,
  ) { }

  ngOnInit() {
  }

  onClickCurrentSheet(e) {
    this.currentDirClickedEmitter.emit(this.currentDir.parentDirectoryId);
  } 

  stopPropagation(e) {
    e.stopPropagation();
  } 

  onCreateDir(e) {
    e.stopPropagation();
    e.preventDefault();
    let name: string = window.prompt("Select name for the directory!");
    if (name.toLowerCase() === "root") {return;}
    if (name.length === 0) { return; }
    this.directoryService.create({ parentDirectoryId: this.currentDir.id, name: name })
      .pipe(take(1))
      .subscribe(
        dirInd => {
          this.navService.registerCreatedDirectory(dirInd);
         },
        error => { 
          console.log("create dir failed ", error );
        } 
      ); 
  }

  createDir(e) {
    e.stopPropagation();
    e.preventDefault();
    this.directoryService.create({ parentDirectoryId: this.currentDir.id, name: "dir." + this.dirIndex })
      .pipe(take(1))
      .subscribe(
        dirInd => { this.dirIndex++; this.navService.registerCreatedDirectory(dirInd); }
      )
  }

  createVideo(e) { 
    e.stopPropagation();
    e.preventDefault();
    this.videoService.create({
      directoryId: this.currentDir.id,
      name: "video." + this.videoIndex, 
      url: "https://www.youtube.com/watch?v=VYIhM4FwmcE",
      description: "",
      isYouTube: true, 
      isVimeo: false,
      isLocal: false,
    })
      .pipe(take(1))
      .subscribe(
        index => { 
          this.videoIndex++;
          this.navService.registerCreatedVideo(index);
        }
      )
  }
}

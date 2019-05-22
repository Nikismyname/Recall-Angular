import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IVideoIndex } from 'src/app/services/models/navigation/video-index';
import { RoutePaths, RoutesNoSlash } from 'src/app/services/route-paths';
import { Router } from '@angular/router';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';
import { VideoService } from 'src/app/services/video.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() video: IVideoIndex;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private navService: NavStoreService,
    public routePaths: RoutePaths,
    private router: Router,
    private videoService: VideoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  onClickVideo() {
    this.router.navigate([RoutesNoSlash.videoNotePath + "/" + this.video.id]);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  delete() {
    this.navService.deleteVideo(this.video.id);
  }

  move() {
    this.router.navigate([RoutesNoSlash.videoMovePath + "/" + this.video.id]);
  }

  makeConnection() {
    this.router.navigate([RoutesNoSlash.videoConnectPath + "/" + this.video.id]);
  }

  calculatePercentWatched() {
    if (this.video.seekTo === null || this.video.seekTo === undefined ||
      this.video.duration === null || this.video.duration === undefined) {
      return "0% through null";
    }

    if (this.video.seekTo === 0) {
      return "0% through zero";
    }

    return (this.video.seekTo / this.video.duration * 100).toFixed(0) + "% through";
  }

  makePublic() {
    this.videoService.makePublic(this.video.id).pipe(take(1)).subscribe(
      () => {
        this.toastr.success("Video is now Public!");
        this.video.public = true;
      },
      error => {
        console.log(error);
        this.toastr.error("Failed at making video Public!");
      }
    );
  }

  makePrivate() {
    this.videoService.makePrivate(this.video.id).pipe(take(1)).subscribe(
      ()=> {
        this.toastr.success("Video is now Private!");
        this.video.public = false;
      },
      error => {
        console.log(error);
        this.toastr.error("Failed at making video Private!");
      }
    );
  }
}

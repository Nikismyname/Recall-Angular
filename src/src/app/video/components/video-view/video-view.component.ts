import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { INoteInternal, NoteType } from 'src/app/services/models/video/note-internal';
import { VideoType } from 'src/app/services/models/others/video-type';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { UrlService } from 'src/app/services/url.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IVideoEdit } from 'src/app/services/models/video/video-edit';
import { VideoNotateStoreServices } from 'src/app/services/data-services/video-notate-store.services';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ElectronService } from 'ngx-electron';
import { NavigationService } from 'src/app/services/navigation.service';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent {
  VideoType = VideoType;
  NoteType = NoteType;

  videoInitiaLoadDone: boolean = false;
  notes: INoteInternal[] = [];
  token: string = "";
  video: IVideoEdit = <IVideoEdit>{ url: "", name: "", description: "", isVimeo: false, isYouTube: true, isLocal: false };
  isPlaying: boolean = false;

  showVideoFields: boolean = true;

  @ViewChild("player") player: VideoPlayerComponent;
  @ViewChild("fileSelector") fileSelector: ElementRef;
  @ViewChild("frameDiv") frame: ElementRef;

  constructor(
    private videoService: VideoService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private notateService: VideoNotateStoreServices,
    private toastr: ToastrService,
    private location: Location,
    public electronService: ElectronService,
    public changeDetectionRef: ChangeDetectorRef,
    public navigationSerice: NavigationService,
    public navService: NavStoreService,
  ) {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.videoService.getForView(id).pipe(take(1)).subscribe(
      videoEdit => {
        //this.toastr.success("Video Loaded: " + id, "Success!");
        this.video = videoEdit;
        this.notes = videoEdit.notes;

        this.player.initialSeekToTime = this.video.seekTo;

        if (videoEdit.isYouTube) {
          this.player.setUpYouTube(this.urlService.extractToken(videoEdit.url));
        } else if (videoEdit.isLocal) {
          if (this.electronService.isElectronApp) {
            let sanitizedUrl = this.domSanitizer.bypassSecurityTrustUrl(videoEdit.url);
            this.player.setUpLocal(sanitizedUrl);
          } else {
            this.fileSelector.nativeElement.click();
          }
        } else if (videoEdit.isVimeo) {
          let token = this.urlService.extractVimeoToken(videoEdit.url);
          this.player.setUpVimeo(token);
        }
      },
      error => {
        this.toastr.error("Video Load Failed: " + id, "Error");
        console.log(error);
      }
    )
  };

  ngAfterViewInit() {
    this.frame.nativeElement.style.height = (this.frame.nativeElement.offsetWidth) * 9 / 16 + "px";
  }

  getRootNotes(): INoteInternal[] {
    return this.notes.filter(x => x.inPageParentId === null && x.deleted === false);
  };

  getChildNotes(id: number): INoteInternal[] {
    let childNotes = this.notes.filter(x => x.inPageParentId === id && x.deleted === false);
    return childNotes;
  };

  onFileSelected(e) {// for video player
    let file = e.target.files[0];
    if (file) {
      let objectUrl: string = window.URL.createObjectURL(file);
      let sanitizedUrl = this.domSanitizer.bypassSecurityTrustUrl(objectUrl);
      this.player.setUpLocal(sanitizedUrl);
    }
  }

  seekTo(time: number) {
    this.player.seekTo(time);
  }

  back() {
      this.location.back();
  }

  pausePlay() {
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  goBackToVideo() {
    document.documentElement.scrollTop = 0;
  }

  videoInitialLoad() {
    setTimeout(() => {
      this.videoInitiaLoadDone = true;
    }, 1);
  }

  isPlayingSetter(e: boolean) {
    this.isPlaying = e;
    this.changeDetectionRef.detectChanges();
  }

  playPause() {
    if (this.isPlaying) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }
}

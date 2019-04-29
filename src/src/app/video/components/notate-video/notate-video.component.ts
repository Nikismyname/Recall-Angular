import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { INoteInternal, NoteType } from 'src/app/services/models/video/note-internal';
import { VideoType } from 'src/app/services/models/others/video-type';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { UrlService } from 'src/app/services/url.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IVideoEdit } from 'src/app/services/models/video/video-edit';
import { VideoNotateStoreServices } from 'src/app/services/DataServices/video-notate-store.services';
import * as c from '../../../utilities/constants';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-notate-video',
  templateUrl: './notate-video.component.html',
  styleUrls: ['./notate-video.component.css']
})
export class NotateVideoComponent implements OnInit {  
  VideoType = VideoType;
  NoteType = NoteType;

  videoInitiaLoadDone: boolean = false;

  notes: INoteInternal[] = [];
  token: string = "";

  video: IVideoEdit;

  pauseOrPlayName: string = "play";
  isPlaying: boolean = false;

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
  ) {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.videoService.getForEdit(id).pipe(take(1)).subscribe(
      videoEdit => {
        this.toastr.success("Video Loaded: " + id, "Success!");
        this.video = videoEdit; 
        this.notes = videoEdit.notes;
        this.notateService.initialSet(videoEdit);
        this.notateService.setVideoId(id);

        this.player.initialSeekToTime = this.video.seekTo;

        if (videoEdit.isYouTube) {
          this.player.setUpYouTube(this.urlService.extractToken(videoEdit.url));
        } else if (videoEdit.isLocal) {
          this.fileSelector.nativeElement.click();
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

  getRootNotes():INoteInternal[] {
    return this.notes.filter(x => x.inPageParentId === null && x.deleted === false);
  };

  getChildNotes(id: number): INoteInternal[] { 
    let childNotes = this.notes.filter(x => x.inPageParentId === id && x.deleted === false);
    return childNotes;
  };

  ngOnInit() {
  };

  addNewNote(parentId: number = null, type: NoteType = NoteType.Note) {

    let parentDbId: number = -1; 
    let level: number = 0;

    if (parentId === null) {
      
    } else {
      let parentNote = this.notes.filter(x => x.inPageId === parentId)[0];
      parentDbId = 0;
      if (parentNote.id) {
        parentDbId = parentNote.id;
      }
      level = parentNote.level + 1;
    }

    if (level >= 4) {
      return;
    }

    let inPageId = this.notes.length;

    let borderColor: string; 
    let backgroundColor: string; 

    switch (type) {
      case NoteType.Note:
        backgroundColor = c.secondaryColor;
        borderColor = c.noteBorderColor;
        break;
      case NoteType.TimeStamp:
        backgroundColor = c.timeStampBackgroundColor;
        borderColor = c.timeStampBorderColor;
        break;
      case NoteType.Topic:
        backgroundColor = c.topicBackgroundColor;
        borderColor = c.topicBorderColor;
        break;
    }

    this.notes.push({
      id: 0, //no db id
      inPageId: inPageId, 
      inPageParentId: parentId, // null if root
      parentDbId: parentDbId, 
      content: "",
      level: level,
      deleted: false,
      type: type,
      seekTo: this.player.getCurrentTime(),
      backgroundColor: backgroundColor, 
      textColor: "white",
      borderColor: borderColor, 
      borderThickness: 1, 
      selectingColor: false,
      shouldExpand: false,
      formatting: 0,
    });

    console.log(this.notes);
  }

  deleteNote(id: number) {
    this.deleteNoteRecursion(this.notes.filter(x=>x.inPageId === id)[0]);
  }

  private deleteNoteRecursion(note: INoteInternal) {
    let children = this.getChildNotes(note.inPageId);
    for (let i = 0; i < children.length; i++) {
      this.deleteNoteRecursion(children[i]);
    }

    note.deleted = true;
  } 

  save() {
    this.notateService.save(this.video, this.player.getCurrentTime()).subscribe(
      newIds => {
        console.log("Save Success ", newIds);
        this.toastr.success("Save Success", "Success");
      },
      error => {  
        console.log("SAVE_ERROR: ", error);
        this.toastr.error("Save Failed!", "Error");
       },
    );
  }

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

}

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

@Component({
  selector: 'app-notate-video',
  templateUrl: './notate-video.component.html',
  styleUrls: ['./notate-video.component.css']
})
export class NotateVideoComponent implements OnInit {

  VideoType = VideoType;
  NoteType = NoteType;

  notes: INoteInternal[] = [];
  token: string = "";

  video: IVideoEdit;

  @ViewChild("player") player: VideoPlayerComponent;
  @ViewChild("fileSelector") fileSelector: ElementRef; 

  constructor(
    private videoService: VideoService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private notateService: VideoNotateStoreServices,
  ) {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.videoService.getForEdit(id).pipe(take(1)).subscribe(
      videoEdit => {
        this.video = videoEdit; 
        this.notes = videoEdit.notes;
        this.notateService.initialSet(videoEdit);
        this.notateService.setVideoId(id);
        
        if (videoEdit.isYouTube) {
          this.player.setUpYouTube(this.urlService.extractToken(videoEdit.url));
        } else if(videoEdit.isLocal) {
          this.fileSelector.nativeElement.click();
        }
      },
      error => { console.log(error) }
    )
  };

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

    this.notes.push({
      id: 0, //no db id
      inPageId: inPageId, 
      inPageParentId: parentId, // null if root
      parentDbId: parentDbId, 
      content: "",
      level: level,
      deleted: false,
      type: type,
      seekTo: 0, //TODO Set The Seek To The video time
      backgroundColor: "", 
      textColor: "",
      borderColor: "black", 
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
    this.notateService.save(this.video).subscribe(
      newIds => { console.log("Success", newIds) },
      error => { console.log("Error", error) },
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

}

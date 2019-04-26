import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { INoteInternal, NoteType } from 'src/app/services/models/video/note-internal';
import { VideoType } from 'src/app/services/models/others/video-type';
import { VideoService } from 'src/app/services/video.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { UrlService } from 'src/app/services/url.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-notate-video',
  templateUrl: './notate-video.component.html',
  styleUrls: ['./notate-video.component.css']
})
export class NotateVideoComponent implements OnInit {

  VideoType = VideoType;
  notes: INoteInternal[];
  token: string = "";
  @ViewChild("player") player: VideoPlayerComponent;
  @ViewChild("fileSelector") fileSelector: ElementRef; 

  constructor(
    private videoService: VideoService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.videoService.getForEdit(id).pipe(take(1)).subscribe(
      videoEdit => {
        if (videoEdit.isYouTube) {
          this.player.setUpYouTube(this.urlService.extractToken(videoEdit.url));
        } else if(videoEdit.isLocal) {
          this.fileSelector.nativeElement.click();
        }
      },
      error => { console.log(error) }
    )
    this.notes = [];
    let note1: any = { inPageId: 0, inPageParentId: null, content: "Root Dir 1" }; 
    let note2: any = {inPageId: 1, inPageParentId: 0, content:"child Dir 2"}; 
    let note3: any = {inPageId: 2, inPageParentId: 1, content:"child Dir 3"}; 

    this.notes.push(note1);
    this.notes.push(note2);
    this.notes.push(note3);
  };

  getRootNotes():INoteInternal[] {
    return this.notes.filter(x => x.inPageParentId === null);
  };

  getChildNotes(id: number): INoteInternal[] { 
    return this.notes.filter(x => x.inPageParentId === id);
  };

  ngOnInit() {
  };

  addNewNote(parentId: number = null, type: NoteType = NoteType.Note) {
    
    let parentDbId: number = null; 
    let level: number = 0;

    if (parentId === null) {
      
    } else {
      let parentNote = this.notes.filter(x => x.id === parentId)[0];
      if (parentNote.id) {
        parentDbId = parentNote.id;
      }
      level = parentNote.level + 1;
    }

    let inPageId = this.notes.length + 1;

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

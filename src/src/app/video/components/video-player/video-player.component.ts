import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { VideoType } from 'src/app/services/models/others/video-type';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  VideoType = VideoType;
  
  @ViewChild("frameDiv") frame: ElementRef; 

  type: VideoType;

  youTubePlayer: YT.Player;
  token: string;

  localSources: SafeUrl[];
  localSetUp: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  setUpYouTube(token: string) {
    this.type = VideoType.youTube;
    this.token = token;
  }

  setUpLocal(url: SafeUrl) {
    this.localSources = [];
    this.localSources.push(url);
    this.type = VideoType.local;
    this.localSetUp = true;
  }

  changeLocal(url: SafeUrl) {
    this.localSources = [];
    this.localSources.push(url);
  }

  serUpVimeo() {
    
  }

  play() { 
    switch (this.type) {
      case VideoType.youTube:
        this.youTubePlayer.playVideo();
        break;
      case VideoType.vimeo:
        break;
      case VideoType.local:
        break;
    }
  }

  pause(): void {
    switch (this.type) {
      case VideoType.youTube:
        this.youTubePlayer.pauseVideo();
        break;
      case VideoType.vimeo:
        break;
      case VideoType.local:
        break;
    }
  }

  seekTo(time: number): void {
    switch (this.type) {
      case VideoType.youTube:
        this.youTubePlayer.seekTo(time,true)
        break;
      case VideoType.vimeo:
        break;
      case VideoType.local:
        break;
    }
  }

  getCurrentTime(): number {
    switch (this.type) {
      case VideoType.youTube:
        return this.youTubePlayer.getCurrentTime();
      case VideoType.vimeo:
        return 0;
      case VideoType.local:
        return 0;
    }
  }

  ngAfterViewInit() {
    this.frame.nativeElement.style.height = (this.frame.nativeElement.offsetWidth) * 9 / 16 + "px";
  }

  private saveYouTubePlayer(player: YT.Player) {
    this.youTubePlayer = player;
  }

}

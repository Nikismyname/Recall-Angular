import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { VideoType } from 'src/app/services/models/others/video-type';
import { SafeUrl } from '@angular/platform-browser';
import { type } from 'os';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild("frameDiv") frame: ElementRef; 
  VideoType = VideoType; 
  @Input() type: VideoType;

  @Input() token: string; 

  localSetUp: boolean = false;
  youTubePlayer: YT.Player;
  localSources: SafeUrl[];

  constructor() { }

  ngOnInit() {

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

  initialiseLocalVideo(url: SafeUrl) {
    if (this.type !== VideoType.local) { return;}
    this.localSources = [];
    this.localSources.push(url); 
    this.localSetUp = true;
  }

  private saveYouTubePlayer(player: YT.Player) {
    this.youTubePlayer = player;

    if (this.token && this.type === VideoType.youTube) {
      this.youTubePlayer.loadVideoById(this.token); 
    }
  }

}

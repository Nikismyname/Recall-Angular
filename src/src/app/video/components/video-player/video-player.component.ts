import { Component, EventEmitter, Output } from '@angular/core';
import { VideoType } from 'src/app/services/models/others/video-type';
import { SafeUrl } from '@angular/platform-browser';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {

  @Output() videoInitialDoneEmitter: EventEmitter<void> = new EventEmitter();

  VideoType = VideoType;
  
  isDone: boolean = false;

  initialSeekToTime: number; 

  type: VideoType;

  youTubePlayer: YT.Player;
  token: string;
  isFirstPlay: boolean = true; 
  youTubeSetUp: boolean = false;

  localPlayer: VgAPI;
  localSources: SafeUrl[];
  localSetUp: boolean = false;

  constructor() { }

  setUpYouTube(token: string) {
    this.type = VideoType.youTube;
    this.token = token;
    this.youTubeSetUp = true;
  }

  setUpLocal(url: SafeUrl) {
    this.localSources = [];
    this.localSources.push(url);
    this.type = VideoType.local;
    //TODO: fix this shit
    if (this.localSetUp) { 
      setTimeout(() => {
        this.localPlayer.getDefaultMedia().currentTime = this.initialSeekToTime;
      }, 100);
    }
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
      case VideoType.local:
        this.localPlayer.getDefaultMedia().play();
        break;
      case VideoType.vimeo:
        break;

    }
  }

  pause(): void {
    switch (this.type) {
      case VideoType.youTube:
        this.youTubePlayer.pauseVideo();
        break;
      case VideoType.local:
        this.localPlayer.getDefaultMedia().pause();
        break;
      case VideoType.vimeo:
        break;
    }
  }

  seekTo(time: number): void {
    switch (this.type) {
      case VideoType.youTube:
        this.youTubePlayer.seekTo(time,true)
        break;
      case VideoType.local:
        this.localPlayer.getDefaultMedia().currentTime = time;
        break;
      case VideoType.vimeo:
        break;
    }
  }

  getCurrentTime(): number {
    switch (this.type) {
      case VideoType.youTube:
        return Math.trunc(this.youTubePlayer.getCurrentTime());
      case VideoType.local:
        return Math.trunc(this.localPlayer.getDefaultMedia().currentTime);
      case VideoType.vimeo:
        return 0;
    }
  }

  public saveYouTubePlayer(player: YT.Player) {
    this.youTubePlayer = player;
    this.youTubePlayer.seekTo(this.initialSeekToTime, true);
    this.youTubePlayer.mute();
    this.videoInitialDoneEmitter.emit(); 
  }

  public saveLocalPlayer(player: VgAPI) {
    this.localPlayer = player;
    this.videoInitialDoneEmitter.emit();
    this.localPlayer.getDefaultMedia().currentTime = this.initialSeekToTime;
  }

  onMediaReady() { 
    alert("MEDIA READY");
  }

  youtubeChange(e) {
    console.log(e.data);
    if (this.isFirstPlay) { 
      if (e.data === 1) {
        this.isFirstPlay = false; 
        this.youTubePlayer.pauseVideo();
        this.youTubePlayer.unMute();
      }
    }
  }

}

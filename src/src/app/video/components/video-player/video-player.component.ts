import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { VideoType } from 'src/app/services/models/others/video-type';
import { SafeUrl } from '@angular/platform-browser';
import { VgAPI } from 'videogular2/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  VideoType = VideoType;

  @Output() videoInitialDoneEmitter: EventEmitter<void> = new EventEmitter();
  @Output() isPlayingEmitter: EventEmitter<boolean> = new EventEmitter();

  isDone: boolean = false;

  initialSeekToTime: number;

  type: VideoType;

  youTubePlayer: YT.Player;
  token: string;
  isFirstPlayYouTube: boolean = true;
  youTubeSetUp: boolean = false;
  newYouTubeVid: boolean = false;

  localPlayer: VgAPI;
  localSources: SafeUrl[];
  localSetUp: boolean = false;
  newLocalVid: boolean = false;
  isFirstPlayLocal: boolean = true;

  constructor(
    public electronService: ElectronService,
  ) { }

  setUpYouTube(token: string) {
    if (this.youTubeSetUp) { 
      this.youTubePlayer.loadVideoById(token);
      this.youTubePlayer.seekTo(this.initialSeekToTime, true); 
      console.log(this.initialSeekToTime);
      this.newYouTubeVid = true;
      return;
    }

    this.type = VideoType.youTube;
    this.token = token;
    this.youTubeSetUp = true;
  }

  setUpLocal(url: SafeUrl) {
    if (this.localSetUp) {
      this.localSources = [];
      this.localSources = this.localSources.concat(url);
      this.newLocalVid = true;
      return;
    }

    this.localSources = [];
    this.localSources = this.localSources.concat(url);
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
        this.youTubePlayer.seekTo(time, true)
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

  counter: number = 0;

  youtubeChange(e) {
    console.log(e.data);
    this.isPlayingEmitter.emit(Number(e.data) === 1);
    if (this.isFirstPlayYouTube) {
      if (e.data === 1) {
        this.isFirstPlayYouTube = false;
        this.youTubePlayer.pauseVideo();
        this.youTubePlayer.unMute();
      }
    }

    if (this.newYouTubeVid && e.data === -1) { 
      this.counter++;
      if (this.counter === 2) {
        this.counter = 0;
        this.newYouTubeVid = false;
        this.youTubePlayer.seekTo(this.initialSeekToTime, true);
        this.youTubePlayer.pauseVideo();
        console.log("new vid ", this.initialSeekToTime);
      }
    }
  }

  localPaused() { 
    this.isPlayingEmitter.emit(false);
  }

  localPlayed() { 
    if (this.newLocalVid) { 
      this.localPlayer.getDefaultMedia().currentTime = this.initialSeekToTime;
      this.newLocalVid = false;
      this.localPlayer.pause();
      return;
    }

    if (this.isFirstPlayLocal) { 
      this.localPlayer.pause();
      this.isFirstPlayLocal = false; 
      return;
    }

    this.isPlayingEmitter.emit(true);
  }

}

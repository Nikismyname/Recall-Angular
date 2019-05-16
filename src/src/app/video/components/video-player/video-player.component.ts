import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { VideoType } from 'src/app/services/models/others/video-type';
import { SafeUrl } from '@angular/platform-browser';
import { VgAPI } from 'videogular2/core';
import { ElectronService } from 'ngx-electron';
import { VimeoPlayerComponent } from '../vimeo-player/vimeo-player.component';
import Player from '@vimeo/player';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  VideoType = VideoType;

  @Output() videoInitialDoneEmitter: EventEmitter<void> = new EventEmitter();
  @Output() isPlayingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() vimeoTimeAndDuration: EventEmitter<number[]> = new EventEmitter();

  isDone: boolean = false;

  initialSeekToTime: number;

  type: VideoType;

  vimeoPlayer: Player;
  vimeoToken: number;
  vimeoSetUp: boolean;

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
      this.newYouTubeVid = true;
      return;
    }

    this.type = VideoType.youTube;
    this.token = token;
    this.youTubeSetUp = true;
  }

  setUpVimeo(token: number) {
    if (this.vimeoSetUp) {
      this.vimeoPlayer.loadVideo(token);
      this.vimeoPlayer.setCurrentTime(this.initialSeekToTime);
      return;
    }
    this.type = VideoType.vimeo;
    this.vimeoToken = token;
    this.vimeoSetUp = true;
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

  play() {
    switch (this.type) {
      case VideoType.youTube:
        this.youTubePlayer.playVideo();
        break;
      case VideoType.local:
        this.localPlayer.getDefaultMedia().play();
        break;
      case VideoType.vimeo:
        this.vimeoPlayer.play();
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
        this.vimeoPlayer.pause();
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
        this.vimeoPlayer.setCurrentTime(time);
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

  getDuration() {
    switch (this.type) {
      case VideoType.youTube:
        return Math.trunc(this.youTubePlayer.getDuration());
      case VideoType.local:
        return Math.trunc(this.localPlayer.getDefaultMedia().duration);
      case VideoType.vimeo:
        return 0;
    }
  }

  getVimeoTimeAndDuration() {
    this.vimeoPlayer.getCurrentTime().then(x => {
      this.vimeoPlayer.getDuration().then(y => { 
        this.vimeoTimeAndDuration.emit([Math.round(x), Math.round(y)]);
      });
    });
  }

  public saveYouTubePlayer(player: YT.Player) {
    this.youTubePlayer = player;
    this.youTubePlayer.seekTo(this.initialSeekToTime, true);
    this.youTubePlayer.mute();
    this.videoInitialDoneEmitter.emit();
  }

  public saveLocalPlayer(player: VgAPI) {
    this.localPlayer = player;
    this.localPlayer.getDefaultMedia().currentTime = this.initialSeekToTime;
    this.localPlayer.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      () => {
        this.videoInitialDoneEmitter.emit();
    });
  }

  public saveVimeoPlayer(player: VimeoPlayerComponent) {
    this.vimeoPlayer = player;
    this.vimeoPlayer.on("pause", () => { 
      this.isPlayingEmitter.emit(false);
    })
    this.vimeoPlayer.on("play", () => { 
      this.isPlayingEmitter.emit(true);
    })
    this.vimeoPlayer.setCurrentTime(this.initialSeekToTime);
  }

  counter: number = 0;

  youtubeChange(e) {
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

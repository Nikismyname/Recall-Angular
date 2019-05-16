import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-custom-youtube-player',
  templateUrl: './custom-youtube-player.component.html',
  styleUrls: ['./custom-youtube-player.component.css']
})
export class CustomYoutubePlayerComponent implements OnInit {

  public YT: any;
  public player: YT.Player;
  public reframed: Boolean = false;
  public scriptAlreadyHere: boolean = false;

  @Output() onPlayerReadyEmitter: EventEmitter<YT.Player> = new EventEmitter();
  @Output() onPlayerChangeStateEmitter: EventEmitter<any> = new EventEmitter();
  @Input() videoId: string = "iDKIw3OgNcg"; 

  constructor() { }
  init() {
    //TODO: some widget scripts mess up the check the first time;
    let allScirpts = document.getElementsByTagName('script'); 
    let list = Array.prototype.slice.call(allScirpts);
    for (let scr of list) {
      if (scr.src === "https://www.youtube.com/iframe_api") {
        this.scriptAlreadyHere = true;
        return; 
      }
    }
 
    let firstScriptTag = document.getElementsByTagName('script')[0];
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  ngOnInit() {
    this.init();
    if (this.scriptAlreadyHere) { 
      this.setUpPlayer();
    } else {
      window['onYouTubeIframeAPIReady'] = (e) => this.setUpPlayer();
    };
  }

  setUpPlayer() {
    console.log("VIDEO_ID ",this.videoId);
    this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        videoId: this.videoId,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              //reframe(e.something.a) 
              this.onPlayerReadyEmitter.emit(this.player);
            }
          }
        }
      });
  }

  onPlayerStateChange(e) {
    this.onPlayerChangeStateEmitter.emit(e);
  };

  onPlayerError(event) {
    console.log("ERROR HERE", event);
    switch (event.data) {
      case 2:
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };
}

import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import Player from '@vimeo/player';

@Component({
  selector: 'app-vimeo-player',
  templateUrl: './vimeo-player.component.html',
  styleUrls: ['./vimeo-player.component.css']
})
export class VimeoPlayerComponent implements OnInit, AfterViewInit {
 
  player: Player; 

  @Output() onPlayerReadyEmitter: EventEmitter<Player> = new EventEmitter();
  @Input() token: number;

  constructor() { 

  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    console.log("token, ",this.token);
    let opt = {
      width: "100%",
      height: "100%", 
      id:this.token,
    };
    this.player = new Player("vimeo-player", opt);
    this.onPlayerReadyEmitter.emit(this.player);
  }

}

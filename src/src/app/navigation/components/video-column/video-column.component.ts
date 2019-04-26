import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IVideoIndex } from 'src/app/services/models/navigation/video-index';

@Component({
  selector: 'app-video-column',
  templateUrl: './video-column.component.html',
  styleUrls: ['./video-column.component.css']
})
export class VideoColumnComponent implements OnInit {

  @Input() videos: IVideoIndex[];
  @Input() colNumber: number;
  @Output() onDroppedEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onDropped(event) {
    this.onDroppedEmitter.emit(event);
  }

}

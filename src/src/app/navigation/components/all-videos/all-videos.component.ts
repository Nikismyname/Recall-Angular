import { Component, OnInit, Input } from '@angular/core';
import { IVideoIndex } from 'src/app/services/models/navigation/video-index';
import { ReorderService } from 'src/app/services/reorder.service';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.css']
})
export class AllVideosComponent implements OnInit {

  videos: IVideoIndex[] = [];
  col1Videos: IVideoIndex[] = [];
  col2Videos: IVideoIndex[] = [];
  col3Videos: IVideoIndex[] = [];

  @Input("videos") set videoSetter(data: IVideoIndex[]) {
    this.videos = data.sort((a, b) => a.order - b.order);
    for (let i = 0; i < this.videos.length; i++) {
      this.videos[i].order = i;
    }

    let videoCount = this.videos.length;
    this.col1Videos = this.videos
      .filter(x => this.reorderService.shouldDisplay(videoCount, x.order, 1));
    this.col2Videos = this.videos
      .filter(x => this.reorderService.shouldDisplay(videoCount, x.order, 2));
    this.col3Videos = this.videos
      .filter(x => this.reorderService.shouldDisplay(videoCount, x.order, 3));
  }

  constructor(
    private reorderService: ReorderService,
  ) { }

  ngOnInit() {
  }

  onDropped(e) {

  }

}

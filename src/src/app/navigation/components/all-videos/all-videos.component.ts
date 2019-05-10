import { Component, Input } from '@angular/core';
import { IVideoIndex } from 'src/app/services/models/navigation/video-index';
import { ReorderService } from 'src/app/services/reorder.service';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.css']
})
export class AllVideosComponent {

  videos: IVideoIndex[] = [];
  col1Videos: IVideoIndex[] = [];
  col2Videos: IVideoIndex[] = [];
  col3Videos: IVideoIndex[] = [];

  @Input("videos") set videoSetter(data: IVideoIndex[]) {
    this.videos = data;
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
    private navService: NavStoreService,
  ) { }

  onDropped(e) {
    let currentIndex = e.currentIndex;
    let prevIndex = e.previousIndex;

    let container = e.container;
    let currColumn = container.data;

    let prevContainer = e.previousContainer;
    let prevColumn = prevContainer.data;

    let orderings = this.reorderService.generateOrderingWithElements(
      this.videos,
      currentIndex,
      prevIndex,
      currColumn,
      prevColumn
    );

    this.navService.reorderVideos({
      dirId: 0, // set in the service
      orderings: orderings,
    });
  }

}

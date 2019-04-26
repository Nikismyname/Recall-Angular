import { Component, OnInit, Input } from '@angular/core';
import { IVideoIndex } from 'src/app/services/models/navigation/video-index';
import { RoutePaths, RoutesNoSlash } from 'src/app/services/route-paths';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() video: IVideoIndex;

  constructor(
    public routePaths: RoutePaths,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onClickVideo() {
    this.router.navigate([RoutesNoSlash.videoNotePath + "/"+ this.video.id]);
  }

  stopPropagation(e) {
    e.stopPropagation();
  } 

}

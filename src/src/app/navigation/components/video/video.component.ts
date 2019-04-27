import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IVideoIndex } from 'src/app/services/models/navigation/video-index';
import { RoutePaths, RoutesNoSlash } from 'src/app/services/route-paths';
import { Router } from '@angular/router';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { NavStoreService } from 'src/app/services/DataServices/nav-store.service.1';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() video: IVideoIndex;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private navService: NavStoreService,
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

  delete() {
    this.navService.deleteVideo(this.video.id);
  }

}

import { Component } from '@angular/core';
import { PublicService } from 'src/app/services/public.service';
import { IVideoPublicIndex } from 'src/app/services/models/video/video-public-index';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RoutesNoSlash } from '../../../services/route-paths';

@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.css']
})
export class PublicViewComponent {

  videos: IVideoPublicIndex[] = [];

  constructor(
    private publicService: PublicService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.publicService.getLatest().pipe(take(1)).subscribe(
      x => {
        this.videos = x;
      },
      error => {
        console.log(error);
        this.toastr.error("Failed at loading public videos!");
      }
    );
  }

  navigateToView(videoId: number) {
    this.router.navigate([RoutesNoSlash.videoViewPath+ "/" + videoId]);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { VideoRoutingModule } from './video-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateVideoComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
    ReactiveFormsModule,
  ]
})
export class VideoModule { }

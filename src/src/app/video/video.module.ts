import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { VideoRoutingModule } from './video-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

//Video Player Modules
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { NotateVideoComponent } from './components/notate-video/notate-video.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { NoteComponent } from './components/note/note.component';

const components = [
  CreateVideoComponent,
  NotateVideoComponent,
  VideoPlayerComponent
]; 

@NgModule({
  declarations: [...components, NoteComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
    ReactiveFormsModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ]
})
export class VideoModule { }

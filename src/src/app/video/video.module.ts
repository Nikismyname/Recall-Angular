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
import { ContextMenuModule } from 'ngx-contextmenu';
import { ColorPickerModule } from 'ngx-color-picker';
import { Test1Component } from './components/RichTextEditorTests/test1/test1.component';

const components = [
  CreateVideoComponent,
  NotateVideoComponent,
  VideoPlayerComponent
]; 

@NgModule({
  declarations: [...components, NoteComponent, Test1Component],
  imports: [
    CommonModule,
    VideoRoutingModule,
    NgxYoutubePlayerModule.forRoot(),
    ReactiveFormsModule,

    ContextMenuModule.forRoot({
      useBootstrap4: true
    }), 

    ColorPickerModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ]
})
export class VideoModule { }

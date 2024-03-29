import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateVideoComponent } from './components/create-video/create-video.component';
import { VideoRoutingModule } from './video-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { YTPlayerModule, YTPlayerConfig } from 'angular-youtube-player';

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
import { CustomYoutubePlayerComponent } from './components/custom-youtube-player/custom-youtube-player.component';
import { ImportVideosComponent } from './components/import-videos/import-videos.component';

import { SharedModule } from '../shared/shared.module';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MakeConnectionComponent } from './components/make-connection/make-connection.component';

import { AutosizeModule } from 'ngx-autosize';
import { AttachedTopicComponent } from './components/connection-components/attached-topic/attached-topic.component';

import { TooltipModule } from 'ng2-tooltip-directive';
import { VimeoPlayerComponent } from './components/vimeo-player/vimeo-player.component';

import {AngularFittextModule} from 'angular-fittext';
import { VideoViewComponent } from './components/video-view/video-view.component';

const components = [
  CreateVideoComponent,
  NotateVideoComponent,
  VideoPlayerComponent,
  NoteComponent,
  CustomYoutubePlayerComponent,
  ImportVideosComponent,
  MakeConnectionComponent,
  AttachedTopicComponent,
  VimeoPlayerComponent,
  
  Test1Component
]; 

@NgModule({
  declarations: [...components, VideoViewComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    NgxYoutubePlayerModule.forRoot(),
    YTPlayerModule,

    ContextMenuModule.forRoot({
      useBootstrap4: true
    }), 

    ColorPickerModule,

    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

    SharedModule,

    MatTooltipModule,

    AutosizeModule,

    TooltipModule,

    AngularFittextModule,
  ],
  providers: [
    {
      provide: YTPlayerConfig,
      useValue: { shouldLoadAPI: true, multiplePlaying: false }
    },
  ]
})
export class VideoModule { }

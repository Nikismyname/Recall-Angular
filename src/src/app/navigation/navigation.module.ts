import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AllVideosComponent } from './components/all-videos/all-videos.component';
import { CurrentDirComponent } from './components/current-dir/current-dir.component';
import { VideoComponent } from './components/video/video.component';
import { DirComponent } from './components/dir/dir.component';
import { DirListComponent } from './components/dir-list/dir-list.component';
import { NavigationRoutingModule } from './navigation-routing.module';
import { VideoColumnComponent } from './components/video-column/video-column.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MoveVideoComponent } from './components/move-video/move-video.component';

import { SharedModule } from '../shared/shared.module';
 
const components = [
  NavigationComponent,
  AllVideosComponent,
  VideoColumnComponent,
  VideoComponent,
  DirComponent,
  DirListComponent,
  CurrentDirComponent, 
  MoveVideoComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    DragDropModule,
    NavigationRoutingModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true
    }), 
    SharedModule,
  ]
})
export class NavigationModule { }

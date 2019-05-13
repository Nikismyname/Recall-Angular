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
import { SimplePromptComponent } from './components/simple-prompt/simple-prompt.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
 
const components = [
  NavigationComponent,
  AllVideosComponent,
  VideoColumnComponent,
  VideoComponent,
  DirComponent,
  DirListComponent,
  CurrentDirComponent, 
  MoveVideoComponent,
  SimplePromptComponent,
];

@NgModule({
  declarations: [...components],
  entryComponents: [SimplePromptComponent],
  imports: [
    //MatDialogModule,
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

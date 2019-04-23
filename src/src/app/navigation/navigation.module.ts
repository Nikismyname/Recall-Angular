import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AllVideosComponent } from './components/all-videos/all-videos.component';
import { CurrentDirComponent } from './components/current-dir/current-dir.component';
import { VideoComponent } from './components/video/video.component';
import { DirComponent } from './components/dir/dir.component';
import { DirListComponent } from './components/dir-list/dir-list.component';
import { NavigationRoutingModule } from './navigation-routing.module';

const components = [
  NavigationComponent,
  AllVideosComponent,
  CurrentDirComponent,
  VideoComponent,
  DirComponent,
  DirListComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    NavigationRoutingModule,
  ]
})
export class NavigationModule { }

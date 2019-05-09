import { Component } from '@angular/core';
import { AuthStoreService } from './services/DataServices/auth-store.service';
import { ElectronService } from 'ngx-electron';
import { NavStoreService } from './services/DataServices/nav-store.service.1';
import { take } from 'rxjs/operators';
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'recall';
  constructor(
    private authService: AuthStoreService,
    private electronService: ElectronService,
    private navService: NavStoreService,
    private videoService: VideoService,
  ) {
    if (this.electronService.isElectronApp) {
      electronService.webFrame.setZoomFactor(1.75);
    }

    let loginData = localStorage.getItem("user");
    if (loginData !== null) {
      this.authService.setUser(JSON.parse(loginData));
    }

    window.addEventListener("message", event => {
      if (event.source != window || event["data"]["message"] !== "recallCreate") { return; }
      this.createExternalVideo(event["data"]["directory"], event["data"]["name"], event["data"]["url"])
    }, false);
  }

  //directory can be "root", "current", "chooseLater"
  createExternalVideo(directory: string, name: string, url: string) {
    url = decodeURIComponent(url);
    console.log("Event Items Here: ", directory, name, url);

    let chooseLater: boolean = directory === "chooseLater";
    let current: boolean = directory === "current";
    let root: boolean = directory === "root";

    let currentParentId: number;
    if (current) {
      this.navService.navIndex$.pipe(take(1)).subscribe(x => {
        if (x === null) {
          chooseLater = true;
          current = false;
        } else {
          currentParentId = x.id;
        }
      })
    }

    if (chooseLater) {
          
    } else if (current) {
      let videoName = name;
      if (videoName.length > 40) {
        videoName = name.slice(0, 37) + "...";
      }
      this.videoService.create({
        directoryId: currentParentId,
        name: videoName,
        url: url,
        description: name,
        isYouTube: true,
        isVimeo: false,
        isLocal: false
      }).pipe(take(1)).subscribe(videoNav => {
        this.navService.registerCreatedVideo(videoNav);
      });
    } else if (root) { 
      let videoName = name;
      if (videoName.length > 40) {
        videoName = name.slice(0, 37) + "...";
      }
      this.videoService.create({
        directoryId: -1,
        name: videoName,
        url: url,
        description: name,
        isYouTube: true,
        isVimeo: false,
        isLocal: false
      }).pipe(take(1)).subscribe(videoNav => { 
        this.navService.registerCreatedVideo(videoNav, -1);
      });
    }
  }
}

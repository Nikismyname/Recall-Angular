import { Component } from '@angular/core';
import { AuthStoreService } from './services/data-services/auth-store.service';
import { ElectronService } from 'ngx-electron';
import { NavStoreService } from './services/data-services/nav-store.service.1';
import { take } from 'rxjs/operators';
import { VideoService } from './services/video.service';
import { ToastrService } from 'ngx-toastr';
import { IUser } from './services/models/authentication/user';
import { Router } from '@angular/router';
import { RoutesNoSlash } from './services/route-paths'; 
import { OptionsStoreService } from './services/data-services/options-store-service';
import { ThemeType } from './services/models/options/theme-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ThemeType = ThemeType

  title = 'recall';
  constructor(
    private authService: AuthStoreService,
    private electronService: ElectronService,
    private navService: NavStoreService,
    private videoService: VideoService,
    private toastr: ToastrService,
    private router: Router,
    public optionsService: OptionsStoreService,
  ) {
    //this.loadIfNot("slate", "./../assets/slate.css");
    this.setStyles();

    if (this.electronService.isElectronApp) {
      electronService.webFrame.setZoomFactor(1.75);
    }

    let loginData = <IUser>JSON.parse(localStorage.getItem("user"));
    if (loginData !== null) {
      this.authService.setUser(loginData);
    }

    this.optionsService.getAllOptionsFromLocalStorage(); 

    window.addEventListener("message", event => {
      if (event.source != window || event["data"]["message"] !== "recallCreate") { return; }
      this.createExternalVideo(
        event["data"]["directory"],
        event["data"]["name"],
        event["data"]["url"],
        event["data"]["shouldOpen"], 
        event["data"]["type"],
      )
    }, false);
  }

  setStyles() {
    this.optionsService.options$.subscribe(options => { 
      if (options !== null) {
        console.log("OPTIONS, ", options);
        if (options.theme === ThemeType.Lux) {
          console.log("LUX");
          this.loadIfNot("lux", "./../assets/css/lux.css");
          this.disableCss("slate");
          //require("style-loader!");
        } else if (options.theme === ThemeType.Slate) {
          console.log("SLATE");
          this.loadIfNot("slate", "./../assets/slate.css");
          this.disableCss("lux");
          //require("style-loader!./../css/slate.css");
        } else {
          console.log("No Theme Match");
        }
      } else {
        console.log("DEFAULT");
        this.loadIfNot("slate", "./../assets/slate.css");
        this.disableCss("lux");
      }
    });
  }

  loadIfNot(cssId,url){
  //   if (!document.getElementById(cssId)){
  //      var head  = document.getElementsByTagName('head')[0];
  //      var link  = document.createElement('link');
  //      link.id   = cssId;
  //      link.rel  = 'stylesheet';
  //      link.type = 'text/css';
  //      link.href = url;
  //      link.media = 'all';
  //     head.appendChild(link);
  //     console.log("created");
  //  }else{
      document.getElementById(cssId)["disabled"] = false;///i fit's already there, enable it
      console.log("enabled");
  //  }
  }
  
  disableCss(cssId) {
    if (document.getElementById(cssId)) {
      document.getElementById(cssId)["disabled"] = true;
    }
  }

  //directory can be "root", "current", "chooseLater"
  createExternalVideo(directory: string, name: string, url: string, shouldOpen: boolean, type: string) {
    url = decodeURIComponent(url);
    console.log("Event Items Here: ", directory, name, url);

    let isVimeo = type === "vimeo";
    let isYouTube = type === "youtube";

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
      this.videoService.addExtension({
        name: name,
        url: url,
        type: type,
      }).pipe(take(1)).subscribe(() => { }, error => {
        console.log(error);
        this.toastr.error("Filed at storing Extension Video!");
      });
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
        isYouTube: isYouTube,
        isVimeo: isVimeo,
        isLocal: false
      }).pipe(take(1)).subscribe(videoNav => {
        this.navService.registerCreatedVideo(videoNav);
        if (shouldOpen) {
          this.router.navigate([RoutesNoSlash.videoNotePath+ "/" + videoNav.id]);
        }
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
        isYouTube: isYouTube,
        isVimeo: isVimeo,
        isLocal: false
      }).pipe(take(1)).subscribe(videoNav => {
        this.navService.registerCreatedVideo(videoNav, -1);
        if (shouldOpen) {
          this.router.navigate([RoutesNoSlash.videoNotePath+ "/" + videoNav.id]);
        }
      });
    }
  }
}

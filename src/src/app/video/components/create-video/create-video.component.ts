import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IVideoCreate } from 'src/app/services/models/video/video-create';
import { ActivatedRoute, Router } from "@angular/router";
import { UrlService } from 'src/app/services/url.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VideoService } from 'src/app/services/video.service';
import { take } from 'rxjs/operators';
import { RoutesNoSlash } from '../../../services/route-paths'; 
import { NavStoreService } from 'src/app/services/DataServices/nav-store.service.1';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent {

  localVidSources: SafeUrl[];
  localVidSelected: boolean = false;
  sources: SafeUrl[];
  dirId: number;
  form: FormGroup;
  player: YT.Player;
  token: string = "Yan892RXh5A";
  loaded: boolean = false;

  @ViewChild("frameDiv") frame: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
    private videoService: VideoService,
    private navService: NavStoreService,
    public electronService: ElectronService,
    private domSanitizer: DomSanitizer,
  ) {
    this.dirId = Number(this.route.snapshot.paramMap.get("id"));
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      url: ["",[Validators.required, this.urlValidator]],
      description: [""],
      videoType: ["", Validators.required],
    });
    this.form.patchValue({ videoType: "YouTube" });
    this.setValidators();
  }

  onClickPlay() {
    let url = this.form.controls["url"].value;
    let token = this.urlService.extractToken(url);
    this.player.loadVideoById(token);
  }

  ngAfterViewInit() {
    this.frame.nativeElement.style.height = ((this.frame.nativeElement.offsetWidth) * 9 / 16) + "px";
  }

  onSubmit() {
    let submitData: IVideoCreate = <IVideoCreate>this.form.value;
    submitData.directoryId = this.dirId;
    submitData.isLocal = this.form.controls.videoType.value === "Local";
    submitData.isYouTube = this.form.controls.videoType.value === "YouTube";
    submitData.isVimeo = this.form.controls.videoType.value === "Vimeo";
    let bools = [submitData.isLocal, submitData.isVimeo, submitData.isYouTube];
    if (bools.filter(x => x).length !== 1) {
      alert("Video Type Error!");
      return;
    }
    delete submitData["videoType"];
    
    this.videoService.create(submitData).pipe(take(1)).subscribe(
      videoIndex => {
        this.navService.registerCreatedVideo(videoIndex); 
        this.router.navigate([RoutesNoSlash.indexPath + "/" + this.dirId]); 
      },
      error => { 
        console.log(error);
      }
    );
  }

  urlValidator = (c: FormControl) => {
    let token = this.urlService.extractToken(c.value);
    if (token !== null && token.length !== 0) {
      console.log("token present Pass");
      return null;
    }
    console.log("token not present Fail");
    return { validationError: true };
  }

  savePlayer(player: YT.Player) {
    this.player = player;
  }

  setValidators() {
    const urlControl = this.form.get('url');

    this.form.get('videoType').valueChanges
      .subscribe(value => {

        if (value === 'YouTube') {
          urlControl.setValidators([Validators.required, this.urlValidator]);
          this.localVidSelected = false;
        } else {
          urlControl.setValidators([Validators.required]);
        }

        urlControl.updateValueAndValidity();
      });
  }

  get c() {
    return this.form.controls;
  }

  localFileSelect() {
    if (this.electronService.isElectronApp) {
      let strings = this.electronService.remote.dialog.showOpenDialog({ properties: ['openFile'] });
      let url = strings[0];
      let objUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
      this.form.controls["url"].setValue(url);
      this.localVidSelected = true; 
      this.localVidSources = []; 
      this.localVidSources = this.localVidSources.concat(objUrl);
    }
  }

}

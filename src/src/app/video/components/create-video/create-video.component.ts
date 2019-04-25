import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IVideoCreate } from 'src/app/services/models/video/video-create';
import { ActivatedRoute } from "@angular/router";
import { UrlService } from 'src/app/services/url.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent {

  localVidSrc: SafeUrl;
  localVidStringSrc: string;
  sources: SafeUrl[];
  dirId: number;
  form: FormGroup;
  player: YT.Player;
  token: string = "Yan892RXh5A";
  loaded: boolean = false;

  @ViewChild("frameDiv") frame: ElementRef;
  @ViewChild("frameDivLocal") frameLocal: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private domSanitizer: DomSanitizer
  ) {
    this.dirId = Number(this.route.snapshot.paramMap.get("id"));
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      url: [""],
      description: [""],
      videoType: [""],
    });
    this.setValidators();
  }

  urlValid = (c: FormControl) => {

    if (!this.form) { 
      console.log("No Form Yet");
      return { validationError: true };
    };

    if (this.form.controls.videoType.value !== "YouTube") {
      console.log("Not YouTube Pass");
      return null;
    } else if (c.value.length === 0) { 
      console.log("YouTube + length 0 Fail");
      return { validationError: true };
    }
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

  onClickPlay() {
    let url = this.form.controls["url"].value;
    console.log(url);
    let token = this.urlService.extractToken(url);
    console.log(token);
    this.player.loadVideoById(token);
  }

  ngAfterViewInit() {
    this.frame.nativeElement.style.height = (this.frame.nativeElement.offsetWidth) * 9 / 16 + "px";
  }

  onSubmit() {
    let submitData: IVideoCreate = <IVideoCreate>this.form.value;
    submitData.directoryId = this.dirId;
    console.log(submitData);
  }

  onVideoTypeSelected() {
    this.form.controls.url.updateValueAndValidity();
    console.log("Here");
  }

  setValidators() {
    const urlControl = this.form.get('url');

    this.form.get('videoType').valueChanges
      .subscribe(value => {

        if (value === 'YouTube') {
          urlControl.setValidators([Validators.required]);
        } else {
          urlControl.setValidators(null);
        }

        urlControl.updateValueAndValidity();
      });
  }

  onFileSelected(e) {
    let file = e.target.files[0];
    if (file) {
      console.log(file);
      localStorage.setItem("file", JSON.stringify(file));
      let objectUrl: string = window.URL.createObjectURL(file);
      this.localVidStringSrc = objectUrl;
      this.localVidSrc = this.domSanitizer.bypassSecurityTrustUrl(objectUrl);
      this.sources = [];
      this.sources.push(this.localVidSrc);
      this.loaded = true;
    }
  }

}

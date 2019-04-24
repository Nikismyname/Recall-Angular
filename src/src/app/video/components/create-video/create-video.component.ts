import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IVideoCreate } from 'src/app/services/models/video/video-create';
import { ActivatedRoute } from "@angular/router";
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {

  dirId: number;
  form: FormGroup;
  player: YT.Player;
  token: string ="Yan892RXh5A"; 

  @ViewChild("frameDiv") frame: ElementRef; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private urlService: UrlService
  ) { 
    this.dirId = Number(this.route.snapshot.paramMap.get("id"));
    this.form = this.fb.group({
      name: [""],
      url: [""],
      description: [""],
    });
  }

  DirectoryId
  
  ngOnInit() {
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
    this.frame.nativeElement.style.height =  (this.frame.nativeElement.offsetWidth)*9/16 + "px";
  }

  onSubmit() {
    let submitData:IVideoCreate = <IVideoCreate>this.form.value;
    submitData.directoryId = this.dirId;
  }

}

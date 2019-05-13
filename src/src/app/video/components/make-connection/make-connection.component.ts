import { Component } from '@angular/core';
import { DirectoryService } from 'src/app/services/directory.service';
import { ActivatedRoute } from '@angular/router';
import { IDirWithItemsSelect } from 'src/app/services/models/others/dir-with-items-select';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConnectionType } from 'src/app/services/models/enums/connection-type';
import { ITopicFolder } from 'src/app/services/models/meta/topic-folder';
import { ITopicCreate } from 'src/app/services/models/meta/topic-create';
import { MetaService } from 'src/app/services/meta-servce';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from 'src/app/services/video.service';
import { IVideoForConnections } from 'src/app/services/models/video/video-for-connections';

enum CurrentDisplay {
  selectingVideo,
  selectingTopic,
  creatingVideoConnection,
  creatingNewTopic,
  mainDisplay,
}

@Component({
  selector: 'app-make-connection',
  templateUrl: './make-connection.component.html',
  styleUrls: ['./make-connection.component.css']
})
export class MakeConnectionComponent {
  ConnectionType = ConnectionType;
  CurrentDisplay = CurrentDisplay;

  currentDisplay: CurrentDisplay = CurrentDisplay.mainDisplay;

  videoToVideoConnectionForm: FormGroup;
  createTopicForm: FormGroup;
  connectionTypeKeys: string[];

  videoOneId: number;
  videoTwoId: number;
  allVideoItems: IDirWithItemsSelect[];
  videoItemsLoaded: boolean = false;

  allTopics: ITopicFolder[] = [];
  topicsLoaded: boolean = false;
  selectedTopic: number = null;

  video: IVideoForConnections;
  videoLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dirService: DirectoryService,
    private route: ActivatedRoute,
    private metaService: MetaService,
    private toastr: ToastrService,
    private videoService: VideoService,
  ) {
    this.videoOneId = Number(this.route.snapshot.paramMap.get("id"));
    this.loadVideo(); 

    this.connectionTypeKeys = Object.keys(this.ConnectionType).filter(x => isNaN(Number(x)) === false);

    this.setVideoToVideoForm();
    this.setCreateTopicForm();

    this.dirService.getAllItems().pipe(take(1)).subscribe(x => {
      this.allVideoItems = x;
      this.videoItemsLoaded = true;
    });
  }

  loadVideo() { 
    this.videoService.getForConnections(this.videoOneId).pipe(take(1)).subscribe(x => { 
      this.video = x; 
      this.videoLoaded = true;
    });
  }

  itemSelected(ids: number[]) {
    let id = ids[0];
    this.videoTwoId = id;
    if (this.videoOneId === this.videoTwoId) {
      alert("You can not connect a video to itself!");
      return;
    }
  }

  setVideoToVideoForm() {
    this.videoToVideoConnectionForm = this.fb.group({
      strength: ["", [Validators.required, this.strengthValidator]],
      name: ["", [Validators.required]],
      type: ["", Validators.required],
    });

    this.videoToVideoConnectionForm.patchValue({ type: "0" });
  }

  setCreateTopicForm() {
    this.createTopicForm = this.fb.group({
      name: [],
      description: [],
      criteriaForBelonging: [],
    });
  }

  strengthValidator = (c: FormControl) => {
    if (c.value >= 1 && c.value <= 10) {
      return null;
    } else {
      return { outOfRangeStrengthValue: true };
    }
  }

  onSubmitVideoToVideoConnection(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(this.videoToVideoConnectionForm);
    this.currentDisplay = CurrentDisplay.mainDisplay;
  }

  onSubmitCreateTopic(e) {
    e.preventDefault();
    e.stopPropagation();

    let data = <ITopicCreate>this.createTopicForm.value;
    data.parentTopicId = this.selectedTopic;

    this.metaService.createTopic(data).pipe(take(1)).subscribe(
      x => {
        //console.log(x);
        this.toastr.success("Created Topic!");
      },
      error => {
        console.log(error);
        this.toastr.error("Filed at creating topic!");
      });

    this.currentDisplay = CurrentDisplay.mainDisplay;
  }

  get vc() {
    return this.videoToVideoConnectionForm.controls;
  }

  fixEnumName(enumName: string): string {
    return enumName.split("_").join(" ");
  }

  getNamelabel() {
    switch (this.videoToVideoConnectionForm.controls["type"].value) {
      case "0":
        return "Topic Name";
      case "1":
        return "Relation Name";
      case "2":
        return "Series Name";
      case "3":
        return "Series Name";
      case "4":
        return "Author Name";
    }
  }

}

import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ITopicFolder } from 'src/app/services/models/meta/topic-folder';

@Component({
  selector: 'app-attached-topic',
  templateUrl: './attached-topic.component.html',
  styleUrls: ['./attached-topic.component.css']
})
export class AttachedTopicComponent implements OnInit {

  @Input() topic: ITopicFolder;

  constructor() {
   }

  ngOnInit() {
  }

  removeFromVideo() {
    alert("Removed");
  }

  changeAdherence() { 
    alert("Adherence Change")
  }

  showOtherVideosOnTopic() { 
    alert("Show Other Videos")
  }

}

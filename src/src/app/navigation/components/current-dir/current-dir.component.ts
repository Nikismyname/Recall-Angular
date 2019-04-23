import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoutePaths } from 'src/app/services/route-paths';
import { INavIndex } from 'src/app/services/models/navigation/nav-index';

@Component({
  selector: 'app-current-dir',
  templateUrl: './current-dir.component.html',
  styleUrls: ['./current-dir.component.css']
})
export class CurrentDirComponent implements OnInit {

  @Input() currentDir: INavIndex;
  @Output() currentDirClickedEmitter: EventEmitter<number> = new EventEmitter();

  constructor(
    public routePaths: RoutePaths,
  ) { }

  ngOnInit() {
  }

  onClickCurrentSheet(e) {
    this.currentDirClickedEmitter.emit(this.currentDir.parentDirectoryId);
  } 

  stopPropagation(e) {
    e.stopPropagation();
  } 
}

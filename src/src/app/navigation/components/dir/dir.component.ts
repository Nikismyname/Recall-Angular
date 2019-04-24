import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDirChildIndex } from 'src/app/services/models/navigation/dir-child-index';
import { RoutePaths } from 'src/app/services/route-paths';

@Component({
  selector: 'app-dir',
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.css']
})
export class DirComponent implements OnInit {

  @Input() dir: IDirChildIndex;
  @Output() dirClickedEmitter: EventEmitter<number> = new EventEmitter(); 

  constructor(
    public routePaths: RoutePaths,
  ) { }

  ngOnInit() {
  }

  onClickDir(e) {
    this.dirClickedEmitter.emit(this.dir.id);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

}

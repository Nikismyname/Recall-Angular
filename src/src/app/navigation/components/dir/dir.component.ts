import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IDirChildIndex } from 'src/app/services/models/navigation/dir-child-index';
import { RoutePaths } from 'src/app/services/route-paths';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';

@Component({
  selector: 'app-dir',
  templateUrl: './dir.component.html',
  styleUrls: ['./dir.component.css']
})
export class DirComponent implements OnInit {

  @Input() dir: IDirChildIndex;
  @Output() dirClickedEmitter: EventEmitter<number> = new EventEmitter(); 
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    public routePaths: RoutePaths,
    public navService: NavStoreService,
  ) { }

  ngOnInit() {
  }

  onClickDir(e) {
    this.dirClickedEmitter.emit(this.dir.id);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  delete() {
    this.navService.deleteDirectory(this.dir.id);
  }

  edit() {
    
  }

}

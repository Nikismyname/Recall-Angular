import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IDirChildIndex } from 'src/app/services/models/navigation/dir-child-index';
import { ReorderService } from 'src/app/services/reorder.service';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';

@Component({
  selector: 'app-dir-list',
  templateUrl: './dir-list.component.html',
  styleUrls: ['./dir-list.component.css']
})
export class DirListComponent {

  @Input() dirs: IDirChildIndex[]; 
  @Output() onClickDirEmitter: EventEmitter<number> = new EventEmitter(); 

  constructor(
    private reorderService: ReorderService,
    private navService: NavStoreService,
  ) { }

  onDirClicked(id) { 
    this.onClickDirEmitter.emit(id);
  }

  onDropped(e) {
    let currentIndex = e.currentIndex;
    let prevIndex = e.previousIndex;
    if (currentIndex == prevIndex) {
      return;  
    }

    let orderings = this.reorderService.generateReorderingsDir(this.dirs, currentIndex, prevIndex);

    this.navService.reorderDirectories({
      dirId: 0, //set in the service
      orderings: orderings,
    });
  }
 
}

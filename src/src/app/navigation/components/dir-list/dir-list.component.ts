import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IDirChildIndex } from 'src/app/services/models/navigation/dir-child-index';
import { IReorderData } from 'src/app/services/models/others/reorder-data';
import { ReorderService } from 'src/app/services/reorder.service';

@Component({
  selector: 'app-dir-list',
  templateUrl: './dir-list.component.html',
  styleUrls: ['./dir-list.component.css']
})
export class DirListComponent {

  @Input() currentDirId: number; 
  @Input() dirs: IDirChildIndex[]; 
  @Output() onClickDirEmitter: EventEmitter<number> = new EventEmitter(); 
  @Output() onDroppedEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private reorderService: ReorderService,
  ) { }

  onDirClicked(id) { 
    this.onClickDirEmitter.emit(id);
  }

  onDropped(e) {
    let currentIndex = e.currentIndex;
    let prevIndex = e.previousIndex;
    let orderings = this.reorderService.generateReorderingsDir(this.dirs, currentIndex, prevIndex);
    let qr: IReorderData = {
      orderings: orderings,
      dirId: this.currentDirId,
    };
    this.onDroppedEmitter.emit(qr);
  }
 
}

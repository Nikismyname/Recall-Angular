import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFolderSelectData } from 'src/app/services/models/others/folder-select-data';

@Component({
  selector: 'getready-folder-recursion',
  templateUrl: './folder-recursion.component.html',
  styleUrls: ['./folder-recursion.component.css']
})
export class FolderRecursionComponent implements OnInit {

  constructor() { }
   
  _foldedFolders: number[] = [];
  _selectedId: number = null;
           
  @Input() currentNode: IFolderSelectData;
  allNotes: IFolderSelectData[];
  @Input("allNotes") set allNotesSetter(data: IFolderSelectData[]) { 
    this.allNotes = data;
  }
  @Input()
  set foldedFolders(foldedFolders: number[]) {
    this.isFolded = foldedFolders.includes(this.currentNode.id) ? true : false;
    this._foldedFolders = foldedFolders;
  }
  @Input()
  set selectedId(selectedId: number) {
    this.isSelected = selectedId === this.currentNode.id ? true : false; 
    this._selectedId = selectedId;
  }

  @Output() selected: EventEmitter<number> = new EventEmitter();
  @Output() folded: EventEmitter<number> = new EventEmitter();

  loaded: boolean = false;
  isSelected: boolean = false; 
  isFolded: boolean = false;
  ngOnInit() {
    this.loaded = true;
  }

  getChildFolders() {
    if (this.loaded) {
      return this.allNotes.filter(x => x.parentId === this.currentNode.id);
    } else {
      return [];
    }
  }

  onClickNode() {
    this.selected.emit(this.currentNode.id);
  }
  childEmitedSelected(e) {    
    this.selected.emit(e);
  }

  onClickFold() {
    this.folded.emit(this.currentNode.id);
  }
  childEmitedFolded(e) {
    this.folded.emit(e); 
  }
  
}

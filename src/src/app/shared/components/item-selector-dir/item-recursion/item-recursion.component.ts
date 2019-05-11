import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IItemsPickedData } from '../item-selector/item-selector.component';
import { IDirWithItemsSelect } from 'src/app/services/models/others/dir-with-items-select';
//typed
@Component({
  selector: 'getready-item-recursion',
  templateUrl: './item-recursion.component.html',
  styleUrls: ['./item-recursion.component.css']
})
export class ItemRecursionComponent implements OnInit {

  constructor() { }
   
  foldedFolders: number[] = [];
  
  @Input() currentNode: IDirWithItemsSelect;
  @Input() allNotes: IDirWithItemsSelect[];
  @Input() isSingle: boolean;
  @Input("foldedFolders")
  set foldedFoldersSetter(foldedFolders: number[]) {
    this.isFolded = foldedFolders.includes(this.currentNode.id) ? true : false;
    this.foldedFolders = foldedFolders;
  }

  @Output() selected: EventEmitter<IItemsPickedData> = new EventEmitter();
  @Output() folded: EventEmitter<number> = new EventEmitter();
  @Output() singleItemFinalSelectedEmitter: EventEmitter<number> = new EventEmitter();

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

  sheetCheckboxClicked() {
    this.selected.emit({
      parentDirId: this.currentNode.id, 
      dirSelected: true, 
      itemId: null,
    });
  }

  itemCheckboxCicked(id: number) {
    this.selected.emit({
      parentDirId: this.currentNode.id, 
      dirSelected: false, 
      itemId: id,
    });
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

  onClickNode(id: number) {
    
  } 

  itemTextClicked(itemId: number) {
    
  }

  childEmitterSingleItemFinal(e) { 
    this.singleItemFinalSelectedEmitter.emit(e);
  }
  
  itemTextDoubleClicked(itemId: number) { 
    if (this.isSingle) {
      this.singleItemFinalSelectedEmitter.emit(itemId);
    }
  }

} 

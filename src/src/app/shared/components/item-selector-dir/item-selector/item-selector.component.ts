import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IDirWithItemsSelect } from 'src/app/services/models/others/dir-with-items-select';

export interface IItemsPickedData {
  parentDirId: number,
  dirSelected: boolean,
  itemId: number
}

@Component({
  selector: 'getready-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.css']
})
export class ItemSelectorComponent implements OnInit {

  constructor() { }

  @Input() folders: IDirWithItemsSelect[];
  @Input() isSingle: boolean;
  @Output() selectedItemsEmitter: EventEmitter<number[]> = new EventEmitter();

  loaded: boolean = false;
  root: IDirWithItemsSelect;
  foldedFolders: number[] = [];

  ngOnInit() {
    this.root = this.folders.filter(x => x.parentId === null)[0];
    this.loaded = true;
    for (let i = 0; i < this.folders.length; i++) {
      for (let j = 0; j < this.folders[i].items.length; j++) {
        let item = this.folders[i].items[j];
        item.selected = false;
      }
      this.folders[i].selected = false;
    }
  }

  itemsSelected(d: IItemsPickedData) {
    console.log(d);
    let { parentDirId, dirSelected, itemId } = d;

    let parentDir = this.folders.filter(x => x.id == parentDirId)[0];

    if (!dirSelected) {
      let item = parentDir.items.filter(x => x.id === itemId)[0];

      if (item.selected === true) {
        item.selected = false;
        if (parentDir.selected === true) {
          parentDir.selected = false;
        }
      } else {
        item.selected = true;
        if (parentDir.items.every(x => x.selected === true)) {
          parentDir.selected = true;
        }
      }
    } else {
      if (parentDir.selected === false) {
        for (let i = 0; i < parentDir.items.length; i++) {
          let item = parentDir.items[i];
          item.selected = true;
        }
        parentDir.selected = true;
      } else {
        for (let i = 0; i < parentDir.items.length; i++) {
          let item = parentDir.items[i];
          item.selected = false;
        }
        parentDir.selected = false;
      }
    }
  }

  folderFolded(id) {
    if (this.foldedFolders.includes(id)) {
      this.foldedFolders = this.foldedFolders.filter(x => x !== id);
    } else {
      this.foldedFolders = this.foldedFolders.concat(id);
    }
  }

  itemsFinalSelection = () => {
    let ids = this.folders.map(x => x.items
      .filter(x => x.selected === true)
      .map(y => y.id))
      .reduce((a, b) => a.concat(b));

    if (ids.length > 0) {
      this.selectedItemsEmitter.emit(ids);
    }
  }

  singleItemFinalSelected(itemId: number) {
    if (itemId) {
      this.selectedItemsEmitter.emit([itemId]);
    }
  }

}

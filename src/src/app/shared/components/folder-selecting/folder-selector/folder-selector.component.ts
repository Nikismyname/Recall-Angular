import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFolderSelectData } from 'src/app/services/models/others/folder-select-data';
import { DirectoryService } from 'src/app/services/directory.service';
import { take } from 'rxjs/operators';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';
import { Location } from '@angular/common';

@Component({
  selector: 'getready-folder-selector',
  templateUrl: './folder-selector.component.html',
  styleUrls: ['./folder-selector.component.css']
})
export class FolderSelectorComponent {

  constructor(
    private directoryService: DirectoryService,
    private navService: NavStoreService,
    private location: Location,
  ) { }

  folders: IFolderSelectData[];
  @Input("folders") set foldersSetter(incFolders: IFolderSelectData[]) {
    this.folders = incFolders;
    if (this.folders.length > 0) {
      this.root = this.folders.filter(x => x.parentId === null)[0];
      this.loaded = true;
    } else {
      this.loaded = false;
    }
  };
  @Input() parentHandlesBack: boolean = false;
  @Output() folderSelectedEmitter: EventEmitter<number> = new EventEmitter();
  @Output() folderCreatedRefresh: EventEmitter<void> = new EventEmitter();
  @Output() backEmitter: EventEmitter<void> = new EventEmitter();

  areCreatingFolder: boolean = false;

  loaded: boolean = false;
  root: IFolderSelectData;
  selectedId: number = null;
  foldedFolders: number[] = [];

  folderSelected(e) {
    this.selectedId = e.id;
    if (e.doubleClick) {
      this.folderSelectedEmitter.emit(e.id);
    }
  }

  folderFolded(id) {
    if (this.foldedFolders.includes(id)) {
      this.foldedFolders = this.foldedFolders.filter(x => x !== id);
    } else {
      this.foldedFolders = this.foldedFolders.concat(id);
    }
  }

  folderFinalChosen = () => {
    if (this.selectedId !== null) {
      this.folderSelectedEmitter.emit(this.selectedId);
    }
  }

  onClickCreateFolder = () => {
    let name: string = window.prompt("Select name for the directory!");
    if (name.toLowerCase() === "root") { return; }
    if (name.length === 0) { return; }
    this.directoryService.create({ parentDirectoryId: this.selectedId, name: name })
      .pipe(take(1))
      .subscribe(
        dirInd => {
          this.navService.registerCreatedDirectory(dirInd, this.selectedId);
          this.folderCreatedRefresh.emit();
        },
        error => {
          console.log("create dir failed ", error);
        }
      );
  }

  back() {
    if (!this.parentHandlesBack) {
      this.location.back();
    } else {
      this.backEmitter.emit();
    }
  }

}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IDirChildIndex } from 'src/app/services/models/navigation/dir-child-index';
import { RoutePaths } from 'src/app/services/route-paths';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { NavStoreService } from 'src/app/services/data-services/nav-store.service.1';
import { DirectoryService } from 'src/app/services/directory.service';
import { take } from 'rxjs/operators';
import { IDirectoryEdit } from 'src/app/services/models/directory/directory-edit';
import { ToastrService } from 'ngx-toastr';

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
    private dirService: DirectoryService,
    private toastr: ToastrService,
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
    let newName = prompt("Choose new name", this.dir.name);
    if (newName) {
      let data: IDirectoryEdit = { newName: newName, directoryId: this.dir.id }; 
      this.dirService.edit(data).pipe(take(1)).subscribe(() => { 
        this.navService.registerEditedDirectory(data); 
      },
        error => { 
          console.log(error);
          this.toastr.error("Failed at editing the directory!")
        }
      )
    }
  }

}

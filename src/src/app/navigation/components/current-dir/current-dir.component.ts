import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoutePaths } from 'src/app/services/route-paths';
import { INavIndex } from 'src/app/services/models/navigation/nav-index';
import { DirectoryService } from 'src/app/services/directory.service';
import { take } from 'rxjs/operators';

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
    private directoryService: DirectoryService,
  ) { }

  ngOnInit() {
  }

  onClickCurrentSheet(e) {
    this.currentDirClickedEmitter.emit(this.currentDir.parentDirectoryId);
  } 

  stopPropagation(e) {
    e.stopPropagation();
  } 

  onCreateDir(e) {
    e.stopPropagation();
    e.preventDefault();
    let name: string = window.prompt("Select name for the directory!");
    if (name.toLowerCase() === "root") {return;}
    if (name.length === 0) { return; }
    this.directoryService.create({ parentDirectoryId: this.currentDir.id, name: name })
      .pipe(take(1))
      .subscribe(
        success => {
          console.log("create dir success ", success);
         },
        error => { 
          console.log("create dir failed ", error );
        } 
      ); 
  }
}

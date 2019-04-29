import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { INoteInternal, NoteType } from 'src/app/services/models/video/note-internal';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  toggleBorderColor: boolean = false;
  toggleTextColor: boolean = false;
  toggleBackgroundColor: boolean = false;

  initialVal: string ="";
  note: INoteInternal; 

  borderSize: number = 1; 

  @Input("note") set noteSetter(val: INoteInternal) { 
    this.note = val;
    this.initialVal = this.note.content;
    this.borderSize = this.note.borderThickness;
  };
  @Output() createChildEmitter: EventEmitter<{ id: number, type: NoteType }> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<number> = new EventEmitter();
  @Output() seekEmitter: EventEmitter<number> = new EventEmitter();

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  deleteNote() {
    this.deleteEmitter.emit(this.note.inPageId);
  }

  onBlur() {
    this.note.shouldExpand = false;
  }

  onFocus() {
    this.note.shouldExpand = true;
  }

  onCreateChild() {
    this.createChildEmitter.emit({id: this.note.inPageId, type: NoteType.Note });
  }

  onContentChange(e) {
    let content = e.target.innerText; 
    this.note.content = content;
  }

  goToTime() {
    this.seekEmitter.emit(this.note.seekTo);
  }

  pickBorderSize() {
    if (this.borderSize < 0 || this.borderSize > 15) {
      this.borderSize = this.note.borderThickness;
    } else {
      this.note.borderThickness = this.borderSize;
    }
  }

  stopPropagation(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  borderSizeInputChange(e) {
    this.borderSize = e.target.value;
  }

  ngOnInit() {
  }

}

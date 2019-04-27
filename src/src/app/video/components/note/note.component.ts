import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { INoteInternal, NoteType } from 'src/app/services/models/video/note-internal';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  initialVal: string ="";
  public note: INoteInternal; 
  @Input("note") set noteSetter(val: INoteInternal) { 
    this.note = val;
    this.initialVal = this.note.content;
  };
  @Output() createChildEmitter: EventEmitter<{ id: number, type: NoteType }> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<number> = new EventEmitter(); 

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

  ngOnInit() {
  }

}

import { Component, Input } from '@angular/core';
import { INoteInternal } from 'src/app/services/models/video/note-internal';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note: INoteInternal;

  onBlur() {
    this.note.shouldExpand = false;
  }

  onFocus() {
    this.note.shouldExpand = true;
  }

}

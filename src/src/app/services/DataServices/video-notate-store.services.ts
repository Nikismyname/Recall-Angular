import { Injectable } from "@angular/core";
import { IVideoEdit } from '../models/video/video-edit';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';
import { IVideoSave } from '../models/video/video-save';

@Injectable({ providedIn: "root" })
export class VideoNotateStoreServices {

    private history: IVideoEdit[] = [];
    private videoId: number;

    constructor(
        private videoService: VideoService,
    ) { }

    setVideoId(id: number) {
        this.videoId = id;
    }

    initialSet(video: IVideoEdit) {
        var vid = Object.assign({}, video);
        vid.notes = JSON.parse(JSON.stringify(vid.notes));
        this.history.push(vid);
    }

    save(video: IVideoEdit, seekTo: number = 0): Observable<number[][]> {
        var vid = Object.assign({}, video);
        vid.notes = JSON.parse(JSON.stringify(vid.notes));
        this.history.push(vid);

        let curr = this.history[this.history.length - 1];
        let prev = this.history[this.history.length - 2];

        let saveData: IVideoSave = {
            videoId: this.videoId,
            seekTo: seekTo,
            name: curr.name === prev.name ? null : curr.name,
            description: curr.description === prev.description ? null : curr.description,
            newItems: this.generateNewNotes(curr),
            changes: this.generateChanges(curr, prev),
            finalSave: true,
        };

        console.log(saveData);

        return this.videoService.save(saveData);
    }

    generateNewNotes(curr: IVideoEdit) {
        let notes = curr.notes.slice(0).filter(x => x.id === 0);

        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            delete element.selectingColor;
            delete element.shouldExpand;
        }
        return notes;
    }

    generateChanges(curr: IVideoEdit, prev: IVideoEdit): any[][] {
        let changes = [];
        let exstNotesNewState = curr.notes.filter(x => x.id > 0 && x.id != null).sort((a, b) => a.id - b.id);
        let exstNotesOldState = prev.notes.sort((a, b) => a.id - b.id);

        if (exstNotesNewState.length != exstNotesOldState.length) { alert("The old and new state of preexisting notes does note match!"); }

        let counter = 0;
        let monitoredProperties = ["deleted", "content", "formatting", "seekTo", "type", "borderColor", "borderThickness"];
        for (var i = 0; i < exstNotesNewState.length; i++) {
            var newStateNote = exstNotesNewState[i];
            var oldStateNote = exstNotesOldState[i];

            if (newStateNote.id != oldStateNote.id) { alert("New and old state of preexisting notes do not match"); }

            for (let prop of monitoredProperties) {
                let oldValue = oldStateNote[prop];
                let newValue = newStateNote[prop];
                console.log(prop, oldValue, newValue);
                if (oldValue != newValue) {
                    changes[counter] = [];
                    changes[counter][0] = newStateNote.id;
                    changes[counter][1] = prop;
                    changes[counter][2] = newValue;
                    counter++;
                    console.log("Change:", changes[counter]);
                }
            }
        }
        return changes;
    }
}
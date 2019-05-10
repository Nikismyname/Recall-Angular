import { Injectable } from "@angular/core";
import { IVideoEdit } from '../models/video/video-edit';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';
import { IVideoSave } from '../models/video/video-save';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: "root" })
export class VideoNotateStoreServices {

    private history: IVideoEdit[] = [];
    private videoId: number;

    constructor(
        private videoService: VideoService,
        private toastr: ToastrService,
    ) { }

    setVideoId(id: number) {
        this.videoId = id;
    }

    initialSet(video: IVideoEdit) {
        var vid = Object.assign({}, video);
        vid.notes = JSON.parse(JSON.stringify(vid.notes));
        this.history.push(vid);
    }

    save(video: IVideoEdit): Observable<number[][]> {
        var vid = Object.assign({}, video);
        vid.notes = JSON.parse(JSON.stringify(vid.notes));
        this.history.push(vid);

        let curr = this.history[this.history.length - 1];
        let prev = this.history[this.history.length - 2];

        let saveData: IVideoSave = {
            videoId: this.videoId,
            seekTo: curr.seekTo === prev.seekTo ? null : curr.seekTo,
            name: curr.name === prev.name ? null : curr.name,
            description: curr.description === prev.description ? null : curr.description,
            url: curr.url === prev.url ? null : curr.url,
            newItems: this.generateNewNotes(curr),
            changes: this.generateChanges(curr, prev),
            finalSave: true,
        };

        if (
            saveData.seekTo === null &&
            saveData.name === null &&
            saveData.description === null &&
            saveData.url === null &&
            saveData.newItems.length === 0 &&
            saveData.changes.length === 0
        ) {
            return null;
        } else {
            return this.videoService.save(saveData);
        }
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
        let exstNotesNewState = curr.notes.filter(x => x.id != null && x.id > 0).sort((a, b) => a.id - b.id);
        let exstNotesOldState = prev.notes.sort((a, b) => a.id - b.id);

        //console.log("PREV ", exstNotesOldState);
        //console.log("CURR ", exstNotesNewState);

        if (exstNotesNewState.length !== exstNotesOldState.length) { alert("1 existing notes length problem"); }

        let counter = 0;
        let monitoredProperties =
            [
                "deleted",
                "content",
                "formatting",
                "seekTo",
                "type",
                "borderColor",
                "borderThickness",
                "backgroundColor",
                "textColor",
            ];
        for (var i = 0; i < exstNotesNewState.length; i++) {
            var newStateNote = exstNotesNewState[i];
            var oldStateNote = exstNotesOldState[i];

            if (newStateNote.id !== oldStateNote.id) {
                console.log("NewID ", newStateNote.id);
                console.log("OldID ", oldStateNote.id);
                alert("2 New and old state of preexisting notes do not match");
            }

            for (let prop of monitoredProperties) {
                let oldValue = oldStateNote[prop];
                let newValue = newStateNote[prop];
                //console.log(prop, oldValue, newValue);
                if (oldValue != newValue) {
                    changes[counter] = [];
                    changes[counter][0] = newStateNote.id;
                    changes[counter][1] = prop;
                    changes[counter][2] = newValue;
                    counter++;
                    //console.log("Change:", changes[counter]);
                }
            }
        }
        return changes;
    }

    setIdsToPrevious(newIds: number[][]) {
        for (let i = 0; i < newIds.length; i++) {
            let newId = newIds[i];
            let ipId = newId[0];
            let dbId = newId[1];

            let video = this.history[this.history.length - 1];

            let note = video.notes.filter(x => x.inPageId === ipId)[0];
            note.id = dbId;
        }
    }
}
import { INoteInternal } from './note-internal';

export interface IVideoSave { 
    videoId: number;
    seekTo: number;
    url: string;
    name: string;
    description: string;
    duration: number;
    finalSave: boolean;
    newItems: INoteInternal[];
    changes: any[][];
}
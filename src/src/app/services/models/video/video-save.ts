import { INoteInternal } from './note-internal';

export interface IVideoSave { 
    videoId: number;
    seekTo: number;
    url: string;
    name: string;
    description: string;
    finalSave: boolean;
    newItems: INoteInternal[];
    changes: any[][];
}
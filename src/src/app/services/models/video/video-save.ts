export interface IVideoSave { 
    videoId: number;
    seekTo: number;
    name: string;
    desctiption: string;
    finalSave: boolean;
    newNotes: any[];
    changes: any[];
}
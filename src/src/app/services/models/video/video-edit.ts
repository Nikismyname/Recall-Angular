import { INoteInternal } from './note-internal';

export interface IVideoEdit { 
    id: number,
    directoryId: number,
    name: string,
    url: string,
    seekTo: number,
    description: string,
    isYouTube: boolean,
    isVimeo: boolean,
    isLocal: boolean,
    notes: INoteInternal[],
}
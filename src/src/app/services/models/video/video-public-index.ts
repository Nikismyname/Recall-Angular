import { url } from 'inspector';

export interface IVideoPublicIndex { 
    id: number,
    name: string,
    url: string,
    description: string,
    duration: number,
    isYouTube: boolean,
    isVimeo: boolean,
    isLocal: boolean,
    username: string,
    createdOn: string,
    lastAccessed: string, 
    lastModified: string,
    timesAccessed: number,
    timesPublicAccessed: number,
    noteCount: number,
    topics: string[],
}
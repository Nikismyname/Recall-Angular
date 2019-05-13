import { ITopicFolder } from '../meta/topic-folder';

export interface IVideoForConnections {
    id: number,
    name: string, 
    url: string,
    description: string,
    seekTo: number,
    duration: number, 
    isYouTube: boolean,
    isVimeo: boolean,
    isLocal: boolean,
    username: string, 
    noteCount: number,
    topics: ITopicFolder[],
}
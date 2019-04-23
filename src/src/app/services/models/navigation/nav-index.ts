import { IVideoIndex } from './video-index';

export interface INavIndex { 

    id: number;

    name: string; 

    order: number; 

    parentDirectoryId: number; 

    videos: IVideoIndex[]; 
}
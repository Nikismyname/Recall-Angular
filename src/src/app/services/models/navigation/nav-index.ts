import { IVideoIndex } from './video-index';
import { IDirChildIndex } from './dir-child-index';

export interface INavIndex { 

    id: number;

    name: string; 

    order: number; 

    parentDirectoryId: number; 

    subdirectories: IDirChildIndex[], 

    videos: IVideoIndex[]; 
}
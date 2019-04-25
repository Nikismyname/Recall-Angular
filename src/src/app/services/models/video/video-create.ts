export interface IVideoCreate {
    directoryId: number;
    name: string;
    url: string;
    description: string;
    isYouTube: boolean;
    isVimeo: boolean;
    isLocal: boolean; 
}
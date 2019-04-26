export interface INoteInternal { 
    id: number,
    inPageId: number,
    inPageParentId: number,
    parentDbId: number,
    content: string,
    level: number,
    deleted: boolean
    formatting: number,
    type: NoteType,
    seekTo: number,
    backgroundColor: string, 
    textColor: string,
    borderColor: string, 
    borderThickness: number, 
    selectingColor: boolean,
    shouldExpand: boolean,
}

export enum NoteType { 
    Note,
    TimeStamp,
    Topic
}
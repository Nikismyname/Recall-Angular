import { IItemForSelect } from './item-for-select';

export interface IDirWithItemsSelect { 
    id: number,
    name: string, 
    parentId: number,
    items: IItemForSelect[],
    order: number,
    selected: boolean,
}
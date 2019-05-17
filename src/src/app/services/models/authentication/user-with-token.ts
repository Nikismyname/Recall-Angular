import { IAllOptions } from '../options/all-options';

export interface IUserWithToken { 
    username: string;

    firstName: string;

    lastName: string;

    role: string;
    
    token: string;

    rootDirectoryId: number;

    options: IAllOptions
}
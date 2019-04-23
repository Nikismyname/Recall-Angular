import { IUser } from './user';

export interface IUserInRole extends IUser
{
    isUser: boolean;
    isAdmin: boolean;
}
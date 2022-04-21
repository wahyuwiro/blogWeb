import { IsNotEmpty } from 'class-validator';
export class signupDTO
{
    readonly fullname: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly deviceId: string;
}
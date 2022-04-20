import { IsNotEmpty } from 'class-validator';
export class signinDTO
{
    readonly email: string;
    readonly password: string;
    readonly deviceId: string;
}
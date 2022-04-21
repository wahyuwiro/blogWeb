import { IsNotEmpty } from 'class-validator';
export class BlogDTO
{
    readonly title: string;
    readonly content: string;
}
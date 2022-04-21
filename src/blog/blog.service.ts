import { HttpService, Injectable, HttpException, Render } from '@nestjs/common';
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class BlogService {
    constructor(
        private http: HttpService
    ) {}

    async getBlog(params: any): Promise < Observable < AxiosResponse < any >>> {
        console.log('params =>',params)
        var headers = {
            'Content-Type': 'application/json', 
            'token': params.token
        };
        return this.http.get(process.env.API_URL + '/blog', { headers: headers })
        .pipe(map((res) => {
            return res.data;
        })).toPromise();
    }

    async blogPost(params: any): Promise < Observable < AxiosResponse < any >>> {
        console.log('params =>',params)
        var headers = {
            'Content-Type': 'application/json', 
            'token': params.token
        };
        return this.http.post(process.env.API_URL + '/blog', params, { headers: headers })
        .pipe(map((res) => {
            return res.data;
        })).toPromise();
    }

}

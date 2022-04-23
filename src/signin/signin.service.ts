import { HttpService, Injectable, HttpException, Render } from '@nestjs/common';
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import * as fs from 'fs';

@Injectable()
export class SigninService {
    constructor(
        private http: HttpService
    ) {}
    async siginPost(params: any): Promise < Observable < AxiosResponse < any >>> {
        var headers = {
            'Content-Type': 'application/json', 
            'signature': process.env.SIGNATURE
        };
        return this.http.post(process.env.API_URL + '/login', params, { headers: headers })
        .pipe(map((res) => {
            return res.data;
        })).toPromise();
    }

    async checkToken(params: any): Promise < Observable < AxiosResponse < any >>> {
        var headers = {
            'Content-Type': 'application/json', 
            'token': params.token
        };
        return this.http.post(process.env.API_URL + '/checkToken', {}, { headers: headers })
        .pipe(map((res) => {
            return res.data;
        })).toPromise();
    }

    async signOutPost(params: any): Promise < Observable < AxiosResponse < any >>> {
        var headers = {
            'Content-Type': 'application/json', 
            'token': params.token
        };
        console.log('headers =>',headers)
        console.log('url =>',process.env.API_URL + '/logout')
        return this.http.post(process.env.API_URL + '/logout', params, { headers: headers })
        .pipe(map((res) => {
            return res.data;
        })).toPromise();
    }    

}

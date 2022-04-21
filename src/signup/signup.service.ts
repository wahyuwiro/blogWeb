import { HttpService, Injectable, HttpException, Render } from '@nestjs/common';
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import * as fs from 'fs';


@Injectable()
export class SignupService {
    constructor(
        private http: HttpService
    ) {}

    async signupPost(params: any): Promise < Observable < AxiosResponse < any >>> {
        var headers = {
            'Content-Type': 'application/json', 
            'signature': process.env.SIGNATURE
        };
        return this.http.post(process.env.API_URL + '/register', params, { headers: headers })
        .pipe(map((res) => {
            return res.data;
        })).toPromise();
    }

}

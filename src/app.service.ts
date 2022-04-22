// import { Injectable } from '@nestjs/common';
import { HttpService, Injectable, HttpException, Render } from '@nestjs/common';
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import * as fs from 'fs';
@Injectable()
export class AppService {
  constructor(
    private http: HttpService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async getData(params: any): Promise < Observable < AxiosResponse < any >>> {
    var headers: any = {};
    headers = {
        'Content-Type': 'application/json', 
        'signature': process.env.SIGNATURE
    };

    if (params.param) headers.param = params.param;
    // console.log('param=>',params)
    return this.http.get(process.env.API_URL + '/' + params.url, { headers: headers })
    .pipe(map((res) => {
        return res.data;
    })).toPromise();
  }



}

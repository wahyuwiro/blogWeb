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
  // async getHome(params: any): Promise < Observable < AxiosResponse < any >>> {    
  //   return this.http.get('https://imdb-api.com/API/AdvancedSearch/'+ process.env.APIKEY +'/?genres=action,adventure', { headers: {} })
  //   .pipe(map((res) => {
  //       return res.data;
  //   })).toPromise();   
  // }


}

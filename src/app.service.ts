// import { Injectable } from '@nestjs/common';
import { HttpService, Injectable, HttpException, Render } from '@nestjs/common';
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import * as fs from 'fs';

// save in json, handling maximum imdb-api usage (100 per day)
const horror = require("../json/horror.json");
const war = require("../json/war.json");
const comedy = require("../json/comedy.json");
const detail = require("../json/detail.json");
const topRate = require("../json/topRate.json");
const animation = require("../json/animation.json");
const action = require("../json/action.json");

@Injectable()
export class AppService {
  constructor(
    private http: HttpService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async getHome(params: any): Promise < Observable < AxiosResponse < any >>> {
    
    // return this.http.get('https://imdb-api.com/API/AdvancedSearch/'+ process.env.APIKEY +'/?genres=action,adventure', { headers: {} })
    // .pipe(map((res) => {
    //     return res.data;
    // })).toPromise();
    return action;
    
  }

  async getDetail(params: any): Promise < Observable < AxiosResponse < any >>> {   
    console.log('params =>',params)
    console.log('url =>','https://imdb-api.com/en/API/Title/'+ process.env.APIKEY +'/'+ params.id +'/FullActor,Posters')
    // return this.http.get('https://imdb-api.com/en/API/Title/'+ process.env.APIKEY +'/'+ params.id +'/FullActor,Posters', { headers: {} })
    // .pipe(map((res) => {
    //     return res.data;
    // })).toPromise();
    var d = detail;
    if (fs.existsSync('json/detail-'+ params.id +'.json')) {
      d = require('../json/detail-'+ params.id +'.json');
    }else{
      console.log('tidak ada json')
    }    
    return d;
  }

  async getGenre(params: any): Promise < Observable < AxiosResponse < any >>> {   
    console.log('params =>',params)
    var key = '/?genres='+ params.id;
    if(params.id=='tv_movie') key = '?title_type='+ params.id;
    if(params.id=='top-rated') key = '?user_rating=9.0,10';
    console.log('url =>','https://imdb-api.com/API/AdvancedSearch/'+ process.env.APIKEY + key)
    
    // return this.http.get('https://imdb-api.com/API/AdvancedSearch/'+ process.env.APIKEY + key, { headers: {} })
    // .pipe(map((res) => {
    //     return res.data;
    // })).toPromise();

    var r;
    if(params.id=='horror') {
      r=horror
    }else if(params.id=='comedy') {
      r=comedy
    }else if(params.id=='action') {
      r=action
    }else if(params.id=='top-rated') {
      r=topRate
    }else if(params.id=='animation') {
      r=animation
    }else {
      r=war
    }
    return r;

  }

  async getTopRated(params: any): Promise < Observable < AxiosResponse < any >>> {   
    console.log('params =>',params)
    var key = '?user_rating=9.0,10';
    console.log('url =>','https://imdb-api.com/API/AdvancedSearch/'+ process.env.APIKEY + key)
    
    // return this.http.get('https://imdb-api.com/API/AdvancedSearch/'+ process.env.APIKEY + key, { headers: {} })
    // .pipe(map((res) => {
    //     return res.data;
    // })).toPromise();

    return topRate;

  }
}

import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters, Body, HttpStatus, Param, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { dataDTO } from './dto/data.dto';
import { Cache } from 'cache-manager';

const menu = require("../json/menu.json");

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @Render('home/home')
  async getHome(@Request() req,@Res() res: Response) {
    // var gh: any = {}
    // gh = await this.appService.getHome({});
    // console.log('gh.results =>',gh.results);
    return { 
      host : process.env.HOST + ':' + process.env.PORT,
      // data: gh.results,
    };
  }  

  @Get('profile')
  @Render('profile/profile')
  async getProfile(@Request() req,@Res() res: Response) {
    return { 
      host : process.env.HOST + ':' + process.env.PORT,
    };
  }

  @Get('signup')
  // @Render('sign/signup')
  async getSignup(@Request() req,@Res() res: Response) {
    return { 
      host : process.env.HOST + ':' + process.env.PORT,
    };
  }

  // @Get('top-rated')
  // @Render('home/home')
  // async getTopRated(@Request() req, @Res() res: Response ){
  //   var gd: any = {}
  //   gd = await this.appService.getTopRated({});
  //   // console.log('getTopRated new =>',gd)
  //   return {
  //     host : process.env.HOST + ':' + process.env.PORT,
  //     menu: menu.menus,
  //     data: gd.results,
  //   };
  // }

  // @Get('genre/:id')
  // @Render('home/home')
  // async getGenre(@Param('id') id, @Request() req, @Res() res: Response ){
  //   var gd: any = {}
  //   gd = await this.appService.getGenre({id: id});
  //   // console.log('getGenre new =>',gd)
  //   return {
  //     host : process.env.HOST + ':' + process.env.PORT,
  //     menu: menu.menus,
  //     data: gd.results,
  //   };
  // }

}

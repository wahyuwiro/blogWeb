import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters, Body, HttpStatus, Param, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { dataDTO } from './dto/data.dto';
import { Cache } from 'cache-manager';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  @Render('home/home')
  async getArticle(@Request() req,@Res() res: Response) {
    var result: any = {}, message: any = {}, param: any = {};
    param.url = 'article'
    result = await this.appService.getData(param);
    console.log('gh.results =>',result);
    message.host = process.env.HOST + ':' + process.env.PORT;
    if(result.responseCode == 200) {
      message.data = result.data;
    }else if(result.responseCode == 404) {
    }else{
        message.err = result;
    }
    return message;
  }

  @Get('article/:id')
  @Render('home/article')
  async getDetailArticle(@Param('id') id, @Request() req,@Res() res: Response) {
    var result: any = {}, gc: any = {}, message: any = {}, p: any = {}, param: any = {};
    p.id=id
    param.param = JSON.stringify(p);
    param.url = 'article'

    result = await this.appService.getData(param);
    // console.log('getArticle =>',result);
    p = {};
    p.blogId=id
    param.param = JSON.stringify(p);
    param.url = 'blogComment'
    gc = await this.appService.getData(param);
    message.qtyComment = 0;
    message.host = process.env.HOST + ':' + process.env.PORT;
    if(result.responseCode == 200) {
      message.data = result.data[0];
      if(gc.responseCode == 200) { // get cooment
        message.comment = gc.data
        message.qtyComment = gc.data.length
      }
    }else if(result.responseCode == 404) {
    }else{
        message.err = result;
    }
    return message;
  }

}

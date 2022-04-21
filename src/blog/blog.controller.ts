import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters, Body, HttpStatus, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Response } from 'express';
import { BlogService } from './blog.service';
import { blogDTO } from './dto/blog.dto';
import { Cache } from 'cache-manager';
import { SigninController } from '../signin/signin.controller';

@Controller('blog')
export class BlogController {
    constructor(
        private BlogService: BlogService,
        private readonly SigninController: SigninController,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }
  
    @Get()
    @Render('admin/blog')
    async getBlog(@Request() req,@Res() res: Response) {
      var gr: any = {}, deviceId = '';
      // var key = 'key';
      // if(p.deviceId) {key = key+'-'+p.deviceId}
      var a = await this.SigninController.getRedis('a');
      console.log('getRedis =>',a)
      if(req.cookies.deviceId) { 
        deviceId = req.cookies.deviceId; 
      }
      // gr = await this.getRedis(key);
      return { 
        host : process.env.HOST + ':' + process.env.PORT,
      };
    }
    @Get('new')
    @Render('admin/addBlog')
    async addBlog(@Request() req,@Res() res: Response) {
      return { 
        host : process.env.HOST + ':' + process.env.PORT,
      };
    }
  
}

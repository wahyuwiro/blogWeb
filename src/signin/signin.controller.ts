import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters, Body, HttpStatus, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Response } from 'express';
import { SigninService } from './signin.service';
import { signinDTO } from './dto/signin.dto';
import { Cache } from 'cache-manager';

@Controller('signin')
export class SigninController {
  constructor(
      private SigninService: SigninService,
      @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get()
  @Render('sign/signin')
  async getSignin(@Request() req,@Res() res: Response) {
    return { 
      host : process.env.HOST + ':' + process.env.PORT,
    };
  }

  @Post()
  async postSignin(@Body() signinDTO: signinDTO, @Request() req,@Res() res: Response) {
    var result: any = {}, body: any = {}, key: any = {}, deviceId = '';
    body = signinDTO;
    if(req.cookies.deviceId) { 
      deviceId = req.cookies.deviceId;
    }else{
      deviceId = await this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      res.cookie('deviceId',deviceId); // set cookie
    }
    console.log('siginPost body =>',body)
    result = await this.SigninService.siginPost(body);
    console.log('siginPost result =>',result)
    if(result.responseCode == 200) {
      key.token = result.data.token
      await this.addRedis('key-'+deviceId, key);
      res.redirect(process.env.HOST + ':' + process.env.PORT + '/blog');
    }else{
      return res.render('sign/signin',
        { 
          host : process.env.HOST + ':' + process.env.PORT,
          data : body,
          err : result
        },
      );          
    }
  }

  @Get('out')
  async getSignout(@Request() req,@Res() res: Response) {
    var deviceId = req.cookies.deviceId;
    var gr = await this.getRedis('key-'+deviceId);
    if(gr){
      await this.delRedis('key-'+deviceId);
      res.redirect(process.env.HOST + ':' + process.env.PORT); 
    }
  }

  async checkToken(token) {
    var ct: any={};
    ct = await this.SigninService.checkToken(token);
    return ct
  }

  async getRedis(key) {
    return await this.cacheManager.get(key);
  }

  async addRedis(key, value) {
    await this.cacheManager.set(key, value, {ttl: 999999});
    return await this.cacheManager.get(key);
  }

  async delRedis(key) {
    return await this.cacheManager.del(key);
  }

  async randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }

}

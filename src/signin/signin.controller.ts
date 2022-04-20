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
    var result: any = {}, body: any = {};
    body = signinDTO;
    if(req.cookies.deviceId) { 
      body.deviceId = req.cookies.deviceId; 
    }else{
      body.deviceId = await this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    }
    console.log('siginPost body =>',body)
    result = await this.SigninService.siginPost(body);
    console.log('siginPost result =>',result)
    if(result.responseCode == 200) {
      res.redirect(process.env.HOST + ':' + process.env.PORT);
      // await this.addRedis('key-'+body.deviceId, myKey);
    }else{
      return { 
        host : process.env.HOST + ':' + process.env.PORT,
        err: result.responseMessage
      };
    }  

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